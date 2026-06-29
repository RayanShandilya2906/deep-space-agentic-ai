import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStats } from "../services/api";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);
        const data = await getStats();
        if (isMounted) setStats(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Unable to load dashboard stats.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer statusContainer">
          <div className="emptyState">Loading dashboard...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer statusContainer">
          <div className="emptyState">
            <p>{error}</p>
            <button className="retryButton" onClick={() => navigate(0)}>Retry</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      <div className="analysisContainer">
        <section className="heroCard">
          <div className="heroContent">
            <div className="titleRow">
              <h1>DASHBOARD</h1>
              <span className="planetBadge">ANALYTICS</span>
            </div>
            <p className="planetDescription">Overview of your space exploration activity.</p>
          </div>
        </section>

        <section className="factsSection">
          <h2>Overview -</h2>
          <div className="factsGrid dashboardStats">
            <div className="factCard">
              <h3>{stats?.totalAnalyses ?? 0}</h3>
              <p>Total Analyses</p>
            </div>
            <div className="factCard">
              <h3>{stats?.todayAnalyses ?? 0}</h3>
              <p>Analyses Today</p>
            </div>
            <div className="factCard">
              <h3>{stats?.topObjects?.length ?? 0}</h3>
              <p>Unique Objects Explored</p>
            </div>
          </div>
        </section>

        <section className="factsSection">
          <h2>Top Objects -</h2>
          {stats?.topObjects?.length ? (
            <div className="dashboardScroll">
              <div className="historyList" style={{ marginBottom: 0 }}>
                {stats.topObjects.map((item, index) => (
                  <div className="historyCard" key={item._id} onClick={() => navigate(`/object/${encodeURIComponent(item._id)}`)}>
                    <div className="dashboardRank">{index + 1}</div>
                    <div className="historyInfo">
                      <h3>{item._id}</h3>
                    </div>
                    <div className="historyDate">
                      <p>{item.count} {item.count === 1 ? "analysis" : "analyses"}</p>
                    </div>
                    <div className="historyArrow">→</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="emptyState">No analytics have been recorded yet.</div>
          )}
        </section>
      </div>
    </main>
  );
}