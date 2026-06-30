# AI Agent Demo Catalog — Standalone (JavaScript Twin)

Client-only version of the demo catalog. **No FastAPI server required** — open `index.html` in your browser.

## Quick start

1. Open **`js_twin/index.html`** in Chrome, Edge, or Firefox (double-click or drag into the browser).
2. Internet access is needed once to load React, Babel, Chart.js, and fonts from CDN.

## Rebuild after main project changes

If you update demos in `backend/demos/responses.py` or frontend React components:

```bash
python js_twin/build_data.py   # refresh embedded demo data
python js_twin/build.py        # rebuild index.html from frontend JSX
```

## Structure

```
js_twin/
├── index.html      # Standalone page (embedded React components)
├── css/styles.css  # Same styles as main catalog
├── js/data.js      # Catalog + pre-programmed agent responses
├── build_data.py   # Export data from backend
└── build.py        # Bundle JSX into index.html
```

## Differences from main project

| Main project | js_twin |
|--------------|---------|
| FastAPI serves API + static files | No server — all data in `js/data.js` |
| `fetch('/api/...')` | `runDemo()` resolves locally |
| Run `python run.py` | Open `index.html` directly |

Appearance, themes (light/dark), and all 10 demos behave the same.
