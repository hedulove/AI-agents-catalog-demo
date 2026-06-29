const { useState, useEffect } = React;

function HomePage({ catalog, onSelect }) {
  const themes = [...new Set(catalog.map((d) => d.theme))];

  return (
    <div className="home-hero">
      <h2>AI Agent Demo Catalog</h2>
      <p>
        Interactive demonstrations of agentic AI systems for data &amp; analytics.
        Each demo simulates multi-agent orchestration with pre-programmed workflows — no live LLM required.
      </p>
      <div className="theme-grid" style={{ marginTop: "2rem" }}>
        {themes.map((theme) => (
          <div key={theme} className="theme-section">
            <h3>{theme}</h3>
            <div className="demo-cards">
              {catalog.filter((d) => d.theme === theme).map((demo) => (
                <div key={demo.id} className="demo-card" onClick={() => onSelect(demo.id)}>
                  <div className="demo-card-icon">{demo.icon}</div>
                  <h4>{demo.title}</h4>
                  <p>{demo.summary}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ catalog, activeId, onSelect, onHome, theme, onToggleTheme }) {
  const themes = [...new Set(catalog.map((d) => d.theme))];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Agentic AI Demos</h1>
        <p>Data &amp; Analytics Consulting</p>
      </div>
      <nav className="sidebar-nav">
        <button className={`nav-item ${!activeId ? "active" : ""}`} onClick={onHome}>
          <span className="nav-item-icon">🏠</span>
          <span className="nav-item-text">
            <div className="nav-item-title">Catalog Home</div>
            <div className="nav-item-sub">All 10 use cases</div>
          </span>
        </button>
        {themes.map((theme) => (
          <React.Fragment key={theme}>
            <div className="nav-theme">{theme}</div>
            {catalog.filter((d) => d.theme === theme).map((demo) => (
              <button
                key={demo.id}
                className={`nav-item ${activeId === demo.id ? "active" : ""}`}
                onClick={() => onSelect(demo.id)}
              >
                <span className="nav-item-icon">{demo.icon}</span>
                <span className="nav-item-text">
                  <div className="nav-item-title">{demo.title}</div>
                  <div className="nav-item-sub">{demo.summary}</div>
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button type="button" className="theme-toggle" onClick={onToggleTheme} title="Toggle light/dark theme">
          {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
        </button>
      </div>
    </aside>
  );
}

function App() {
  const [catalog, setCatalog] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => (
    localStorage.getItem("catalog-theme") === "light" ? "light" : "dark"
  ));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("catalog-theme", theme);
    window.dispatchEvent(new CustomEvent("catalog-theme-change", { detail: { theme } }));
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        setCatalog(data.demos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && catalog.some((d) => d.id === hash)) setActiveId(hash);
  }, [catalog]);

  const selectDemo = (id) => {
    setActiveId(id);
    window.location.hash = id;
  };

  const goHome = () => {
    setActiveId(null);
    window.location.hash = "";
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", color: "var(--text-muted)" }}>
        Loading catalog…
      </div>
    );
  }

  const activeDemo = catalog.find((d) => d.id === activeId);
  const DemoComponent = activeId ? window.DEMO_COMPONENTS[activeId] : null;

  return (
    <div className="app-shell">
      <Sidebar
        catalog={catalog}
        activeId={activeId}
        onSelect={selectDemo}
        onHome={goHome}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="main-content">
        {!activeId && <HomePage catalog={catalog} onSelect={selectDemo} />}
        {activeDemo && DemoComponent && <DemoComponent demo={activeDemo} />}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
