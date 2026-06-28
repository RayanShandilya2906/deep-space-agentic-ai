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
        <section className="heroCard" style={{ justifyContent: "center" }}>
          <div className="heroContent" style={{ textAlign: "center" }}>
            <div className="titleRow" style={{ justifyContent: "center" }}>
              <h1>{objectA.toUpperCase()}</h1>
              <span className="planetBadge">VS</span>
              <h1>{objectB.toUpperCase()}</h1>
            </div>
          </div>
        </section>

        {/* TWO COLUMN TABLE */}
        <section className="factsSection">
          <div className="compareGrid">

            {/* SIMILARITIES */}
            <div className="compareColumn">
              <h2>Similarities -</h2>
              {data?.similarities?.map((item, index) => (
                <div className="factCard" key={index} style={{ height: "auto", marginBottom: "16px" }}>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* DIFFERENCES */}
            <div className="compareColumn">
              <h2>Differences -</h2>
              {data?.differences?.map((item, index) => (
                <div className="factCard" key={index} style={{ height: "auto", marginBottom: "16px" }}>
                  <p>{item}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(`/object/${objectA}`)}
          style={{
            background: "#6820d6",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "40px"
          }}
        >
          ← Back to {objectA}
        </button>

      </div>
    </main>
  );
}