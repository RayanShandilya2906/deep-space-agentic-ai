import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { compareObjects } from "../services/api";
import Navbar from "../components/Navbar";
import "./Compare.css";
import SpaceBackground from "../components/SpaceBackground";

export default function Compare() {
  const { objectA, objectB } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchComparison() {
      try {
        setLoading(true);
        setError(null);
        const result = await compareObjects(decodeURIComponent(objectA), decodeURIComponent(objectB));
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || "Comparison failed.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchComparison();
    return () => {
      isMounted = false;
    };
  }, [objectA, objectB]);

  if (loading) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer statusContainer">
          <div className="emptyState">Comparing {decodeURIComponent(objectA)} and {decodeURIComponent(objectB)}...</div>
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
        <section className="compareHero">
          <div className="compareHeroSide">
            <img
              src={`/${decodeURIComponent(objectA).toLowerCase()}.png`}
              alt={decodeURIComponent(objectA)}
              className="compareHeroImg"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <h1 className="compareHeroName">{decodeURIComponent(objectA).toUpperCase()}</h1>
          </div>

          <div className="compareVsBadge">VS</div>

          <div className="compareHeroSide">
            <img
              src={`/${decodeURIComponent(objectB).toLowerCase()}.png`}
              alt={decodeURIComponent(objectB)}
              className="compareHeroImg"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <h1 className="compareHeroName">{decodeURIComponent(objectB).toUpperCase()}</h1>
          </div>
        </section>

        <section className="factsSection">
          <div className="compareScroll">
            <div className="compareGrid">
              <div className="compareColumn">
                <div className="compareColHeader simHeader">
                  <span className="compareColIcon">✦</span>
                  <h2>Similarities</h2>
                </div>
                {data?.similarities?.map((item, index) => (
                  <div className="compareCard simCard" key={index}>
                    <span className="compareCardIcon">◈</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="compareColumn">
                <div className="compareColHeader diffHeader">
                  <span className="compareColIcon">⟐</span>
                  <h2>Differences</h2>
                </div>
                {data?.differences?.map((item, index) => (
                  <div className="compareCard diffCard" key={index}>
                    <span className="compareCardIcon">◈</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <button onClick={() => navigate(`/object/${encodeURIComponent(objectA)}`)} className="compareBackBtn">
          ← Back to {decodeURIComponent(objectA)}
        </button>
      </div>
    </main>
  );
}