const { useState, useEffect, useCallback, useRef } = React;

/* ── API helper ── */
async function runDemo(demoId, scenario = "default") {
  const res = await fetch(`/api/demos/${demoId}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ── Agent run hook ── */
function useAgentRun(demoId) {
  const [steps, setSteps] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("idle");
  const cancelRef = useRef(false);

  const execute = useCallback(async (scenario = "default") => {
    cancelRef.current = false;
    setRunning(true);
    setStatus("running");
    setResult(null);
    setVisibleSteps([]);
    setSteps([]);

    try {
      const data = await runDemo(demoId, scenario);
      setSteps(data.steps || []);
      for (let i = 0; i < (data.steps || []).length; i++) {
        if (cancelRef.current) break;
        setVisibleSteps((prev) => [...prev, { ...data.steps[i], state: "running" }]);
        await new Promise((r) => setTimeout(r, data.steps[i].delay_ms || 400));
        setVisibleSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, state: "done" } : s))
        );
      }
      if (!cancelRef.current) {
        setResult(data.result);
        setStatus("done");
      }
    } catch (e) {
      setStatus("error");
      setResult({ error: e.message });
    } finally {
      setRunning(false);
    }
  }, [demoId]);

  const reset = useCallback(() => {
    cancelRef.current = true;
    setSteps([]);
    setVisibleSteps([]);
    setResult(null);
    setStatus("idle");
    setRunning(false);
  }, []);

  return { steps, visibleSteps, result, running, status, execute, reset };
}

/* ── Agent Panel ── */
function AgentPanel({ visibleSteps, status, running, onRun, onReset, runLabel = "Run Agent Pipeline", scenarios }) {
  return (
    <div className="agent-panel">
      <div className="agent-panel-header">
        <h3>Agent Activity</h3>
        <span className={`agent-status ${status}`}>
          {status === "running" ? "● RUNNING" : status === "done" ? "● COMPLETE" : "○ IDLE"}
        </span>
      </div>
      <div className="agent-steps">
        {visibleSteps.length === 0 && (
          <div style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Click run to watch agents orchestrate the workflow.
          </div>
        )}
        {visibleSteps.map((s, i) => (
          <div key={i} className={`agent-step ${s.state}`}>
            <div className="agent-dot" />
            <div className="agent-step-body">
              <div className="agent-name">{s.agent}</div>
              <div className="agent-message">{s.message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="agent-actions">
        {scenarios ? (
          <div className="btn-group" style={{ marginBottom: "0.5rem" }}>
            {scenarios.map((sc) => (
              <button key={sc.id} className="btn btn-secondary" disabled={running} onClick={() => onRun(sc.id)}>
                {sc.label}
              </button>
            ))}
          </div>
        ) : (
          <button className="btn btn-primary" disabled={running} onClick={() => onRun("default")}>
            {running ? "Agents working…" : runLabel}
          </button>
        )}
        {status !== "idle" && (
          <button className="btn btn-secondary" style={{ width: "100%", marginTop: "0.5rem" }} onClick={onReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Demo Shell ── */
function DemoShell({ demo, children, agentProps, scenarios, onRun, onReset }) {
  return (
    <>
      <div className="demo-header">
        <div className="demo-header-top">
          <span className="demo-header-icon">{demo.icon}</span>
          <h2>{demo.title}</h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: 680 }}>{demo.summary}</p>
        <div className="demo-header-meta">
          <span className="badge theme">{demo.theme}</span>
          <span className="badge">{demo.excel_ref}</span>
        </div>
      </div>
      <div className="demo-layout">
        <AgentPanel {...agentProps} scenarios={scenarios} onRun={onRun} onReset={onReset} />
        <div className="result-panel">
          <h3>Results</h3>
          {agentProps.result ? children(agentProps.result) : (
            <div className="result-empty">
              <div className="result-empty-icon">⚡</div>
              <p>Run the agent pipeline to see live results</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function chartTheme() {
  const style = getComputedStyle(document.documentElement);
  return {
    grid: style.getPropertyValue("--chart-grid").trim(),
    tick: style.getPropertyValue("--chart-tick").trim(),
  };
}

function useThemeVersion() {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener("catalog-theme-change", handler);
    return () => window.removeEventListener("catalog-theme-change", handler);
  }, []);
  return version;
}

/* ── Chart helper ── */
function LineChart({ labels, data, color = "#6366f1" }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const themeVersion = useThemeVersion();

  useEffect(() => {
    if (!ref.current || !data) return;
    if (chartRef.current) chartRef.current.destroy();
    const { grid, tick } = chartTheme();
    chartRef.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: labels || data.map((_, i) => `P${i + 1}`),
        datasets: [{ data, borderColor: color, backgroundColor: color + "33", fill: true, tension: 0.35, pointRadius: 3 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: grid }, ticks: { color: tick, font: { size: 10 } } },
          y: { grid: { color: grid }, ticks: { color: tick, font: { size: 10 } } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [labels, data, color, themeVersion]);

  return <div className="chart-wrap"><canvas ref={ref} /></div>;
}

function BarChart({ labels, data }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const themeVersion = useThemeVersion();

  useEffect(() => {
    if (!ref.current || !data) return;
    if (chartRef.current) chartRef.current.destroy();
    const { grid, tick } = chartTheme();
    chartRef.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{ data, backgroundColor: "#6366f1", borderRadius: 4 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: tick, font: { size: 10 } } },
          y: { grid: { color: grid }, ticks: { color: tick, font: { size: 10 } } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [labels, data, themeVersion]);

  return <div className="chart-wrap"><canvas ref={ref} /></div>;
}

function gapColor(coverage) {
  if (coverage < 30) return "rgba(239,68,68,0.5)";
  if (coverage < 50) return "rgba(245,158,11,0.45)";
  if (coverage < 70) return "rgba(56,189,248,0.35)";
  return "rgba(34,197,94,0.35)";
}

function regionColor(status) {
  const map = { critical: "#ef4444", watch: "#f59e0b", positive: "#22c55e", stable: "#6366f1" };
  return map[status] || "#6366f1";
}

Object.assign(window, {
  runDemo,
  useAgentRun,
  AgentPanel,
  DemoShell,
  LineChart,
  BarChart,
  gapColor,
  regionColor,
});
