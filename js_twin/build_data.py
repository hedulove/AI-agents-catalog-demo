"""One-off helper to export backend demo data to js_twin/js/data.js."""
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("responses", ROOT / "backend" / "demos" / "responses.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

payload = {"catalog": mod.CATALOG, "scenarios": mod.DEMO_SCENARIOS}
out = Path(__file__).parent / "js" / "data.js"
helpers = """
function getDemoResponse(demoId, scenario) {
  const demo = window.CATALOG_DATA.scenarios[demoId];
  if (!demo) return { error: "Unknown demo: " + demoId };
  const payload = demo[scenario] || demo.default;
  if (!payload) return { error: "Unknown scenario: " + scenario };
  return payload;
}

function runDemo(demoId, scenario) {
  return Promise.resolve(getDemoResponse(demoId, scenario || "default"));
}

window.getDemoResponse = getDemoResponse;
window.runDemo = runDemo;
"""
out.write_text("window.CATALOG_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n" + helpers, encoding="utf-8")
print(f"Wrote {out} ({len(mod.CATALOG)} demos)")
