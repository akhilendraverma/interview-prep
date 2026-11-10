/* Runs code in the browser. Nothing is sent to a server.
   JavaScript: a fresh Web Worker per run (stopped after 4 s).
   Python: Pyodide (CPython compiled to WebAssembly) in a Web Worker, loaded on first use.
   SQL: sql.js (SQLite compiled to WebAssembly). */
window.RUN = (() => {
  const PYODIDE_URL = "https://cdn.jsdelivr.net/npm/pyodide@0.29.5/";
  const SQLJS_URL = "https://cdn.jsdelivr.net/npm/sql.js@1.16.0/dist/";

  // ---------------------------------------------------------------- JavaScript
  const JS_WORKER = `
self.onmessage = (e) => {
  const { code, fn, tests } = e.data;
  const logs = [];
  const show = (x) => typeof x === "string" ? x : (() => { try { return JSON.stringify(x); } catch { return String(x); } })();
  console.log = console.info = console.warn = console.error = (...a) => { if (logs.length < 200) logs.push(a.map(show).join(" ")); };
  let f;
  try { f = new Function(code + "\\n;return typeof " + fn + " === 'function' ? " + fn + " : undefined;")(); }
  catch (err) { postMessage({ error: String(err && err.stack ? err.message : err), logs }); return; }
  if (!f) { postMessage({ error: "Function " + fn + "() was not found. Keep the function name from the starter code.", logs }); return; }
  const results = tests.map((args) => {
    const t0 = performance.now();
    try { const value = f(...structuredClone(args)); return { value: value === undefined ? null : JSON.parse(JSON.stringify(value)), ms: performance.now() - t0 }; }
    catch (err) { return { error: String(err && err.message || err), ms: performance.now() - t0 }; }
  });
  postMessage({ results, logs });
};`;
  let jsUrl;
  function runJs(code, fn, argsList, timeout = 4000) {
    jsUrl = jsUrl || URL.createObjectURL(new Blob([JS_WORKER], { type: "text/javascript" }));
    return new Promise((resolve) => {
      const w = new Worker(jsUrl);
      const timer = setTimeout(() => { w.terminate(); resolve({ error: `Time limit exceeded (${timeout / 1000} s). Check for an endless loop.` }); }, timeout);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); resolve(e.data); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ error: e.message || "Error" }); };
      w.postMessage({ code, fn, tests: argsList });
    });
  }

  // ---------------------------------------------------------------- Python
  const PY_WORKER = `
importScripts("${PYODIDE_URL}pyodide.js");
const ready = loadPyodide({ indexURL: "${PYODIDE_URL}" }).then(async (py) => {
  await py.runPythonAsync(\`
import json, sys, io, traceback, time

def __prep_run(code, fn, tests_json):
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    try:
        ns = {"__name__": "__main__"}
        try:
            exec(compile(code, "solution.py", "exec"), ns)
        except BaseException:
            return json.dumps({"error": traceback.format_exc(limit=-1).strip(), "logs": buf.getvalue()[-4000:]})
        f = ns.get(fn)
        if not callable(f):
            return json.dumps({"error": "Function " + fn + "() was not found. Keep the function name from the starter code.", "logs": buf.getvalue()[-4000:]})
        results = []
        for args in json.loads(tests_json):
            t0 = time.perf_counter()
            try:
                value = json.loads(json.dumps(f(*args), default=str))
                results.append({"value": value, "ms": (time.perf_counter() - t0) * 1000})
            except BaseException as e:
                results.append({"error": type(e).__name__ + ": " + str(e), "ms": (time.perf_counter() - t0) * 1000})
        return json.dumps({"results": results, "logs": buf.getvalue()[-4000:]})
    finally:
        sys.stdout = old
\`);
  return py;
});
self.onmessage = async (e) => {
  try {
    const py = await ready;
    if (e.data.ping) { postMessage({ ready: true }); return; }
    const run = py.globals.get("__prep_run");
    const out = run(e.data.code, e.data.fn, JSON.stringify(e.data.tests));
    run.destroy();
    postMessage(JSON.parse(out));
  } catch (err) { postMessage({ error: "Python could not start: " + (err && err.message || err) }); }
};`;
  let pyWorker = null, pyReady = null;
  function pyLoad() {
    if (!pyWorker) {
      const url = URL.createObjectURL(new Blob([PY_WORKER], { type: "text/javascript" }));
      pyWorker = new Worker(url);
      pyReady = new Promise((resolve) => {
        pyWorker.onmessage = (e) => resolve(e.data);
        pyWorker.onerror = (e) => resolve({ error: "Python could not be loaded. Check your internet connection. " + (e.message || "") });
        pyWorker.postMessage({ ping: true });
      }).then((r) => { if (r.error) { pyWorker.terminate(); pyWorker = null; } return r; });
    }
    return pyReady;
  }
  async function runPy(code, fn, argsList, timeout = 10000) {
    const r = await pyLoad();
    if (r.error) return r;
    return new Promise((resolve) => {
      const w = pyWorker;
      const timer = setTimeout(() => { w.terminate(); pyWorker = null; resolve({ error: `Time limit exceeded (${timeout / 1000} s). Check for an endless loop.` }); }, timeout);
      w.onmessage = (e) => { clearTimeout(timer); resolve(e.data); };
      w.postMessage({ code, fn, tests: argsList });
    });
  }

  // ---------------------------------------------------------------- SQL
  let sqlReady = null;
  function sqlLoad() {
    if (!sqlReady) {
      sqlReady = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = SQLJS_URL + "sql-wasm.js";
        s.onload = () => initSqlJs({ locateFile: (f) => SQLJS_URL + f }).then(resolve, reject);
        s.onerror = () => reject(new Error("The SQL engine could not be loaded. Check your internet connection."));
        document.head.append(s);
      }).catch((e) => { sqlReady = null; throw e; });
    }
    return sqlReady;
  }
  /** Runs `query` on a fresh database; returns {columns, rows} of the last statement that returned rows. */
  async function runSql(schema, data, query) {
    const SQL = await sqlLoad();
    const db = new SQL.Database();
    try {
      db.exec(schema + data);
      const t0 = performance.now();
      const res = db.exec(query);
      const last = res[res.length - 1] || { columns: [], values: [] };
      return { columns: last.columns, rows: last.values, ms: performance.now() - t0 };
    } catch (err) {
      return { error: String(err.message || err) };
    } finally { db.close(); }
  }
  const norm = (v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v);
  /** Compare two result sets: same columns count and same rows (order matters only if `ordered`). */
  function sameRows(a, b, ordered) {
    if (!a || !b || a.error || b.error) return false;
    if (a.columns.length !== b.columns.length || a.rows.length !== b.rows.length) return false;
    const fix = (rows) => rows.map((r) => JSON.stringify(r.map(norm)));
    const x = fix(a.rows), y = fix(b.rows);
    if (!ordered) { x.sort(); y.sort(); }
    return x.every((r, i) => r === y[i]);
  }

  return { runJs, runPy, pyLoad, runSql, sameRows, PYODIDE_URL, SQLJS_URL };
})();
