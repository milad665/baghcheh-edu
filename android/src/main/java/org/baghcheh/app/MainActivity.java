package org.baghcheh.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Baghcheh: the website from the APK's own files, with sync to the home hub (js/sync.js). */
public class MainActivity extends Activity {
    private WebView web;
    private final ExecutorService net = Executors.newSingleThreadExecutor();
    private final Handler ui = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        web.addJavascriptInterface(new Bridge(), "BaghchehNative");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri uri = req.getUrl();
                if ("file".equals(uri.getScheme())) return false;
                // Links to other sites open in the browser, never inside the app.
                try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (Exception e) { /* no browser */ }
                return true;
            }
        });
        setContentView(web);
        if (saved != null) web.restoreState(saved);
        else web.loadUrl("file:///android_asset/site/index.html");
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    /** Talks to the hub for the page, which cannot reach plain http:// addresses on its own. */
    class Bridge {
        @JavascriptInterface
        public void request(final int id, final String method, final String url, final String token, final String body) {
            net.execute(() -> {
                int status = 0;
                String text = "";
                HttpURLConnection c = null;
                try {
                    URL u = new URL(url);
                    if (!"http".equals(u.getProtocol()) || !atHome(u.getHost())) throw new SecurityException("not on the home network");
                    c = (HttpURLConnection) u.openConnection();
                    c.setConnectTimeout(5000);
                    c.setReadTimeout(8000);
                    c.setRequestMethod(method);
                    c.setRequestProperty("Content-Type", "application/json");
                    if (!token.isEmpty()) c.setRequestProperty("X-Baghcheh-Token", token);
                    if (!body.isEmpty()) {
                        c.setDoOutput(true);
                        try (OutputStream o = c.getOutputStream()) { o.write(body.getBytes(StandardCharsets.UTF_8)); }
                    }
                    status = c.getResponseCode();
                    InputStream in = status < 400 ? c.getInputStream() : c.getErrorStream();
                    if (in != null) text = readAll(in);
                } catch (Exception e) {
                    status = 0;
                } finally {
                    if (c != null) c.disconnect();
                }
                final String js = "window.__baghchehNative(" + id + "," + status + "," + JSONObject.quote(text) + ")";
                ui.post(() -> web.evaluateJavascript(js, null));
            });
        }
    }

    /** Private addresses and .local names only: sync never leaves the home network. */
    static boolean atHome(String host) {
        if (host.endsWith(".local")) return true;
        if (!host.matches("[0-9.]+")) return false;
        try {
            InetAddress a = InetAddress.getByName(host);
            return a.isSiteLocalAddress() || a.isLinkLocalAddress() || a.isLoopbackAddress();
        } catch (Exception e) {
            return false;
        }
    }

    static String readAll(InputStream in) throws java.io.IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        for (int n; (n = in.read(buf)) > 0; ) out.write(buf, 0, n);
        in.close();
        return out.toString("UTF-8");
    }
}
