import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFriendlyError, getHistory, getStats, getUploadedImageUrl } from "../services/api";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import "./Dashboard.css";

const features = [
  "AI Image Analysis",
  "Recommendation Engine",
  "Space Exploration Timeline",
  "Object Comparison",
  "Analysis History",
];

function formatDate(dateStr) {
  if (!dateStr) return "Unknown date";

  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");
        const [statsData, historyData] = await Promise.all([getStats(), getHistory()]);

        if (isMounted) {
          setStats(statsData);
          setHistory(historyData.slice(0, 3));
        }
      } catch (err) {
        if (isMounted) setError(getFriendlyError(err));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      <div className="analysisContainer dashboardHome">
        <section className="heroCard dashboardHero">
          <div className="heroContent">
            <div className="titleRow">
              <h1>Deep Space Agentic AI</h1>
              <span className="planetBadge">MISSION CONTROL</span>
            </div>
            <p className="planetDescription">
              Explore celestial objects with AI-powered image analysis, discovery timelines,
              related-object recommendations, and comparison tools built for deep space learning.
            </p>
            <button className="dashboardStartBtn" onClick={() => navigate("/analysis")}>
              Start Analysis
            </button>
          </div>
        </section>

        <section className="factsSection">
          <h2>Quick Features -</h2>
          <div className="factsGrid dashboardFeatureGrid">
            {features.map((feature) => (
              <div className="factCard" key={feature}>
                <h3>{feature}</h3>
                <p>
                  {feature === "AI Image Analysis" && "Upload a space image and identify the object with AI."}
                  {feature === "Recommendation Engine" && "Discover related planets, moons, stars, and galaxies."}
                  {feature === "Space Exploration Timeline" && "Review historic milestones for supported objects."}
                  {feature === "Object Comparison" && "Compare two celestial objects side by side."}
                  {feature === "Analysis History" && "Return to earlier discoveries from previous uploads."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="factsSection">
          <h2>Quick Statistics -</h2>
          {loading ? (
            <div className="emptyState">Loading dashboard data...</div>
          ) : error ? (
            <div className="emptyState">{error}</div>
          ) : (
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
                <p>Top Objects Tracked</p>
              </div>
            </div>
          )}
        </section>

        <section className="factsSection">
          <div className="timelineHeaderRow">
            <h2>Recent History -</h2>
            <button className="timelineBtn" onClick={() => navigate("/history")}>
              View All
            </button>
          </div>

          {loading ? (
            <div className="emptyState">Loading recent history...</div>
          ) : error ? (
            <div className="emptyState">Recent history is unavailable right now.</div>
          ) : history.length === 0 ? (
            <div className="emptyState">No analyses yet. Start with your first space image.</div>
          ) : (
            <div className="historyList">
              {history.map((item) => {
                const name = item.objectName || item.name || "Unknown object";
                return (
                  <div
                    className="historyCard"
                    key={item._id || `${name}-${item.createdAt}`}
                    onClick={() => navigate(`/object/${encodeURIComponent(name)}`)}
                  >
                    <img
                      src={getUploadedImageUrl(item.objectImage)}
                      alt={name}
                      onError={(event) => {
                        event.currentTarget.src = "/andromeda.png";
                      }}
                    />
                    <div className="historyInfo dashboardHistoryInfo">
                      <h3>{name}</h3>
                      <span className="planetBadge">{item.type || "Unknown"}</span>
                      <p>{item.summary || "No summary was saved for this analysis."}</p>
                    </div>
                    <div className="historyDate">
                      <p>{formatDate(item.createdAt || item.date)}</p>
                    </div>
                    <div className="historyArrow">-&gt;</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
