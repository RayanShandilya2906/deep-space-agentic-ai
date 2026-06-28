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
    async function fetchStats() {
      try {
        setLoading(true);
        // const data = await getStats();
        const data = {
          totalAnalyses: 25,
          topObjects: [
            { _id: "Mars",      count: 8 },
            { _id: "Jupiter",   count: 6 },
            { _id: "Saturn",    count: 5 },
            { _id: "Earth",     count: 4 },
            { _id: "Andromeda", count: 2 }
          ]
        };
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px" }}>Loading dashboard...</p>
      </div>
    </main>
  );

  if (error) return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px", color: "#ff4444" }}>Error: {error}</p>
      </div>
    </main>
  );

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      <div className="analysisContainer">

        {/* HEADER */}
        <section className="heroCard">
          <div className="heroContent">
            <div className="titleRow">
              <h1>DASHBOARD</h1>
              <span className="planetBadge">ANALYTICS</span>
            </div>
            <p className="planetDescription">
              Overview of your space exploration activity.
            </p>
          </div>
        </section>

{/* STAT CARDS */}
<section className="factsSection">
  <h2>Overview -</h2>
  <div className="factsGrid dashboardStats">
    <div className="factCard">
      <h3>{stats?.totalAnalyses}</h3>
      <p>Total Analyses</p>
    </div>
    <div className="factCard">
      <h3>{stats?.topObjects?.[0]?._id}</h3>
      <p>Most Viewed Object</p>
    </div>
    <div className="factCard">
      <h3>{stats?.topObjects?.length}</h3>
      <p>Unique Objects Explored</p>
    </div>
  </div>
</section>

        {/* TOP OBJECTS — scrollable */}
        <section className="factsSection">
          <h2>Top Objects -</h2>
          <div className="dashboardScroll">
            <div className="historyList" style={{ marginBottom: 0 }}>
              {stats?.topObjects?.map((item, index) => (
                <div
                  className="historyCard"
                  key={item._id}
                  onClick={() => navigate(`/object/${item._id}`)}
                >
                  <div style={{ fontFamily: "Montserrat", fontSize: "22px", fontWeight: "700", color: "#58c8ff", width: "32px" }}>
                    {index + 1}
                  </div>
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
        </section>

      </div>
    </main>
  );
}