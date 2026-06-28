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
    async function fetchHistory() {
      try {
        setLoading(true);
        // const data = await getHistory();
        const data = [
          {
            _id: "1",
            name: "Mars",
            type: "Planet",
            date: "2026-06-27T20:00:00Z",
            image: "/mars.png"
          },
          {
            _id: "2",
            name: "Jupiter",
            type: "Planet",
            date: "2026-06-26T15:30:00Z",
            image: "/jupiter.png"
          },
          {
            _id: "3",
            name: "Saturn",
            type: "Planet",
            date: "2026-06-25T10:00:00Z",
            image: "/saturn.png"
          },
          {
            _id: "4",
            name: "Andromeda Galaxy",
            type: "Galaxy",
            date: "2026-06-24T08:45:00Z",
            image: "/Andromeda.png"
          }
        ];
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px" }}>Loading history...</p>
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
              <h1>ANALYSIS HISTORY</h1>
              <span className="planetBadge">{history.length} RECORDS</span>
            </div>
            <p className="planetDescription">
              Your recent space image analyses, most recent first.
            </p>
          </div>
        </section>

        {/* HISTORY LIST */}
        <section className="factsSection">
          <h2>Recent Analyses -</h2>

          {history.length === 0 ? (
            <div className="factCard" style={{ height: "auto", padding: "24px" }}>
              <p>No analyses yet. Upload a space image!</p>
            </div>
          ) : (
            <div className="historyList">
              {history.map((item) => (
                <div
                  className="historyCard"
                  key={item._id}
                  onClick={() => navigate(`/object/${item.name}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="historyInfo">
                    <h3>{item.name}</h3>
                    <span className="planetBadge">{item.type}</span>
                  </div>
                  <div className="historyDate">
                    <p>{formatDate(item.date)}</p>
                  </div>
                  <div className="historyArrow">→</div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}