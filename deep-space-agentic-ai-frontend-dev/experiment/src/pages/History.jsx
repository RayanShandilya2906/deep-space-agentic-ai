import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/api";
import Navbar from "../components/Navbar";
import "./History.css";
import SpaceBackground from "../components/SpaceBackground";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchHistory() {
      try {
        setLoading(true);
        setError(null);
        const data = await getHistory();
        if (isMounted) setHistory(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Unable to load history.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer statusContainer">
          <div className="emptyState">Loading history...</div>
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
              <h1>ANALYSIS HISTORY</h1>
              <span className="planetBadge">{history.length} RECORDS</span>
            </div>
            <p className="planetDescription">Your recent space image analyses, most recent first.</p>
          </div>
        </section>

        <section className="factsSection">
          <h2>Recent Analyses -</h2>

          {history.length === 0 ? (
            <div className="emptyState">No analyses yet. Upload a space image to begin.</div>
          ) : (
            <div className="historyList">
              {history.map((item) => {
                const name = item.objectName || item.name || "Unknown object";
                return (
                  <div className="historyCard" key={item._id} onClick={() => navigate(`/object/${encodeURIComponent(name)}`)}>
                    <img src="/andromeda.png" alt={name} />
                    <div className="historyInfo">
                      <h3>{name}</h3>
                      <span className="planetBadge">{item.type || "Unknown"}</span>
                    </div>
                    <div className="historyDate">
                      <p>{formatDate(item.createdAt || item.date)}</p>
                    </div>
                    <div className="historyArrow">→</div>
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