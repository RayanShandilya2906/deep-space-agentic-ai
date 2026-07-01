import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFriendlyError, getHistory, getUploadedImageUrl } from "../services/api";
import Navbar from "../components/Navbar";
import "./History.css";
import SpaceBackground from "../components/SpaceBackground";

function formatDate(dateStr) {
  if (!dateStr) return "Unknown date";

  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchHistory() {
      try {
        setLoading(true);
        setError("");
        const data = await getHistory();
        if (isMounted) setHistory(data);
      } catch (err) {
        if (isMounted) setError(getFriendlyError(err, "History is unavailable because the backend cannot be reached."));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, []);

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
            <p className="planetDescription">All previous space image analyses, most recent first.</p>
          </div>
        </section>

        <section className="factsSection">
          <h2>Previous Analyses -</h2>

          {loading ? (
            <div className="emptyState">Loading history...</div>
          ) : error ? (
            <div className="emptyState">
              <p>{error}</p>
              <button className="retryButton" onClick={() => navigate(0)}>Retry</button>
            </div>
          ) : history.length === 0 ? (
            <div className="emptyState">No analyses yet. Upload a space image to begin.</div>
          ) : (
            <div className="historyList">
              {history.map((item) => {
                const name = item.objectName || item.name || "Unknown object";
                return (
                  <div
                    className="historyCard historyCardDetailed"
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
                    <div className="historyInfo historyInfoDetailed">
                      <div className="historyTitleRow">
                        <h3>{name}</h3>
                        <span className="planetBadge">{item.type || "Unknown"}</span>
                      </div>
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
