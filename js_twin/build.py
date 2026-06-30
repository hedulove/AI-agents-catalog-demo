"""Build standalone index.html for js_twin (no server required)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FRONTEND = ROOT.parent / "frontend"

shared = (FRONTEND / "js" / "components" / "Shared.jsx").read_text(encoding="utf-8")
shared = shared.replace(
    """/* ── API helper ── */
async function runDemo(demoId, scenario = "default") {
  const res = await fetch(`/api/demos/${demoId}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

""",
    "/* runDemo provided by js/data.js */\n\n",
)

demos = (FRONTEND / "js" / "demos" / "AllDemos.jsx").read_text(encoding="utf-8")

app = (FRONTEND / "js" / "app.jsx").read_text(encoding="utf-8")
app = app.replace(
    """  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        setCatalog(data.demos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);""",
    """  useEffect(() => {
    setCatalog(window.CATALOG_DATA.catalog || []);
    setLoading(false);
  }, []);""",
)

parts_json = json.dumps([shared, demos, app], ensure_ascii=False)

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Agent Demo Catalog (Standalone)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
  <script>
    (function () {{
      if (localStorage.getItem("catalog-theme") === "light") {{
        document.documentElement.setAttribute("data-theme", "light");
      }}
    }})();
  </script>
  <script src="js/data.js"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    (function () {{
      const parts = {parts_json};
      for (const code of parts) {{
        const compiled = Babel.transform(code, {{ presets: [["react", {{ runtime: "classic" }}]] }}).code;
        eval(compiled);
      }}
    }})();
  </script>
</body>
</html>
"""

(ROOT / "index.html").write_text(html, encoding="utf-8")
print(f"Built {ROOT / 'index.html'} ({len(html)} bytes)")
