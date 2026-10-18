Optional: put `Vazirmatn.woff2` here (SIL Open Font License, https://github.com/rastikerdar/vazirmatn)
to give every device the same Persian font, then uncomment the @font-face rule at the top of
css/style.css and add the file to FILES in sw.js. Without it, the device's own Persian font is used.
Never link fonts from an outside CDN: it adds a third-party request and may be blocked in Iran.
