// This worker has NO access to the DOM, the page, or the network beyond
// downloading the Pyodide runtime itself. If a kid's code hangs (e.g. an
// infinite loop), the main thread simply terminates this whole worker.
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

const pyodideReadyPromise = loadPyodide().then((pyodide) => {
  postMessage({ ready: true });
  return pyodide;
});

const WRAPPER = `
import sys, io, json

_out = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _out
_error = None
try:
    exec(__user_code__, {"__name__": "__main__"})
except Exception as _e:
    _error = type(_e).__name__ + ": " + str(_e)
finally:
    sys.stdout = _old_stdout

json.dumps({"output": _out.getvalue(), "error": _error})
`;

self.onmessage = async (event) => {
  const { id, code } = event.data;
  try {
    const pyodide = await pyodideReadyPromise;
    pyodide.globals.set("__user_code__", code);
    const resultJson = await pyodide.runPythonAsync(WRAPPER);
    const parsed = JSON.parse(resultJson);
    postMessage({ id, output: parsed.output, error: parsed.error });
  } catch (err) {
    postMessage({ id, output: "", error: "PyodideError: " + (err && err.message ? err.message : String(err)) });
  }
};
