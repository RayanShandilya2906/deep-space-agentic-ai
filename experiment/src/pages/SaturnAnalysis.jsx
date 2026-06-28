import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ added
import "./Analysis.css";
import Navbar from "../components/Navbar";
import SaturnModel from "../components/SaturnModel";

export default function Analysis() {
  // ✅ Pull real data from navigation state
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const [compareWith, setCompareWith] = useState("");

  // ✅ Fallback to placeholder if no backend data yet (useful during dev)
  const [planet] = useState({
    name: result?.name ?? "Earth",
    type: result?.type ?? "Planet",
    summary: result?.summary ?? "Earth is the third planet from the Sun and the only known astronomical object to harbor life. Formed about 4.5 billion years ago, it is an ocean world with 71% of its surface covered by liquid water, which supports complex ecosystems and a stable atmosphere.",
    facts: result?.interesting_facts ?? [
      { title: "24h 37m", body: "A Martian day is only slightly longer than an Earth day." },
      { title: "Olympus Mons", body: "Home to the largest volcano in the solar system at 22km high." },
      { title: "1 Moon", body: "Phobos and Deimos are its two small, irregularly shaped moons." }
    ],
    related: result?.recommendations ?? [
      { name: "Mars", image: "/mars.png" },
      { name: "Sun", image: "/sun.png" },
      { name: "Jupiter", image: "/jupiter.png" },
      { name: "Saturn", image: "/saturn.png" }
    ]
  });


  return (
    <main className="analysisPage">
      <div className="stars"></div>
      <Navbar />

      <div className="analysisContainer">

        {/* HERO */}
        <section className="heroCard">
          <div className="heroPlanet">
            <SaturnModel />
          </div>
          <div className="heroContent">
            <div className="titleRow">
              <h1>{planet.name.toUpperCase()}</h1>
              <span className="planetBadge">{planet.type.toUpperCase()}</span>
            </div>
            <p className="planetDescription">{planet.summary}</p>
          </div>
        </section>

        {/* FACTS */}
        <section className="factsSection">
          <h2>Interesting Facts -</h2>
          <div className="factsGrid">
            {planet.facts.map((fact, index) => (
              <div className="factCard" key={index}>
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="relatedSection">
          <h2>Related Objects -</h2>
          <div className="relatedGrid">
            {planet.related.map((item) => (
              <div className="relatedCard" key={item.name}
              onClick={() => navigate('/object/${item.name}')}
              style={{cursor: "pointer"}}>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="factsSection">
          <h2>Explore More -</h2>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

            <input
              type="text"
              placeholder={`Compare ${planet.name} with...`}
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              style={{
                background: "#262626",
                border: "1px solid #1597ff",
                borderRadius: "8px",
                padding: "10px 16px",
                color: "white",
                fontFamily: "Montserrat",
                fontSize: "14px",
                width: "260px",
                outline: "none"
              }}
            />

            <button
              onClick={() => navigate(`/compare/${planet.name}/${compareWith.trim()}`)}
              disabled={!compareWith.trim()}
              style={{
                background: compareWith.trim() ? "#6820d6" : "#333",
                border: "none",
                borderRadius: "8px",
                padding: "10px 24px",
                color: "white",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "14px",
                cursor: compareWith.trim() ? "pointer" : "not-allowed"
              }}
            >
              Compare
            </button>

            <button
              onClick={() => navigate(`/timeline/${planet.name}`)}
              style={{
                background: "#08183d",
                border: "1px solid #1597ff",
                borderRadius: "8px",
                padding: "10px 24px",
                color: "white",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              View Timeline →
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}