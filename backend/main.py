"""AI Agent Demo Catalog — FastAPI backend."""

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.demos.responses import CATALOG, DEMO_SCENARIOS, get_demo_response

ROOT = Path(__file__).resolve().parent.parent
FRONTEND = ROOT / "frontend"

app = FastAPI(title="AI Agent Demo Catalog", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RunRequest(BaseModel):
    scenario: str = "default"


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/catalog")
def catalog():
    return {"demos": CATALOG}


@app.get("/api/catalog/{demo_id}")
def catalog_item(demo_id: str):
    item = next((d for d in CATALOG if d["id"] == demo_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Demo not found")
    scenarios = list(DEMO_SCENARIOS.get(demo_id, {}).keys())
    return {**item, "scenarios": scenarios}


@app.post("/api/demos/{demo_id}/run")
def run_demo(demo_id: str, body: RunRequest):
    payload = get_demo_response(demo_id, body.scenario)
    if "error" in payload:
        raise HTTPException(status_code=404, detail=payload["error"])
    return payload


# Static frontend
if FRONTEND.exists():
    app.mount("/css", StaticFiles(directory=FRONTEND / "css"), name="css")
    app.mount("/js", StaticFiles(directory=FRONTEND / "js"), name="js")

    @app.get("/")
    def index():
        return FileResponse(FRONTEND / "index.html")
