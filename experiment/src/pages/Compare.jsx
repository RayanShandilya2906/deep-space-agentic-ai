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
    async function fetchComparison() {
      try {
        setLoading(true);
        // const result = await compareObjects(objectA, objectB);
        const result = {
          objectA: objectA,
          objectB: objectB,
          similarities: [
            "Both orbit the Sun.",
            "Both have been studied by space missions.",
            "Both are part of the inner solar system."
          ],
          differences: [
            `${objectA} has a different size compared to ${objectB}.`,
            `${objectA} has a unique atmospheric composition.`,
            `${objectB} has different surface conditions.`
          ]
        };
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComparison();
  }, [objectA, objectB]);

  if (loading) return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px" }}>Comparing {objectA} and {objectB}...</p>
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
        <section className="compareHero">
          <div className="compareHeroSide">
            <img
              src={`/${objectA.toLowerCase()}.png`}
              alt={objectA}
              className="compareHeroImg"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <h1 className="compareHeroName">{objectA.toUpperCase()}</h1>
          </div>

          <div className="compareVsBadge">VS</div>

          <div className="compareHeroSide">
            <img
              src={`/${objectB.toLowerCase()}.png`}
              alt={objectB}
              className="compareHeroImg"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <h1 className="compareHeroName">{objectB.toUpperCase()}</h1>
          </div>
        </section>

        {/* COMPARE GRID */}
        <section className="factsSection">
          <div className="compareScroll">
            <div className="compareGrid">

              {/* SIMILARITIES */}
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

              {/* DIFFERENCES */}
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

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(`/object/${objectA}`)}
          className="compareBackBtn"
        >
          ← Back to {objectA}
        </button>

      </div>
    </main>
  );
}