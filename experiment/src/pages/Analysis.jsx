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

  const [planet] = useState({
    name:    result?.name           ?? "Mars",
    type:    result?.type           ?? "Planet",
    summary: result?.summary        ?? "Mars, the fourth planet from the Sun, is a cold, rocky, desert world half the size of Earth. Named the 'Red Planet' for its rusty iron-rich soil, it fascinates scientists and space agencies alike as they explore its vast canyons, extinct volcanoes, and hunt for clues of ancient life.",
    facts:   result?.interesting_facts ?? [
      { title: "24h 37m",      body: "A Martian day is only slightly longer than an Earth day." },
      { title: "Olympus Mons", body: "Home to the largest volcano in the solar system at 22km high." },
      { title: "2 Moons",      body: "Phobos and Deimos are its two small, irregularly shaped moons." }
    ],
    related: result?.recommendations ?? [
      { name: "Earth",   image: "/earth.png" },
      { name: "Sun",     image: "/sun.png" },
      { name: "Jupiter", image: "/jupiter.png" },
      { name: "Saturn",  image: "/saturn.png" }
    ]
  });

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      <div className="analysisContainer">

        {/* HERO */}
        <section className="heroCard">
          <div className="heroPlanet">
            <MarsModel />
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
                <h3>{typeof fact === "string" ? "" : fact.title}</h3>
                <p>{typeof fact === "string" ? fact : fact.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="relatedSection">
          <h2>Related Objects -</h2>
          <div className="relatedGrid">
            {planet.related.map((item) => (
              <div
                className="relatedCard"
                key={item.name}
                onClick={() => navigate(`/object/${item.name}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EXPLORE MORE ✅ no more inline styles */}
        <section className="factsSection">
          <h2>Explore More -</h2>
          <div className="exploreRow">
            <input
              type="text"
              placeholder={`Compare ${planet.name} with...`}
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              className="exploreInput"
            />
            <button
              onClick={() => navigate(`/compare/${planet.name}/${compareWith.trim()}`)}
              disabled={!compareWith.trim()}
              className="exploreBtn"
            >
              Compare
            </button>
            <button
              onClick={() => navigate(`/timeline/${planet.name}`)}
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