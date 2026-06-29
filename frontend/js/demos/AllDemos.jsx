const { useState } = React;
const { useAgentRun, DemoShell, LineChart, BarChart, gapColor, regionColor, runDemo } = window;

/* ── Demo 1: Early Warning ── */
function EarlyWarningDemo({ demo }) {
  const agent = useAgentRun("early-warning");
  return (
    <DemoShell demo={demo} agentProps={agent} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <div className="alert-list">
            {r.alerts.map((a) => (
              <div key={a.id} className={`alert-item ${a.severity}`}>
                <span className={`badge ${a.severity}`}>{a.severity.toUpperCase()}</span>
                <div className="alert-body">
                  <div className="alert-title">{a.title}</div>
                  <div className="alert-meta">{a.region} · {a.metric} · Confidence {(a.confidence * 100).toFixed(0)}%</div>
                </div>
              </div>
            ))}
          </div>
          <h4 style={{ marginTop: "1.25rem", fontSize: "0.85rem" }}>Notification Routing</h4>
          <table className="data-table" style={{ marginTop: "0.5rem" }}>
            <thead><tr><th>Role</th><th>Alerts</th><th>Channel</th></tr></thead>
            <tbody>
              {r.routing.map((row, i) => (
                <tr key={i}><td>{row.role}</td><td>{row.alerts}</td><td>{row.channel}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="narrative-box">{r.brief}</div>
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 2: Insights Hub ── */
function InsightsHubDemo({ demo }) {
  const agent = useAgentRun("insights-hub");
  return (
    <DemoShell demo={demo} agentProps={agent} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <div className="region-map">
            {r.regions.map((reg) => (
              <div key={reg.name} className="region-cell" style={{ background: regionColor(reg.status) + "33", borderColor: regionColor(reg.status) + "66" }}>
                <span>{reg.name}</span>
                <span className="region-deviation" style={{ color: reg.deviation >= 0 ? "var(--success)" : "var(--danger)" }}>
                  {reg.deviation > 0 ? "+" : ""}{reg.deviation}pp
                </span>
                <span className={`badge ${reg.status}`} style={{ marginTop: 4, fontSize: "0.6rem" }}>{reg.status}</span>
              </div>
            ))}
          </div>
          <h4 style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>Driver Attribution</h4>
          <div className="driver-bars">
            {r.drivers.map((d) => (
              <div key={d.name} className="driver-row">
                <span>{d.name}</span>
                <div className="driver-track">
                  <div className={`driver-fill ${d.impact >= 0 ? "positive" : "negative"}`} style={{ width: `${Math.abs(d.impact)}%` }} />
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem" }}>{d.impact > 0 ? "+" : ""}{d.impact}%</span>
              </div>
            ))}
          </div>
          <div className="narrative-box"><strong>So What:</strong> {r.narrative}</div>
          <h4 style={{ fontSize: "0.85rem" }}>Now What — Recommended Actions</h4>
          <ul className="action-list">
            {r.actions.map((a) => (
              <li key={a.priority}>
                <span className="action-priority">{a.priority}</span>
                <div><div>{a.action}</div><div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 2 }}>Est. impact: {a.impact}</div></div>
              </li>
            ))}
          </ul>
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 3: Forecast Variance ── */
function ForecastVarianceDemo({ demo }) {
  const agent = useAgentRun("forecast-variance");
  const [selected, setSelected] = useState({});
  const [simResult, setSimResult] = useState(null);

  const toggleLever = (name) => setSelected((s) => ({ ...s, [name]: !s[name] }));

  const runSim = async () => {
    await agent.execute("default");
    setSimResult(null);
  };

  const runSimulate = async () => {
    const data = await runDemo("forecast-variance", "simulate");
    setSimResult(data.result);
  };

  return (
    <DemoShell demo={demo} agentProps={agent} onRun={runSim} onReset={() => { agent.reset(); setSimResult(null); setSelected({}); }}>
      {(r) => (
        <>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Forecast</div>
              <div className="stat-value">${r.forecast}M</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Actual</div>
              <div className="stat-value">${r.actual}M</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Variance</div>
              <div className="stat-value" style={{ color: "var(--danger)" }}>{r.variance_pct}%</div>
            </div>
          </div>
          <BarChart
            labels={r.segments.map((s) => s.name)}
            data={r.segments.map((s) => s.variance)}
          />
          <h4 style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Variance Drivers</h4>
          <table className="data-table">
            <thead><tr><th>Driver</th><th>Contribution ($M)</th></tr></thead>
            <tbody>
              {r.drivers.map((d, i) => (
                <tr key={i}><td>{d.name}</td><td style={{ color: "var(--danger)" }}>{d.contribution}</td></tr>
              ))}
            </tbody>
          </table>
          <h4 style={{ fontSize: "0.85rem", marginTop: "1rem" }}>What-If Levers</h4>
          <div className="lever-list">
            {r.levers.map((l) => (
              <label key={l.lever} className="lever-item">
                <input type="checkbox" checked={!!selected[l.lever]} onChange={() => toggleLever(l.lever)} />
                <span>{l.lever}{l.required && <span className="badge" style={{ marginLeft: 6 }}>Required</span>}</span>
                <span className="lever-impact">+${l.impact}M</span>
              </label>
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: "0.75rem", width: "auto" }} onClick={runSimulate}>
            Simulate Selected Levers
          </button>
          {simResult && (
            <div className="narrative-box" style={{ marginTop: "1rem" }}>
              <strong>Simulation:</strong> {simResult.message}<br />
              Projected: ${simResult.projected_actual}M vs Forecast ${simResult.forecast}M ({simResult.recovery_pct}% recovery)
            </div>
          )}
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 4: Research Search ── */
function ResearchSearchDemo({ demo }) {
  const agent = useAgentRun("research-search");
  const scenarios = [
    { id: "oncology-access", label: "Oncology Access" },
    { id: "hcp-sentiment", label: "HCP Sentiment" },
  ];
  return (
    <DemoShell demo={demo} agentProps={agent} scenarios={scenarios} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Query: "{r.query}"</div>
          <div className="narrative-box">{r.summary}</div>
          <h4 style={{ fontSize: "0.85rem", marginTop: "1rem" }}>Grounded Sources</h4>
          <div className="source-list" style={{ marginTop: "0.5rem" }}>
            {r.sources.map((s, i) => (
              <div key={i} className="source-card">
                <div>
                  <div style={{ fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.type} · {s.date}</div>
                  <div className="trust-bar"><div className="trust-fill" style={{ width: `${s.trust * 100}%` }} /></div>
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem" }}>{(s.trust * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 5: Research Gap ── */
function ResearchGapDemo({ demo }) {
  const agent = useAgentRun("research-gap");
  return (
    <DemoShell demo={demo} agentProps={agent} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <h4 style={{ fontSize: "0.85rem" }}>Research Gap Map</h4>
          <div className="gap-grid" style={{ marginTop: "0.75rem" }}>
            <div className="gap-header">Topic</div>
            <div className="gap-header">Region</div>
            <div className="gap-header">Coverage</div>
            <div className="gap-header">Priority</div>
            {r.gaps.map((g, i) => (
              <React.Fragment key={i}>
                <div style={{ padding: "0.4rem", fontSize: "0.78rem" }}>{g.topic}</div>
                <div style={{ padding: "0.4rem", fontSize: "0.78rem" }}>{g.region}</div>
                <div className="gap-cell" style={{ background: gapColor(g.coverage) }}>{g.coverage}%</div>
                <div style={{ padding: "0.4rem" }}><span className={`badge ${g.priority === "critical" ? "critical" : g.priority}`}>{g.priority}</span></div>
              </React.Fragment>
            ))}
          </div>
          <h4 style={{ fontSize: "0.85rem", marginTop: "1.25rem" }}>Recommended Study Design</h4>
          <div className="stat-grid" style={{ marginTop: "0.5rem" }}>
            <div className="stat-card"><div className="stat-label">Method</div><div style={{ fontSize: "0.8rem", marginTop: 4 }}>{r.recommendation.method}</div></div>
            <div className="stat-card"><div className="stat-label">Sample</div><div style={{ fontSize: "0.8rem", marginTop: 4 }}>{r.recommendation.sample}</div></div>
            <div className="stat-card"><div className="stat-label">Timeline</div><div style={{ fontSize: "0.8rem", marginTop: 4 }}>{r.recommendation.timeline}</div></div>
          </div>
          <div className="narrative-box" style={{ marginTop: "1rem" }}><strong>Draft Brief:</strong> {r.brief_excerpt}</div>
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 6: Digital Twin ── */
function DigitalTwinDemo({ demo }) {
  const agent = useAgentRun("digital-twin");
  const scenarios = [
    { id: "hcp-persona", label: "HCP Persona" },
    { id: "patient-persona", label: "Patient Persona" },
  ];
  return (
    <DemoShell demo={demo} agentProps={agent} scenarios={scenarios} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <div className="persona-card">
            <div className="persona-name">{r.persona.name}</div>
            <div className="persona-meta">
              {r.persona.specialty || r.persona.condition}
              {r.persona.setting && ` · ${r.persona.setting}`}
              {r.persona.age_band && ` · Age ${r.persona.age_band}`}
            </div>
            <div className="trait-tags">
              {(r.persona.traits || []).map((t, i) => <span key={i} className="trait-tag">{t}</span>)}
            </div>
            <p style={{ fontSize: "0.82rem", marginTop: "0.75rem", color: "var(--text-muted)" }}>
              {r.persona.prescribing || r.persona.journey}
            </p>
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem" }}>Scenario</div>
          <div style={{ fontSize: "0.82rem", color: "var(--info)", marginBottom: "0.5rem" }}>{r.scenario_q}</div>
          <div className="narrative-box">{r.scenario_a}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Model confidence: {(r.confidence * 100).toFixed(0)}% · Synthetic persona — not a real individual
          </div>
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 7: Competitor Watch ── */
function CompetitorWatchDemo({ demo }) {
  const agent = useAgentRun("competitor-watch");
  return (
    <DemoShell demo={demo} agentProps={agent} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <LineChart labels={["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "Today"]} data={r.sentiment_trend} color="#ef4444" />
          <h4 style={{ fontSize: "0.85rem" }}>Event Timeline</h4>
          <div className="timeline" style={{ marginTop: "0.75rem" }}>
            {r.events.map((e, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-date">{e.date}</div>
                <div className="timeline-title">{e.competitor}: {e.event}</div>
                <span className={`badge ${e.significance}`} style={{ marginTop: 4, display: "inline-block" }}>{e.significance}</span>
              </div>
            ))}
          </div>
          <div className="narrative-box" style={{ marginTop: "1rem" }}><strong>Weekly Brief:</strong> {r.brief}</div>
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 8: Presentation Builder ── */
function PresentationBuilderDemo({ demo }) {
  const agent = useAgentRun("presentation-builder");
  const [refreshed, setRefreshed] = useState(false);

  const runBuild = async () => {
    setRefreshed(false);
    await agent.execute("mbr-charts");
  };

  const runRefresh = async () => {
    await agent.execute("refresh");
    setRefreshed(true);
  };

  return (
    <DemoShell demo={demo} agentProps={agent} onRun={runBuild} onReset={() => { agent.reset(); setRefreshed(false); }}>
      {(r) => (
        <>
          {r.prompt && <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Prompt: "{r.prompt}"</div>}
          {r.message && <div className="narrative-box">{r.message}</div>}
          {r.slides && (
            <>
              <div className="btn-group">
                <button className="btn btn-secondary" onClick={runRefresh}>Refresh with Latest Data</button>
              </div>
              <div className="slide-preview">
                {r.slides.map((s, i) => (
                  <div key={i} className="slide-card">
                    <div className="slide-title">{s.title}</div>
                    <div className="slide-chart-area">
                      {s.type === "line" && s.data.map((v, j) => (
                        <div key={j} className="mini-bar" style={{ height: `${(v / Math.max(...s.data)) * 100}%` }} />
                      ))}
                      {s.type === "bar" && s.data.map((d, j) => (
                        <div key={j} className="mini-bar" style={{ height: `${(d.share / 25) * 100}%` }} title={d.region} />
                      ))}
                      {s.type === "waterfall" && (() => {
                        const deltas = s.data.filter((_, idx) => idx > 0 && idx < s.data.length - 1);
                        const maxDelta = Math.max(...deltas.map((d) => Math.abs(d.value)), 0.01);
                        return deltas.map((d, j) => (
                          <div
                            key={j}
                            className="mini-bar"
                            style={{
                              height: `${(Math.abs(d.value) / maxDelta) * 85}%`,
                              background: d.value >= 0 ? "#22c55e" : "#ef4444",
                            }}
                            title={d.label}
                          />
                        ));
                      })()}
                    </div>
                  </div>
                ))}
              </div>
              {refreshed && <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: "0.5rem" }}>✓ Slides updated with latest data</div>}
            </>
          )}
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 9: Analytics Copilot ── */
function AnalyticsCopilotDemo({ demo }) {
  const agent = useAgentRun("analytics-copilot");
  const scenarios = [
    { id: "share-decline", label: "Share Decline" },
    { id: "top-accounts", label: "Top Accounts" },
  ];
  return (
    <DemoShell demo={demo} agentProps={agent} scenarios={scenarios} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <div className="prompt-chips">
            <span className="prompt-chip">Why did share drop in Northeast?</span>
            <span className="prompt-chip">Show top accounts by potential</span>
          </div>
          <div style={{ fontSize: "0.82rem", marginBottom: "0.75rem" }}>Query: "{r.query}"</div>
          <div className="stat-grid">
            {r.kpis.map((k, i) => (
              <div key={i} className="stat-card">
                <div className="stat-label">{k.label}</div>
                <div className="stat-value" style={{ fontSize: "1.1rem" }}>{k.value}</div>
                {k.change && <div className={`stat-change ${k.trend}`}>{k.change}</div>}
              </div>
            ))}
          </div>
          {r.accounts && (
            <table className="data-table">
              <thead><tr><th>Account</th><th>Score</th><th>Opportunity</th></tr></thead>
              <tbody>
                {r.accounts.map((a, i) => (
                  <tr key={i}><td>{a.name}</td><td>{a.score}</td><td>{a.opportunity}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {r.sources && (
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>Source Links</h4>
              {r.sources.map((s, i) => (
                <a key={i} className="source-link" href={s.url}>📎 {s.name}</a>
              ))}
            </div>
          )}
          {r.recommendations && (
            <>
              <h4 style={{ fontSize: "0.8rem", marginTop: "1rem" }}>Next Steps</h4>
              <ul className="action-list">
                {r.recommendations.map((rec, i) => (
                  <li key={i} style={{ paddingLeft: 0 }}><span className="action-priority">{i + 1}</span>{rec}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </DemoShell>
  );
}

/* ── Demo 10: Executive Reporting ── */
function ExecutiveReportingDemo({ demo }) {
  const agent = useAgentRun("executive-reporting");
  return (
    <DemoShell demo={demo} agentProps={agent} onRun={agent.execute} onReset={agent.reset}>
      {(r) => (
        <>
          <div className="stat-grid">
            <div className="stat-card"><div className="stat-label">Schedule</div><div style={{ fontSize: "0.85rem", marginTop: 4 }}>{r.schedule}</div></div>
            <div className="stat-card"><div className="stat-label">Last Run</div><div style={{ fontSize: "0.85rem", marginTop: 4 }}>{r.last_run}</div></div>
            <div className="stat-card"><div className="stat-label">Current Run</div><div style={{ fontSize: "0.85rem", marginTop: 4 }}>{r.current_run}</div></div>
          </div>
          <h4 style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Agent Pipeline</h4>
          <div className="pipeline-steps">
            {r.pipeline_steps.map((s, i) => (
              <div key={i} className={`pipeline-step ${s.status}`}>{s.step}</div>
            ))}
          </div>
          <h4 style={{ fontSize: "0.85rem" }}>Delta vs Prior Run</h4>
          <table className="data-table" style={{ marginTop: "0.5rem" }}>
            <thead><tr><th>Metric</th><th>Before</th><th>After</th><th>Flag</th></tr></thead>
            <tbody>
              {r.deltas.map((d, i) => (
                <tr key={i} className={d.highlight ? "row-highlight" : ""}>
                  <td>{d.metric}</td><td>{d.before}</td><td>{d.after}</td>
                  <td>{d.highlight ? "⚠️" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="narrative-box" style={{ marginTop: "1rem" }}>{r.brief}</div>
        </>
      )}
    </DemoShell>
  );
}

window.DEMO_COMPONENTS = {
  "early-warning": EarlyWarningDemo,
  "insights-hub": InsightsHubDemo,
  "forecast-variance": ForecastVarianceDemo,
  "research-search": ResearchSearchDemo,
  "research-gap": ResearchGapDemo,
  "digital-twin": DigitalTwinDemo,
  "competitor-watch": CompetitorWatchDemo,
  "presentation-builder": PresentationBuilderDemo,
  "analytics-copilot": AnalyticsCopilotDemo,
  "executive-reporting": ExecutiveReportingDemo,
};
