# AI Agent Demo Catalog

Interactive web catalog showcasing **10 agentic AI use cases** for data & analytics consulting demos. Each demo simulates multi-agent workflows with pre-programmed responses — **no LLM connection required**.

## Stack

- **Backend:** FastAPI (Python)
- **Frontend:** React 18 via CDN + Babel Standalone (no build step)
- **Charts:** Chart.js

## Quick Start

```bash
# From project root
pip install -r requirements.txt
python run.py
```

Open **http://localhost:8000** in your browser.

## Demos

| # | Demo | Theme |
|---|------|-------|
| 1 | Early Warning Command Center | Insights to Impact |
| 2 | Insights-to-Impact Hub | Insights to Impact |
| 3 | Forecast Variance Simulator | Insights to Impact |
| 4 | Market Research Intelligence Search | Market Intelligence |
| 5 | Research Gap Companion | Market Intelligence |
| 6 | Digital Twin Lab | Market Intelligence |
| 7 | Competitor Watchtower | Market Intelligence |
| 8 | AI Presentation Builder | Reporting & Copilot |
| 9 | Analytics Copilot | Reporting & Copilot |
| 10 | Executive Reporting Pipeline | Reporting & Copilot |

## Project Structure

```
├── backend/
│   ├── main.py              # FastAPI app + static serving
│   └── demos/responses.py   # Pre-programmed agent flows & data
├── frontend/
│   ├── index.html
│   ├── css/styles.css
│   └── js/
│       ├── app.jsx          # Catalog shell + routing
│       ├── components/Shared.jsx
│       └── demos/AllDemos.jsx
├── run.py
└── requirements.txt
```

## API

- `GET /api/catalog` — list all demos
- `GET /api/catalog/{demo_id}` — demo metadata + scenarios
- `POST /api/demos/{demo_id}/run` — run a scenario (`{"scenario": "default"}`)
