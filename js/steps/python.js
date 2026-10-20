/* باغچه — a small Python for «فکر و برنامه‌نویسی» in the Forest garden (step type `pycode`), all offline.

   B.py.run(code, { inputs: [...], turtle: fn, seed, limit }) runs a program and returns { out, error, vars, segs };
   error is { type, key, args, line } with a Persian message from B.t("py" + key). The subset: numbers (int and float
   kept apart, so 6 / 3 prints 2.0), strings (with f-strings), True, False, None, lists, range; + - * / // % **,
   comparisons (chained), and, or, not, in; if / elif / else, while, for … in, break, continue, pass, def with return,
   tuple assignment (a, b = b, a); print, input, int, float, str, len, abs, round, min, max, sum, sorted, list, range,
   bool, chr, ord, bin, enumerate; list and string methods; import turtle, random, math. A step counter stops a loop
   that never ends.

   The step:
   { type: "pycode", prompt, say,
     given: starting code (a string; lines with \n),
     tests: [{ inputs: [...], out: "what print() writes" }, …]: the check runs the program once per test (input()'s
       prompts are not compared); or
       expect: a piece of text the output must contain; minLines: at least that many lines printed; or
       vars: { name: value } the program must end with;
     inputs: what the «اجرا» button feeds to input() (shown and editable),
     snippets: buttons that type a piece of code at the cursor (e.g. ["print()", "for i in range():"]),
     blocks: the same program as blocks, shown beside the code ([{ text, kind: "event" | "say" | "loop" | "if" | "var",
       depth }]),
     turtle: true — a paper the turtle module draws on; goal: a turtle-step program (js/steps/thinking.js) whose
       shape is shown faint and must be drawn,
     mode: "predict" — the code is only shown; options and answer ask what it prints (a choose step). }
   Right the first time when the first check passes. */
var B = window.B || {};
window.B = B;

(function () {
  // ---------------- values ----------------
  function PyFloat(v) { this.v = v; }
  function isFloat(x) { return x instanceof PyFloat; }
  function num(x) { return isFloat(x) ? x.v : x === true ? 1 : x === false ? 0 : x; }
  function isNum(x) { return typeof x === "number" || isFloat(x) || typeof x === "boolean"; }
  function mk(v, float) { return float ? new PyFloat(v) : v; }
  function PyError(type, key, args, line) { this.type = type; this.key = key; this.args = args || {}; this.line = line; }
  function err(type, key, args) { throw new PyError(type, key, args); }
  function Func(name, params, defaults, body, scope) { this.name = name; this.params = params; this.defaults = defaults; this.body = body; this.scope = scope; }
  function Builtin(name, fn) { this.name = name; this.fn = fn; }
  function Module(name, members) { this.name = name; this.members = members; }
  function BoundMethod(self, name, fn) { this.self = self; this.name = name; this.fn = fn; }
  function Range(a, b, c) { this.a = a; this.b = b; this.c = c; }
  Range.prototype.list = function () {
    var out = [];
    if (this.c === 0) err("ValueError", "RangeStep");
    for (var i = this.a; this.c > 0 ? i < this.b : i > this.b; i += this.c) { out.push(i); if (out.length > 100000) err("MemoryError", "TooBig"); }
    return out;
  };
  function typeName(x) {
    if (x === null || x === undefined) return "None";
    if (typeof x === "boolean") return "bool";
    if (typeof x === "number") return "int";
    if (isFloat(x)) return "float";
    if (typeof x === "string") return "str";
    if (Array.isArray(x)) return x.tuple ? "tuple" : "list";
    if (x instanceof Range) return "range";
    if (x instanceof Func || x instanceof Builtin || x instanceof BoundMethod) return "function";
    return "object";
  }
  function fmtFloat(v) {
    if (!isFinite(v)) return v > 0 ? "inf" : v < 0 ? "-inf" : "nan";
    if (Number.isInteger(v)) return Math.abs(v) < 1e16 ? v.toFixed(1) : String(v);
    var s = String(v);
    if (/e/.test(s)) return s.replace(/e([+-])(\d)$/, "e$10$2");
    return s;
  }
  function repr(x) {
    if (typeof x === "string") return "'" + x.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n") + "'";
    return str(x);
  }
  function str(x) {
    if (x === null || x === undefined) return "None";
    if (x === true) return "True";
    if (x === false) return "False";
    if (typeof x === "number") return String(x);
    if (isFloat(x)) return fmtFloat(x.v);
    if (typeof x === "string") return x;
    if (Array.isArray(x)) {
      var inner = x.map(repr).join(", ");
      return x.tuple ? "(" + inner + (x.length === 1 ? "," : "") + ")" : "[" + inner + "]";
    }
    if (x instanceof Range) return "range(" + x.a + ", " + x.b + (x.c !== 1 ? ", " + x.c : "") + ")";
    if (x instanceof Func || x instanceof Builtin) return "<function " + x.name + ">";
    if (x instanceof Module) return "<module '" + x.name + "'>";
    return String(x);
  }
  function truthy(x) {
    if (x === null || x === undefined || x === false) return false;
    if (typeof x === "number") return x !== 0;
    if (isFloat(x)) return x.v !== 0;
    if (typeof x === "string" || Array.isArray(x)) return x.length > 0;
    return true;
  }
  function equal(a, b) {
    if (isNum(a) && isNum(b)) return num(a) === num(b);
    if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every(function (v, i) { return equal(v, b[i]); });
    return a === b;
  }
  function iter(x) {
    if (Array.isArray(x)) return x.slice();
    if (typeof x === "string") return Array.from(x);
    if (x instanceof Range) return x.list();
    err("TypeError", "NotIterable", { t: typeName(x) });
  }

  // ---------------- tokens ----------------
  var KEYWORDS = { "if": 1, "elif": 1, "else": 1, "while": 1, "for": 1, "in": 1, "def": 1, "return": 1, "and": 1, "or": 1, "not": 1,
    "True": 1, "False": 1, "None": 1, "break": 1, "continue": 1, "pass": 1, "import": 1, "from": 1, "is": 1, "as": 1 };
  function tokenize(src) {
    var toks = [], indents = [0], depth = 0, lines = src.replace(/\r/g, "").replace(/\t/g, "    ").split("\n");
    var lineNo = 0;
    function push(t, v, ln) { toks.push({ t: t, v: v, line: ln }); }
    for (var li = 0; li < lines.length; li++) {
      var line = lines[li];
      lineNo = li + 1;
      if (depth === 0) {
        if (/^\s*(#.*)?$/.test(line)) continue;
        var ind = /^ */.exec(line)[0].length;
        if (ind > indents[indents.length - 1]) { indents.push(ind); push("INDENT", null, lineNo); }
        else {
          while (ind < indents[indents.length - 1]) { indents.pop(); push("DEDENT", null, lineNo); }
          if (ind !== indents[indents.length - 1]) throw new PyError("IndentationError", "Indent", {}, lineNo);
        }
      }
      var i = 0;
      while (i < line.length) {
        var c = line[i];
        if (c === " ") { i++; continue; }
        if (c === "#") break;
        var m;
        if ((m = /^(\d+\.\d*|\.\d+|\d+)(e[+-]?\d+)?/i.exec(line.slice(i)))) {
          push("NUM", m[0], lineNo); i += m[0].length; continue;
        }
        if ((m = /^([fF]?)("|')/.exec(line.slice(i)))) {
          var f = !!m[1], q = m[2], j = i + m[0].length, out = "";
          while (j < line.length && line[j] !== q) {
            if (line[j] === "\\" && j + 1 < line.length) {
              var e = line[j + 1];
              out += e === "n" ? "\n" : e === "t" ? "\t" : e;
              j += 2;
            } else out += line[j++];
          }
          if (j >= line.length) throw new PyError("SyntaxError", "String", {}, lineNo);
          push(f ? "FSTR" : "STR", out, lineNo);
          i = j + 1;
          continue;
        }
        if ((m = /^[A-Za-z_؀-ۿ][A-Za-z0-9_؀-ۿ]*/.exec(line.slice(i)))) {
          push(KEYWORDS[m[0]] ? "KW" : "NAME", m[0], lineNo); i += m[0].length; continue;
        }
        if ((m = /^(\*\*=|\/\/=|\*\*|\/\/|==|!=|<=|>=|\+=|-=|\*=|\/=|%=|->|[-+*\/%<>=()[\]{},:.;])/.exec(line.slice(i)))) {
          if ("([{".indexOf(m[0]) !== -1) depth++;
          if (")]}".indexOf(m[0]) !== -1) depth = Math.max(0, depth - 1);
          push("OP", m[0], lineNo); i += m[0].length; continue;
        }
        throw new PyError("SyntaxError", "Char", { c: c }, lineNo);
      }
      if (depth === 0) push("NL", null, lineNo);
    }
    if (depth > 0) throw new PyError("SyntaxError", "Bracket", {}, lineNo);
    while (indents.length > 1) { indents.pop(); push("DEDENT", null, lineNo); }
    push("EOF", null, lineNo);
    return toks;
  }

  // ---------------- parser ----------------
  function parse(src) {
    var toks = tokenize(src), p = 0;
    function peek(o) { return toks[p + (o || 0)]; }
    function at(t, v) { var k = toks[p]; return k.t === t && (v === undefined || k.v === v); }
    function eat(t, v) {
      var k = toks[p];
      if (k.t !== t || (v !== undefined && k.v !== v)) {
        if (t === "OP" && v === ":") throw new PyError("SyntaxError", "Colon", {}, k.line);
        if (k.t === "INDENT") throw new PyError("IndentationError", "Unexpected", {}, k.line);
        throw new PyError("SyntaxError", "Syntax", { got: k.v || k.t }, k.line);
      }
      p++;
      return k;
    }
    function block() {
      eat("OP", ":");
      if (!at("NL")) { var s = simple(); if (at("NL")) eat("NL"); return [s]; }
      eat("NL");
      if (!at("INDENT")) throw new PyError("IndentationError", "Expected", {}, peek().line);
      eat("INDENT");
      var body = [];
      while (!at("DEDENT") && !at("EOF")) body.push(statement());
      if (at("DEDENT")) eat("DEDENT");
      return body;
    }
    function statement() {
      var k = peek();
      if (k.t === "KW") {
        if (k.v === "if") {
          p++;
          var node = { k: "if", line: k.line, tests: [[expr(), null]], other: null };
          node.tests[0][1] = block();
          while (at("KW", "elif")) { p++; var c = expr(); node.tests.push([c, block()]); }
          if (at("KW", "else")) { p++; node.other = block(); }
          return node;
        }
        if (k.v === "while") { p++; var t = expr(); return { k: "while", line: k.line, test: t, body: block() }; }
        if (k.v === "for") {
          p++;
          var target = targetList();
          eat("KW", "in");
          var it = exprList();
          return { k: "for", line: k.line, target: target, iter: it, body: block() };
        }
        if (k.v === "def") {
          p++;
          var name = eat("NAME").v, params = [], defaults = {};
          eat("OP", "(");
          while (!at("OP", ")")) {
            var pn = eat("NAME").v;
            params.push(pn);
            if (at("OP", "=")) { p++; defaults[pn] = expr(); }
            if (!at("OP", ")")) eat("OP", ",");
          }
          eat("OP", ")");
          if (at("OP", "->")) { p++; expr(); }
          return { k: "def", line: k.line, name: name, params: params, defaults: defaults, body: block() };
        }
      }
      var s = simple();
      if (!at("EOF")) eat("NL");
      return s;
    }
    function targetList() {
      var first = primary();
      if (!at("OP", ",")) return first;
      var items = [first];
      while (at("OP", ",")) { p++; items.push(primary()); }
      return { k: "tuple", items: items };
    }
    function simple() {
      var k = peek();
      if (k.t === "KW") {
        if (k.v === "pass") { p++; return { k: "pass", line: k.line }; }
        if (k.v === "break") { p++; return { k: "break", line: k.line }; }
        if (k.v === "continue") { p++; return { k: "continue", line: k.line }; }
        if (k.v === "return") { p++; return { k: "return", line: k.line, value: at("NL") || at("EOF") ? null : exprList() }; }
        if (k.v === "import") {
          p++;
          var names = [eat("NAME").v];
          while (at("OP", ",")) { p++; names.push(eat("NAME").v); }
          return { k: "import", line: k.line, names: names };
        }
        if (k.v === "from") {
          p++;
          var mod = eat("NAME").v;
          eat("KW", "import");
          var what = [];
          if (at("OP", "*")) { p++; what = "*"; } else { what.push(eat("NAME").v); while (at("OP", ",")) { p++; what.push(eat("NAME").v); } }
          return { k: "from", line: k.line, mod: mod, what: what };
        }
      }
      var e = exprList();
      if (at("OP", "=")) {
        var targets = [e];
        while (at("OP", "=")) { p++; targets.push(exprList()); }
        var value = targets.pop();
        targets.forEach(checkTarget);
        return { k: "assign", line: k.line, targets: targets, value: value };
      }
      if (peek().t === "OP" && /^(\+|-|\*|\/|\/\/|%|\*\*)=$/.test(peek().v)) {
        var op = eat("OP").v.slice(0, -1);
        checkTarget(e);
        return { k: "aug", line: k.line, target: e, op: op, value: exprList() };
      }
      return { k: "expr", line: k.line, e: e };
    }
    function checkTarget(t) {
      if (t.k === "name" || t.k === "index") return;
      if (t.k === "tuple") { t.items.forEach(checkTarget); return; }
      throw new PyError("SyntaxError", "Assign", {}, peek().line);
    }
    function exprList() {
      var first = expr();
      if (!at("OP", ",")) return first;
      var items = [first];
      while (at("OP", ",")) { p++; if (at("NL") || at("OP", "=") || at("OP", ")")) break; items.push(expr()); }
      return { k: "tuple", items: items };
    }
    function expr() {
      var e = orTest();
      if (at("KW", "if") && peek().line === toks[p - 1].line) {
        p++;
        var c = orTest();
        eat("KW", "else");
        return { k: "ifexp", test: c, yes: e, no: expr() };
      }
      return e;
    }
    function orTest() { var a = andTest(); while (at("KW", "or")) { p++; a = { k: "or", a: a, b: andTest() }; } return a; }
    function andTest() { var a = notTest(); while (at("KW", "and")) { p++; a = { k: "and", a: a, b: notTest() }; } return a; }
    function notTest() { if (at("KW", "not")) { p++; return { k: "not", a: notTest() }; } return comparison(); }
    function comparison() {
      var a = arith(), ops = [], rest = [];
      for (;;) {
        var k = peek(), op = null;
        if (k.t === "OP" && /^(<|>|==|!=|<=|>=)$/.test(k.v)) { op = k.v; p++; }
        else if (k.t === "KW" && k.v === "in") { op = "in"; p++; }
        else if (k.t === "KW" && k.v === "not" && peek(1).t === "KW" && peek(1).v === "in") { op = "not in"; p += 2; }
        else if (k.t === "KW" && k.v === "is") { p++; if (at("KW", "not")) { p++; op = "is not"; } else op = "is"; }
        if (!op) break;
        ops.push(op);
        rest.push(arith());
      }
      return ops.length ? { k: "cmp", first: a, ops: ops, rest: rest } : a;
    }
    function arith() {
      var a = term();
      while (at("OP", "+") || at("OP", "-")) { var op = eat("OP").v; a = { k: "bin", op: op, a: a, b: term() }; }
      return a;
    }
    function term() {
      var a = factor();
      while (at("OP", "*") || at("OP", "/") || at("OP", "//") || at("OP", "%")) { var op = eat("OP").v; a = { k: "bin", op: op, a: a, b: factor() }; }
      return a;
    }
    function factor() {
      if (at("OP", "-") || at("OP", "+")) { var op = eat("OP").v; return { k: "unary", op: op, a: factor() }; }
      return power();
    }
    function power() {
      var a = primary();
      if (at("OP", "**")) { p++; return { k: "bin", op: "**", a: a, b: factor() }; }
      return a;
    }
    function primary() {
      var a = atom();
      for (;;) {
        if (at("OP", "(")) {
          var line = eat("OP").line, args = [], kwargs = {};
          while (!at("OP", ")")) {
            if (peek().t === "NAME" && peek(1).t === "OP" && peek(1).v === "=") { var kn = eat("NAME").v; p++; kwargs[kn] = expr(); }
            else args.push(expr());
            if (!at("OP", ")")) eat("OP", ",");
          }
          eat("OP", ")");
          a = { k: "call", f: a, args: args, kwargs: kwargs, line: line };
        } else if (at("OP", "[")) {
          p++;
          var lo = null, hi = null, slice = false;
          if (!at("OP", ":")) lo = expr();
          if (at("OP", ":")) { slice = true; p++; if (!at("OP", "]")) hi = expr(); }
          eat("OP", "]");
          a = slice ? { k: "slice", obj: a, lo: lo, hi: hi } : { k: "index", obj: a, i: lo };
        } else if (at("OP", ".")) {
          p++;
          a = { k: "attr", obj: a, name: eat("NAME").v };
        } else return a;
      }
    }
    function atom() {
      var k = peek();
      if (k.t === "NUM") { p++; return { k: "num", v: /[.e]/i.test(k.v) ? new PyFloat(parseFloat(k.v)) : parseInt(k.v, 10) }; }
      if (k.t === "STR") { p++; var s = k.v; while (at("STR")) s += eat("STR").v; return { k: "str", v: s }; }
      if (k.t === "FSTR") { p++; return fstring(k.v, k.line); }
      if (k.t === "NAME") { p++; return { k: "name", name: k.v, line: k.line }; }
      if (k.t === "KW" && (k.v === "True" || k.v === "False")) { p++; return { k: "const", v: k.v === "True" }; }
      if (k.t === "KW" && k.v === "None") { p++; return { k: "const", v: null }; }
      if (at("OP", "(")) {
        p++;
        if (at("OP", ")")) { p++; return { k: "tuple", items: [] }; }
        var e = exprList();
        eat("OP", ")");
        return e;
      }
      if (at("OP", "[")) {
        p++;
        var items = [];
        while (!at("OP", "]")) { items.push(expr()); if (!at("OP", "]")) eat("OP", ","); }
        eat("OP", "]");
        return { k: "list", items: items };
      }
      if (k.t === "EOF" || k.t === "NL") throw new PyError("SyntaxError", "Unfinished", {}, k.line);
      throw new PyError("SyntaxError", "Syntax", { got: k.v || k.t }, k.line);
    }
    // f"…{expr}…": the parts between braces are parsed as expressions.
    function fstring(s, line) {
      var parts = [], i = 0, buf = "";
      while (i < s.length) {
        if (s[i] === "{" && s[i + 1] === "{") { buf += "{"; i += 2; continue; }
        if (s[i] === "}" && s[i + 1] === "}") { buf += "}"; i += 2; continue; }
        if (s[i] === "{") {
          var j = s.indexOf("}", i);
          if (j === -1) throw new PyError("SyntaxError", "String", {}, line);
          if (buf) { parts.push({ k: "str", v: buf }); buf = ""; }
          var inner = s.slice(i + 1, j).split(":")[0];
          parts.push(parseExpr(inner, line));
          i = j + 1;
        } else buf += s[i++];
      }
      if (buf) parts.push({ k: "str", v: buf });
      return { k: "fstr", parts: parts };
    }
    var body = [];
    while (!at("EOF")) {
      if (at("NL")) { p++; continue; }
      if (at("INDENT")) throw new PyError("IndentationError", "Unexpected", {}, peek().line);
      body.push(statement());
    }
    return body;
  }
  function parseExpr(src, line) {
    try {
      var tree = parse(src);
      if (tree.length !== 1 || tree[0].k !== "expr") throw 0;
      return tree[0].e;
    } catch (e) { throw new PyError("SyntaxError", "String", {}, line); }
  }

  // ---------------- running ----------------
  function BreakSignal() {}
  function ContinueSignal() {}
  function ReturnSignal(v) { this.v = v; }

  function run(src, opts) {
    opts = opts || {};
    // out: everything shown in the console (input() prompts and answers too); printed: only what print() wrote,
    // which is what tests compare.
    var out = [], printed = [], inputs = (opts.inputs || []).slice(), steps = 0, limit = opts.limit || 200000, line = 0;
    var seed = opts.seed || 7;
    function rand() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
    // The turtle starts in the middle facing east, as in Python.
    var tState = { x: 0, y: 0, h: 90, pen: true, segs: [] };
    function tMove(d) {
      var r = (tState.h - 90) * Math.PI / 180;
      var nx = tState.x + d * Math.cos(r), ny = tState.y + d * Math.sin(r);
      if (tState.pen) tState.segs.push([tState.x, tState.y, nx, ny]);
      tState.x = nx; tState.y = ny;
    }
    var turtleFns = {
      forward: function (d) { tMove(num(d)); }, backward: function (d) { tMove(-num(d)); },
      right: function (a) { tState.h += num(a); }, left: function (a) { tState.h -= num(a); },
      penup: function () { tState.pen = false; }, pendown: function () { tState.pen = true; },
      speed: function () {}, color: function () {}, pencolor: function () {}, shape: function () {}, done: function () {}, hideturtle: function () {}
    };
    turtleFns.fd = turtleFns.forward; turtleFns.bk = turtleFns.backward; turtleFns.rt = turtleFns.right; turtleFns.lt = turtleFns.left;
    turtleFns.up = turtleFns.penup; turtleFns.down = turtleFns.pendown; turtleFns.pu = turtleFns.penup; turtleFns.pd = turtleFns.pendown;
    function turtleModule() {
      var m = {};
      Object.keys(turtleFns).forEach(function (k) { m[k] = new Builtin(k, function (args) { turtleFns[k].apply(null, args); return null; }); });
      m.Turtle = new Builtin("Turtle", function () { return new Module("Turtle", m); });
      m.Screen = new Builtin("Screen", function () { return new Module("Screen", { exitonclick: new Builtin("exitonclick", function () { return null; }), bgcolor: new Builtin("bgcolor", function () { return null; }) }); });
      return new Module("turtle", m);
    }
    var MODULES = {
      turtle: turtleModule,
      random: function () {
        return new Module("random", {
          randint: new Builtin("randint", function (a) { var lo = num(a[0]), hi = num(a[1]); return lo + Math.floor(rand() * (hi - lo + 1)); }),
          choice: new Builtin("choice", function (a) { var l = iter(a[0]); return l[Math.floor(rand() * l.length)]; }),
          random: new Builtin("random", function () { return new PyFloat(rand()); }),
          seed: new Builtin("seed", function (a) { seed = (num(a[0]) || 0) + 7; return null; }),
          shuffle: new Builtin("shuffle", function (a) { var l = a[0]; for (var i = l.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = l[i]; l[i] = l[j]; l[j] = t; } return null; })
        });
      },
      math: function () {
        return new Module("math", {
          sqrt: new Builtin("sqrt", function (a) { if (num(a[0]) < 0) err("ValueError", "Math"); return new PyFloat(Math.sqrt(num(a[0]))); }),
          floor: new Builtin("floor", function (a) { return Math.floor(num(a[0])); }), ceil: new Builtin("ceil", function (a) { return Math.ceil(num(a[0])); }),
          pi: new PyFloat(Math.PI)
        });
      }
    };

    function toInt(x) {
      if (typeof x === "number") return x;
      if (isFloat(x)) return Math.trunc(x.v);
      if (typeof x === "boolean") return x ? 1 : 0;
      if (typeof x === "string") {
        var s = x.trim().replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); });
        if (/^[-+]?\d+$/.test(s)) return parseInt(s, 10);
        err("ValueError", "Int", { v: x });
      }
      err("TypeError", "Int", { v: str(x) });
    }
    function toFloat(x) {
      if (isNum(x)) return new PyFloat(num(x));
      if (typeof x === "string") {
        var s = x.trim().replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); });
        if (/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return new PyFloat(parseFloat(s));
        err("ValueError", "Float", { v: x });
      }
      err("TypeError", "Float", { v: str(x) });
    }
    function cmpKey(a, b) {
      if (isNum(a) && isNum(b)) return num(a) - num(b);
      if (typeof a === "string" && typeof b === "string") return a < b ? -1 : a > b ? 1 : 0;
      err("TypeError", "Compare", { a: typeName(a), b: typeName(b) });
    }
    function argsOf(a, n, name) { if (a.length < n) err("TypeError", "Args", { f: name, n: n }); }
    var BUILTINS = {
      print: new Builtin("print", function (a, kw) {
        var sep = kw.sep != null ? str(kw.sep) : " ", end = kw.end != null ? str(kw.end) : "\n";
        out.push(a.map(str).join(sep) + end);
        printed.push(a.map(str).join(sep) + end);
        if (opts.onOut) opts.onOut(out.join(""));
        return null;
      }),
      input: new Builtin("input", function (a) {
        if (a.length) out.push(str(a[0]));
        if (!inputs.length) err("EOFError", "Input");
        var v = String(inputs.shift());
        out.push(v + "\n");
        return v;
      }),
      int: new Builtin("int", function (a) { return a.length ? toInt(a[0]) : 0; }),
      float: new Builtin("float", function (a) { return a.length ? toFloat(a[0]) : new PyFloat(0); }),
      str: new Builtin("str", function (a) { return a.length ? str(a[0]) : ""; }),
      bool: new Builtin("bool", function (a) { return a.length ? truthy(a[0]) : false; }),
      len: new Builtin("len", function (a) {
        argsOf(a, 1, "len");
        var x = a[0];
        if (typeof x === "string" || Array.isArray(x)) return Array.from(x).length;
        if (x instanceof Range) return x.list().length;
        err("TypeError", "Len", { t: typeName(x) });
      }),
      abs: new Builtin("abs", function (a) { return mk(Math.abs(num(a[0])), isFloat(a[0])); }),
      round: new Builtin("round", function (a) {
        var v = num(a[0]);
        if (a.length < 2) { var r = Math.round(v); if (Math.abs(v % 1) === 0.5) r = 2 * Math.round(v / 2); return r; }
        var k = Math.pow(10, num(a[1]));
        return new PyFloat(Math.round(v * k) / k);
      }),
      min: new Builtin("min", function (a) { var l = a.length === 1 ? iter(a[0]) : a; if (!l.length) err("ValueError", "Empty"); return l.reduce(function (m, v) { return cmpKey(v, m) < 0 ? v : m; }); }),
      max: new Builtin("max", function (a) { var l = a.length === 1 ? iter(a[0]) : a; if (!l.length) err("ValueError", "Empty"); return l.reduce(function (m, v) { return cmpKey(v, m) > 0 ? v : m; }); }),
      sum: new Builtin("sum", function (a) { return iter(a[0]).reduce(function (t, v) { return binop("+", t, v); }, 0); }),
      sorted: new Builtin("sorted", function (a, kw) { var l = iter(a[0]).sort(cmpKey); if (kw.reverse && truthy(kw.reverse)) l.reverse(); return l; }),
      list: new Builtin("list", function (a) { return a.length ? iter(a[0]) : []; }),
      range: new Builtin("range", function (a) {
        a.forEach(function (v) { if (!(typeof v === "number" || typeof v === "boolean")) err("TypeError", "Range", { t: typeName(v) }); });
        if (a.length === 1) return new Range(0, num(a[0]), 1);
        return new Range(num(a[0]), num(a[1]), a.length > 2 ? num(a[2]) : 1);
      }),
      chr: new Builtin("chr", function (a) { return String.fromCodePoint(num(a[0])); }),
      ord: new Builtin("ord", function (a) { if (typeof a[0] !== "string" || Array.from(a[0]).length !== 1) err("TypeError", "Ord"); return a[0].codePointAt(0); }),
      bin: new Builtin("bin", function (a) { var v = num(a[0]); return (v < 0 ? "-0b" : "0b") + Math.abs(v).toString(2); }),
      enumerate: new Builtin("enumerate", function (a) { return iter(a[0]).map(function (v, i) { var t = [i, v]; t.tuple = true; return t; }); }),
      type: new Builtin("type", function (a) { return "<class '" + typeName(a[0]) + "'>"; })
    };

    // ---- expressions ----
    function binop(op, a, b) {
      if (op === "+") {
        if (isNum(a) && isNum(b)) return mk(num(a) + num(b), isFloat(a) || isFloat(b));
        if (typeof a === "string" && typeof b === "string") return a + b;
        if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
        err("TypeError", typeof a === "string" || typeof b === "string" ? "AddStr" : "Op", { op: op, a: typeName(a), b: typeName(b) });
      }
      if (op === "*") {
        if (isNum(a) && isNum(b)) return mk(num(a) * num(b), isFloat(a) || isFloat(b));
        if (typeof a === "string" && typeof b === "number") return b > 0 ? a.repeat(b) : "";
        if (typeof b === "string" && typeof a === "number") return a > 0 ? b.repeat(a) : "";
        if (Array.isArray(a) && typeof b === "number") { var r = []; for (var i = 0; i < b; i++) r = r.concat(a); return r; }
        err("TypeError", "Op", { op: op, a: typeName(a), b: typeName(b) });
      }
      if (!isNum(a) || !isNum(b)) err("TypeError", typeof a === "string" || typeof b === "string" ? "MathStr" : "Op", { op: op, a: typeName(a), b: typeName(b) });
      var x = num(a), y = num(b), fl = isFloat(a) || isFloat(b);
      if (op === "-") return mk(x - y, fl);
      if (op === "/") { if (y === 0) err("ZeroDivisionError", "Zero"); return new PyFloat(x / y); }
      if (op === "//") { if (y === 0) err("ZeroDivisionError", "Zero"); return mk(Math.floor(x / y), fl); }
      if (op === "%") { if (y === 0) err("ZeroDivisionError", "Zero"); return mk(((x % y) + y) % y, fl); }
      if (op === "**") { var v = Math.pow(x, y); return mk(v, fl || y < 0); }
    }
    function compare(op, a, b) {
      if (op === "==") return equal(a, b);
      if (op === "!=") return !equal(a, b);
      if (op === "is") return a === b || (a === null && b === null);
      if (op === "is not") return !(a === b || (a === null && b === null));
      if (op === "in" || op === "not in") {
        var has;
        if (typeof b === "string") { if (typeof a !== "string") err("TypeError", "InStr"); has = b.indexOf(a) !== -1; }
        else has = iter(b).some(function (v) { return equal(v, a); });
        return op === "in" ? has : !has;
      }
      var c = cmpKey(a, b);
      return op === "<" ? c < 0 : op === ">" ? c > 0 : op === "<=" ? c <= 0 : c >= 0;
    }
    function lookup(scope, name) {
      for (var s = scope; s; s = s.parent) if (Object.prototype.hasOwnProperty.call(s.vars, name)) return s.vars[name];
      if (BUILTINS[name]) return BUILTINS[name];
      err("NameError", "Name", { name: name });
    }
    function method(obj, name) {
      if (Array.isArray(obj)) {
        var L = {
          append: function (a) { obj.push(a[0]); return null; },
          pop: function (a) { if (!obj.length) err("IndexError", "PopEmpty"); var i = a.length ? num(a[0]) : obj.length - 1; if (i < 0) i += obj.length; if (i < 0 || i >= obj.length) err("IndexError", "Index"); return obj.splice(i, 1)[0]; },
          insert: function (a) { obj.splice(num(a[0]), 0, a[1]); return null; },
          remove: function (a) { var i = obj.findIndex(function (v) { return equal(v, a[0]); }); if (i < 0) err("ValueError", "NotInList", { v: str(a[0]) }); obj.splice(i, 1); return null; },
          index: function (a) { var i = obj.findIndex(function (v) { return equal(v, a[0]); }); if (i < 0) err("ValueError", "NotInList", { v: str(a[0]) }); return i; },
          count: function (a) { return obj.filter(function (v) { return equal(v, a[0]); }).length; },
          sort: function (a, kw) { obj.sort(cmpKey); if (kw && kw.reverse && truthy(kw.reverse)) obj.reverse(); return null; },
          reverse: function () { obj.reverse(); return null; },
          extend: function (a) { iter(a[0]).forEach(function (v) { obj.push(v); }); return null; }
        };
        if (L[name]) return new BoundMethod(obj, name, L[name]);
      } else if (typeof obj === "string") {
        var S = {
          upper: function () { return obj.toUpperCase(); }, lower: function () { return obj.toLowerCase(); },
          strip: function () { return obj.trim(); }, split: function (a) { return a.length ? obj.split(a[0]) : obj.trim().split(/\s+/).filter(Boolean); },
          join: function (a) { return iter(a[0]).map(function (v) { if (typeof v !== "string") err("TypeError", "Join"); return v; }).join(obj); },
          replace: function (a) { return obj.split(a[0]).join(a[1]); }, count: function (a) { return obj.split(a[0]).length - 1; },
          find: function (a) { return obj.indexOf(a[0]); }, isdigit: function () { return /^\d+$/.test(obj); },
          startswith: function (a) { return obj.indexOf(a[0]) === 0; }, endswith: function (a) { return obj.slice(-a[0].length) === a[0]; }
        };
        if (S[name]) return new BoundMethod(obj, name, S[name]);
      } else if (obj instanceof Module) {
        if (Object.prototype.hasOwnProperty.call(obj.members, name)) return obj.members[name];
      }
      err("AttributeError", "Attr", { t: typeName(obj), name: name });
    }
    function evaluate(e, scope) {
      switch (e.k) {
        case "num": return e.v;
        case "str": return e.v;
        case "const": return e.v;
        case "fstr": return e.parts.map(function (p) { return str(evaluate(p, scope)); }).join("");
        case "name": return lookup(scope, e.name);
        case "list": return e.items.map(function (x) { return evaluate(x, scope); });
        case "tuple": var t = e.items.map(function (x) { return evaluate(x, scope); }); t.tuple = true; return t;
        case "unary": var v = evaluate(e.a, scope); if (!isNum(v)) err("TypeError", "Unary", { t: typeName(v) }); return e.op === "-" ? mk(-num(v), isFloat(v)) : v;
        case "not": return !truthy(evaluate(e.a, scope));
        case "and": var a = evaluate(e.a, scope); return truthy(a) ? evaluate(e.b, scope) : a;
        case "or": var o = evaluate(e.a, scope); return truthy(o) ? o : evaluate(e.b, scope);
        case "ifexp": return truthy(evaluate(e.test, scope)) ? evaluate(e.yes, scope) : evaluate(e.no, scope);
        case "bin": return binop(e.op, evaluate(e.a, scope), evaluate(e.b, scope));
        case "cmp":
          var left = evaluate(e.first, scope);
          for (var i = 0; i < e.ops.length; i++) {
            var right = evaluate(e.rest[i], scope);
            if (!compare(e.ops[i], left, right)) return false;
            left = right;
          }
          return true;
        case "index":
          var obj = evaluate(e.obj, scope), idx = evaluate(e.i, scope);
          if (typeof obj === "string" || Array.isArray(obj)) {
            if (typeof idx !== "number") err("TypeError", "IndexType", { t: typeName(idx) });
            var arr = typeof obj === "string" ? Array.from(obj) : obj, k = idx < 0 ? idx + arr.length : idx;
            if (k < 0 || k >= arr.length) err("IndexError", "Index");
            return arr[k];
          }
          if (obj instanceof Range) { var rl = obj.list(); var rk = idx < 0 ? idx + rl.length : idx; if (rk < 0 || rk >= rl.length) err("IndexError", "Index"); return rl[rk]; }
          err("TypeError", "NotIndexable", { t: typeName(obj) });
          break;
        case "slice":
          var sobj = evaluate(e.obj, scope), sarr = typeof sobj === "string" ? Array.from(sobj) : Array.isArray(sobj) ? sobj : iter(sobj);
          var lo = e.lo ? num(evaluate(e.lo, scope)) : 0, hi = e.hi ? num(evaluate(e.hi, scope)) : sarr.length;
          if (lo < 0) lo += sarr.length;
          if (hi < 0) hi += sarr.length;
          var part = sarr.slice(Math.max(0, lo), Math.max(0, hi));
          return typeof sobj === "string" ? part.join("") : part;
        case "attr": return method(evaluate(e.obj, scope), e.name);
        case "call":
          line = e.line || line;
          var f = evaluate(e.f, scope), args = e.args.map(function (x) { return evaluate(x, scope); }), kw = {};
          Object.keys(e.kwargs).forEach(function (k) { kw[k] = evaluate(e.kwargs[k], scope); });
          return call(f, args, kw);
      }
      err("SyntaxError", "Syntax", { got: e.k });
    }
    var depth = 0;
    function call(f, args, kw) {
      if (f instanceof Builtin) return f.fn(args, kw || {});
      if (f instanceof BoundMethod) return f.fn(args, kw || {});
      if (f instanceof Func) {
        if (args.length > f.params.length) err("TypeError", "TooMany", { f: f.name, n: f.params.length });
        var local = { vars: {}, parent: f.scope, fn: true };
        f.params.forEach(function (pn, i) {
          if (i < args.length) local.vars[pn] = args[i];
          else if (kw && Object.prototype.hasOwnProperty.call(kw, pn)) local.vars[pn] = kw[pn];
          else if (f.defaults[pn]) local.vars[pn] = evaluate(f.defaults[pn], f.scope);
          else err("TypeError", "Missing", { f: f.name, name: pn });
        });
        if (++depth > 200) err("RecursionError", "Recursion");
        try { exec(f.body, local); } catch (x) { if (x instanceof ReturnSignal) { depth--; return x.v; } depth--; throw x; }
        depth--;
        return null;
      }
      err("TypeError", "NotCallable", { t: typeName(f) });
    }
    function assign(target, value, scope) {
      if (target.k === "name") { scope.vars[target.name] = value; return; }
      if (target.k === "index") {
        var obj = evaluate(target.obj, scope), idx = evaluate(target.i, scope);
        if (!Array.isArray(obj) || obj.tuple) err("TypeError", "SetItem", { t: typeName(obj) });
        if (typeof idx !== "number") err("TypeError", "IndexType", { t: typeName(idx) });
        var k = idx < 0 ? idx + obj.length : idx;
        if (k < 0 || k >= obj.length) err("IndexError", "Index");
        obj[k] = value;
        return;
      }
      if (target.k === "tuple") {
        var vals = iter(value);
        if (vals.length !== target.items.length) err("ValueError", "Unpack", { n: target.items.length, m: vals.length });
        target.items.forEach(function (t, i) { assign(t, vals[i], scope); });
      }
    }
    function tick(st) {
      line = st.line || line;
      if (++steps > limit) err("TimeoutError", "Timeout");
    }
    function exec(body, scope) {
      for (var i = 0; i < body.length; i++) {
        var st = body[i];
        tick(st);
        switch (st.k) {
          case "expr": evaluate(st.e, scope); break;
          case "assign": var v = evaluate(st.value, scope); st.targets.forEach(function (t) { assign(t, v, scope); }); break;
          case "aug":
            var cur = evaluate(st.target, scope);
            assign(st.target, binop(st.op, cur, evaluate(st.value, scope)), scope);
            break;
          case "pass": break;
          case "break": throw new BreakSignal();
          case "continue": throw new ContinueSignal();
          case "return": if (!scope.fn) err("SyntaxError", "Return"); throw new ReturnSignal(st.value ? evaluate(st.value, scope) : null);
          case "if":
            var done = false;
            for (var k = 0; k < st.tests.length && !done; k++) {
              if (truthy(evaluate(st.tests[k][0], scope))) { exec(st.tests[k][1], scope); done = true; }
            }
            if (!done && st.other) exec(st.other, scope);
            break;
          case "while":
            while (truthy(evaluate(st.test, scope))) {
              tick(st);
              try { exec(st.body, scope); } catch (x) { if (x instanceof BreakSignal) break; if (!(x instanceof ContinueSignal)) throw x; }
            }
            break;
          case "for":
            var items = iter(evaluate(st.iter, scope));
            for (var j = 0; j < items.length; j++) {
              tick(st);
              assign(st.target, items[j], scope);
              try { exec(st.body, scope); } catch (y) { if (y instanceof BreakSignal) break; if (!(y instanceof ContinueSignal)) throw y; }
            }
            break;
          case "def": scope.vars[st.name] = new Func(st.name, st.params, st.defaults, st.body, scope); break;
          case "import":
            st.names.forEach(function (n) { if (!MODULES[n]) err("ImportError", "Module", { name: n }); scope.vars[n] = MODULES[n](); });
            break;
          case "from":
            if (!MODULES[st.mod]) err("ImportError", "Module", { name: st.mod });
            var mod = MODULES[st.mod]();
            (st.what === "*" ? Object.keys(mod.members) : st.what).forEach(function (n) {
              if (!mod.members[n]) err("ImportError", "Name", { name: n, mod: st.mod });
              scope.vars[n] = mod.members[n];
            });
            break;
        }
      }
    }

    var global = { vars: {}, parent: null }, error = null;
    try {
      var tree = parse(src);
      exec(tree, global);
    } catch (x) {
      if (x instanceof PyError) { error = x; if (!error.line) error.line = line; }
      else if (x instanceof BreakSignal || x instanceof ContinueSignal) error = new PyError("SyntaxError", "Outside", {}, line);
      else if (x instanceof ReturnSignal) error = new PyError("SyntaxError", "Return", {}, line);
      else if (x instanceof RangeError) error = new PyError("RecursionError", "Recursion", {}, line);
      else throw x;
    }
    var vars = {};
    Object.keys(global.vars).forEach(function (k) { vars[k] = global.vars[k]; });
    return { out: out.join(""), printed: printed.join(""), error: error, vars: vars, segs: tState.segs };
  }
  B.py = { run: run, str: str, equal: equal, PyFloat: PyFloat };
})();

(function () {
  var el = B.el, E = B.engine, NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, a) { var e = document.createElementNS(NS, tag); Object.keys(a || {}).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; }
  function norm(s) { return String(s).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").replace(/\n+$/, ""); }
  function errText(e) {
    if (!e) return "";
    var msg = B.t("py" + e.key, e.args);
    return B.t("pyErrLine", { line: B.fa(e.line || 1), type: e.type, msg: msg });
  }
  // The goal's lines, from a turtle-step program (as in js/steps/thinking.js), starting at (0, 0) facing east like
  // Python's turtle.
  function goalSegs(goal) {
    var x = 0, y = 0, h = 90, pen = true, segs = [];
    (function run(list) {
      list.forEach(function (b) {
        if (!Array.isArray(b) && b.repeat) { for (var k = 0; k < b.repeat; k++) run(b.body); return; }
        var op = Array.isArray(b) ? b[0] : b, v = Array.isArray(b) ? b[1] : 0;
        if (op === "fd") { var r = (h - 90) * Math.PI / 180, nx = x + v * Math.cos(r), ny = y + v * Math.sin(r); if (pen) segs.push([x, y, nx, ny]); x = nx; y = ny; }
        else if (op === "rt") h += v; else if (op === "lt") h -= v; else if (op === "up") pen = false; else if (op === "down") pen = true;
      });
    })(goal);
    return segs;
  }
  function segKeys(segs) {
    var o = {};
    segs.forEach(function (s) {
      if (Math.hypot(s[2] - s[0], s[3] - s[1]) < 0.5) return;
      var a = Math.round(s[0]) + "," + Math.round(s[1]), b = Math.round(s[2]) + "," + Math.round(s[3]);
      o[a < b ? a + "|" + b : b + "|" + a] = true;
    });
    return o;
  }

  E.steps.pycode = function (s, box, done) {
    var root = el("div", { class: "py-game" });
    box.appendChild(root);
    root.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) root.appendChild(sb);

    // The same program as blocks, beside the code.
    function blocksView() {
      if (!s.blocks) return null;
      return el("div", { class: "py-blocks", "aria-label": B.t("pyBlocksAria") }, s.blocks.map(function (b) {
        var n = el("div", { class: "py-blk " + (b.kind || "say"), text: b.text });
        n.style.marginInlineStart = (b.depth || 0) * 18 + "px";
        return n;
      }));
    }

    if (s.mode === "predict") {
      var pre = el("pre", { class: "py-code-ro", dir: "ltr", lang: "en", text: s.given });
      root.appendChild(el("div", { class: "py-pair" }, [blocksView(), pre]));
      E.choice(root, { options: s.options.map(function (o) { return typeof o === "object" ? o : { label: o, value: o }; }), answer: s.answer, stack: true }, done);
      root.querySelectorAll(".opt").forEach(function (o) { o.setAttribute("dir", "ltr"); o.classList.add("py-opt"); });
      return;
    }

    // ---------- The editor ----------
    var gutter = el("pre", { class: "py-gutter", "aria-hidden": "true" });
    var ta = el("textarea", { class: "py-code", dir: "ltr", lang: "en", spellcheck: "false", autocapitalize: "off", autocomplete: "off", "aria-label": B.t("pyCodeAria") });
    ta.value = s.given || "";
    function lines() {
      var n = ta.value.split("\n").length, t = "";
      for (var i = 1; i <= Math.max(n, 6); i++) t += B.fa(i) + "\n";
      gutter.textContent = t;
      ta.rows = Math.max(6, Math.min(18, n + 1));
    }
    ta.addEventListener("input", function () { lines(); clearMark(); });
    ta.addEventListener("scroll", function () { gutter.scrollTop = ta.scrollTop; });
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Tab") { e.preventDefault(); insert("    "); }
      else if (e.key === "Enter") {
        // Keep the indentation, and indent after a colon.
        var before = ta.value.slice(0, ta.selectionStart), cur = before.split("\n").pop();
        var ind = /^ */.exec(cur)[0] + (/:\s*$/.test(cur) ? "    " : "");
        e.preventDefault();
        insert("\n" + ind);
      }
    });
    function insert(t) {
      var a = ta.selectionStart, b = ta.selectionEnd;
      ta.value = ta.value.slice(0, a) + t + ta.value.slice(b);
      ta.selectionStart = ta.selectionEnd = a + t.length;
      lines();
      ta.focus();
    }
    var editor = el("div", { class: "py-editor", dir: "ltr" }, [gutter, ta]);
    root.appendChild(el("div", { class: "py-pair" }, [blocksView(), editor]));
    if (s.snippets) {
      root.appendChild(el("div", { class: "py-snips", dir: "ltr" }, s.snippets.map(function (t) {
        var b = el("button", { class: "py-snip", type: "button", text: t, lang: "en" });
        // A snippet with () puts the cursor between the brackets.
        b.addEventListener("click", function () {
          insert(t);
          var k = t.indexOf("()");
          if (k !== -1) ta.selectionStart = ta.selectionEnd = ta.selectionStart - (t.length - k - 1);
        });
        return b;
      })));
    }
    var inputsBox = null;
    if (s.inputs) {
      inputsBox = el("textarea", { class: "py-inputs", dir: "auto", rows: Math.max(1, s.inputs.length), "aria-label": B.t("pyInputsAria") });
      inputsBox.value = s.inputs.join("\n");
      root.appendChild(el("label", { class: "py-inputs-label" }, [B.t("pyInputs") + " ", inputsBox]));
    }
    var paper = null, ink = null, goal = s.goal ? goalSegs(s.goal) : null;
    var SC = 1, OX = 100, OY = 100;
    if (s.turtle) {
      paper = svgEl("svg", { viewBox: "0 0 200 200", class: "tt-paper py-paper", role: "img", "aria-label": B.t("ttPaperAria") });
      var gg = svgEl("g", { class: "tt-goal" });
      ink = svgEl("g", { class: "tt-ink" });
      if (goal) {
        // Centre the goal on the paper.
        var xs = [], ys = [];
        goal.forEach(function (g) { xs.push(g[0], g[2]); ys.push(g[1], g[3]); });
        OX = 100 - (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
        OY = 100 - (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
        goal.forEach(function (g) { gg.appendChild(svgEl("line", { x1: g[0] + OX, y1: g[1] + OY, x2: g[2] + OX, y2: g[3] + OY })); });
      }
      paper.appendChild(gg);
      paper.appendChild(ink);
      root.appendChild(el("div", { class: "tt-wrap" }, [paper]));
    }
    var outBox = el("pre", { class: "py-out", dir: "auto", "aria-live": "polite" });
    root.appendChild(el("p", { class: "py-out-label", text: B.t("pyOutput") }));
    root.appendChild(outBox);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    root.appendChild(fb);
    function clearMark() { editor.classList.remove("has-error"); }
    function show(res) {
      outBox.textContent = res.out;
      outBox.classList.toggle("error", !!res.error);
      if (res.error) {
        outBox.textContent += (res.out && !/\n$/.test(res.out) ? "\n" : "") + "⚠ " + errText(res.error);
        editor.classList.add("has-error");
      }
      if (ink) {
        ink.innerHTML = "";
        res.segs.forEach(function (g) { ink.appendChild(svgEl("line", { x1: g[0] + OX, y1: g[1] + OY, x2: g[2] + OX, y2: g[3] + OY })); });
      }
    }
    function runIt() {
      var res = B.py.run(ta.value, { inputs: inputsBox ? inputsBox.value.split("\n") : [], seed: s.seed });
      show(res);
      fb.className = "feedback";
      fb.textContent = "";
      return res;
    }
    var checks = 0;
    function check() {
      checks++;
      var problem = null, res;
      if (s.tests) {
        for (var i = 0; i < s.tests.length && !problem; i++) {
          var t = s.tests[i];
          res = B.py.run(ta.value, { inputs: t.inputs || [], seed: s.seed });
          if (res.error) problem = B.t("pyTestError", { n: B.fa(i + 1), err: errText(res.error) });
          else if (norm(res.printed) !== norm(t.out)) {
            problem = B.t("pyTestWrong", { n: B.fa(i + 1), inp: (t.inputs || []).join("، ") || "—", want: norm(t.out), got: norm(res.printed) || B.t("pyNothing") });
          }
        }
        if (!problem && res) show(res);
      } else {
        res = runIt();
        if (res.error) problem = errText(res.error);
        else if (s.expect != null && norm(res.printed).indexOf(norm(s.expect)) === -1) problem = B.t("pyExpect", { want: s.expect });
        else if (s.minLines && norm(res.printed).split("\n").filter(function (l) { return l.trim(); }).length < s.minLines) problem = B.t("pyMinLines", { n: B.fa(s.minLines) });
        else if (s.vars) {
          Object.keys(s.vars).forEach(function (k) {
            if (problem) return;
            if (!(k in res.vars)) problem = B.t("pyVarMissing", { name: k });
            else if (!B.py.equal(res.vars[k], s.vars[k])) problem = B.t("pyVarWrong", { name: k, want: B.py.str(s.vars[k]), got: B.py.str(res.vars[k]) });
          });
        }
        if (!problem && goal) {
          var a = segKeys(res.segs), g = segKeys(goal);
          var same = Object.keys(a).length === Object.keys(g).length && Object.keys(g).every(function (k) { return a[k]; });
          if (!same) problem = B.t("ttWrong");
        }
      }
      if (!problem) {
        fb.className = "feedback good";
        fb.textContent = B.t("pyRight") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        checkBtn.disabled = true;
        setTimeout(function () { done(true, checks === 1); }, 1500);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = problem;
    }
    var runBtn = el("button", { class: "btn secondary", type: "button", text: B.t("codeRun"), onclick: runIt });
    var checkBtn = E.nextBtn(B.t("pyCheck"), check);
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [runBtn, checkBtn]));
    lines();
  };
})();
