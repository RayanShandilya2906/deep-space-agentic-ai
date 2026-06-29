import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Analysis.css";
import Navbar from "../components/Navbar";
import MarsModel from "../components/MarsModel";
import SpaceBackground from "../components/SpaceBackground";

export default function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const [compareWith, setCompareWith] = useState("");

  const facts = Array.isArray(result?.interesting_facts)
    ? result.interesting_facts.map((fact, index) =>
        typeof fact === "string"
          ? { title: `Fact ${index + 1}`, body: fact }
          : fact
      )
    : [];

  const recommendations = (result?.recommendations || []).map((item) =>
    typeof item === "string"
      ? { name: item, image: "/andromeda.png" }
      : item
  );

  if (!result) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer">
          <section className="heroCard">
            <div className="heroContent">
              <div className="titleRow">
                <h1>NO ANALYSIS FOUND</h1>
              </div>
              <p className="planetDescription">Upload an image to generate a new analysis.</p>
            </div>
          </section>
          <div className="emptyState">
            <p>No analysis result is available yet.</p>
            <button className="retryButton" onClick={() => navigate("/")}>Go back home</button>
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
          <div className="heroPlanet">
            <MarsModel />
          </div>
          <div className="heroContent">
            <div className="titleRow">
              <h1>{result.name?.toUpperCase()}</h1>
              <span className="planetBadge">{result.type?.toUpperCase()}</span>
            </div>
            <p className="planetDescription">{result.summary}</p>
          </div>
        </section>

        <section className="factsSection">
          <h2>Interesting Facts -</h2>
          {facts.length > 0 ? (
            <div className="factsGrid">
              {facts.map((fact, index) => (
                <div className="factCard" key={`${fact.title || "fact"}-${index}`}>
                  <h3>{fact.title}</h3>
                  <p>{fact.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="emptyState">No facts were returned for this analysis.</div>
          )}
        </section>

        <section className="relatedSection">
          <h2>Related Objects -</h2>
          {recommendations.length > 0 ? (
            <div className="relatedGrid">
              {recommendations.map((item) => (
                <div
                  className="relatedCard"
                  key={item.name}
                  onClick={() => navigate(`/object/${encodeURIComponent(item.name)}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.image || "/andromeda.png"} alt={item.name} onError={(event) => { event.currentTarget.src = "/andromeda.png"; }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="emptyState">No related objects were returned.</div>
          )}
        </section>

        <section className="factsSection">
          <h2>Explore More -</h2>
          <div className="exploreRow">
            <input
              type="text"
              placeholder={`Compare ${result.name} with...`}
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              className="exploreInput"
            />
            <button
              onClick={() => navigate(`/compare/${encodeURIComponent(result.name)}/${encodeURIComponent(compareWith.trim())}`)}
              disabled={!compareWith.trim()}
              className="exploreBtn"
            >
              Compare
            </button>
            <button
              onClick={() => navigate(`/timeline/${encodeURIComponent(result.name)}`)}
              className="timelineBtn"
            >
              View Timeline →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}