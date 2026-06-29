import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getObjectDetails } from "../services/api";
import Navbar from "../components/Navbar";
import "./ObjectDetails.css";
import EarthModel from "../components/EarthModel";
import MarsModel from "../components/MarsModel";
import JupiterModel from "../components/JupiterModel";
import SaturnModel from "../components/SaturnModel";
import PhobosModel from "../components/PhobosModel";
import SunModel from "../components/SunModel";
import SpaceBackground from "../components/SpaceBackground";

const PLANET_DATA = {
  Mars: {
    type: "Planet",
    summary: "Mars, the fourth planet from the Sun, is a cold, rocky, desert world half the size of Earth. Named the 'Red Planet' for its rusty iron-rich soil, it fascinates scientists and space agencies alike as they explore its vast canyons, extinct volcanoes, and hunt for clues of ancient life.",
    interesting_facts: [
      { title: "24h 37m",      body: "A Martian day is only slightly longer than an Earth day." },
      { title: "Olympus Mons", body: "Home to the largest volcano in the solar system at 22km high." },
      { title: "2 Moons",      body: "Phobos and Deimos are its two small, irregularly shaped moons." }
    ],
    recommendations: [
      { name: "Earth",   image: "/earth.png" },
      { name: "Jupiter", image: "/jupiter.png" },
      { name: "Saturn",  image: "/saturn.png" },
      { name: "Phobos",  image: "/phobos.png" }
    ]
  },
  Earth: {
    type: "Planet",
    summary: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is covered with water, making it unique in the solar system.",
    interesting_facts: [
      { title: "1 Moon",         body: "Earth has one natural satellite, the Moon, which stabilizes its axial tilt." },
      { title: "Magnetic Field", body: "Earth's magnetic field protects us from harmful solar radiation." },
      { title: "24 Hours",       body: "Earth takes 24 hours to complete one full rotation on its axis." }
    ],
    recommendations: [
      { name: "Mars",    image: "/mars.png" },
      { name: "Jupiter", image: "/jupiter.png" },
      { name: "Saturn",  image: "/saturn.png" },
      { name: "Sun",     image: "/sun.png" }
    ]
  },
  Jupiter: {
    type: "Planet",
    summary: "Jupiter is the largest planet in the solar system, a gas giant with a mass more than twice that of all other planets combined. Its Great Red Spot is a storm that has raged for hundreds of years.",
    interesting_facts: [
      { title: "Great Red Spot", body: "A storm larger than Earth that has lasted over 350 years." },
      { title: "79 Moons",       body: "Jupiter has 79 known moons, including the four large Galilean moons." },
      { title: "10h Rotation",   body: "Despite its size, Jupiter rotates faster than any other planet." }
    ],
    recommendations: [
      { name: "Mars",   image: "/mars.png" },
      { name: "Saturn", image: "/saturn.png" },
      { name: "Earth",  image: "/earth.png" },
      { name: "Phobos", image: "/phobos.png" }
    ]
  },
  Saturn: {
    type: "Planet",
    summary: "Saturn is the sixth planet from the Sun and the second largest in the solar system. Its stunning ring system, made of ice and rock, makes it one of the most visually distinctive planets.",
    interesting_facts: [
      { title: "Ring System", body: "Saturn's rings extend up to 282,000 km from the planet but are only 10m thick." },
      { title: "83 Moons",    body: "Saturn has 83 moons, with Titan being the second largest moon in the solar system." },
      { title: "Least Dense", body: "Saturn is the least dense planet — it would float in water." }
    ],
    recommendations: [
      { name: "Mars",    image: "/mars.png" },
      { name: "Jupiter", image: "/jupiter.png" },
      { name: "Earth",   image: "/earth.png" },
      { name: "Sun",     image: "/sun.png" }
    ]
  },
  Phobos: {
    type: "Celestial Object",
    summary: "Phobos is the larger and innermost of Mars' two moons. It is a tiny, heavily cratered, potato-shaped object measuring about 27 × 22 × 18 kilometers. Because it orbits extremely close to the Red Planet, it completes a full revolution in just 7 hours and 39 minutes.",
    interesting_facts: [
      { title: "Unique Orbit",         body: "Rises in the west and sets in the east twice a day from the Martian surface." },
      { title: "The Stickney Crater",  body: "An impact so massive it nearly shattered the entire moon." },
      { title: "Deep Dust",            body: "Covered in a thick layer of powdery, asteroid-like dust, often called regolith." }
    ],
    recommendations: [
      { name: "Mars",   image: "/mars.png" },
      { name: "Saturn", image: "/saturn.png" },
      { name: "Earth",  image: "/earth.png" },
      { name: "Sun",    image: "/sun.png" }
    ]
  },
  Sun: {
    type: "Star",
    summary: "The Sun is the star at the center of our solar system. It is a massive, hot ball of glowing hydrogen and helium that sustains life on Earth by providing essential heat and light.",
    interesting_facts: [
      { title: "Radius",      body: "About 695,700 km, which is roughly 109 times Earth's radius." },
      { title: "Temperature", body: "The hottest part reaches temperatures of around 15 million°C (27 million °F)." },
      { title: "Composition", body: "Made almost entirely of hydrogen and helium gas bound together by gravity." }
    ],
    recommendations: [
      { name: "Mars",   image: "/mars.png" },
      { name: "Saturn", image: "/saturn.png" },
      { name: "Earth",  image: "/earth.png" },
      { name: "Sun",    image: "/sun.png" }
    ]
  },
};

export default function ObjectDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareWith, setCompareWith] = useState("");

  useEffect(() => {
    async function fetchObject() {
      try {
        setLoading(true);
        // const data = await getObjectDetails(name);
        const preset = PLANET_DATA[name];
        const data = preset ? { name, ...preset } : {
          name: name,
          type: "Celestial Object",
          summary: `${name} is a fascinating celestial object in our solar system.`,
          interesting_facts: [
            { title: "Unique",  body: `${name} has unique characteristics that make it special.` },
            { title: "Ancient", body: "Scientists have studied this object for centuries." },
            { title: "Future",  body: "Future missions may explore this object further." }
          ],
          recommendations: [
            { name: "Mars",    image: "/mars.png" },
            { name: "Jupiter", image: "/jupiter.png" },
            { name: "Saturn",  image: "/saturn.png" },
            { name: "Earth",   image: "/earth.png" },
          ]
        };
        setObject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchObject();
  }, [name]);

  const handleCompare = () => {
    if (!compareWith.trim()) return;
    navigate(`/compare/${name}/${compareWith.trim()}`);
  };

  const planetModels = {
    earth:   EarthModel,
    mars:    MarsModel,
    jupiter: JupiterModel,
    saturn:  SaturnModel,
    phobos:  PhobosModel,
    sun:     SunModel,
  };

  const ModelComponent = planetModels[name?.toLowerCase()];
  const Model = ModelComponent
    ? ModelComponent
    : () => (
        <img
          src={`/${name?.toLowerCase()}.png`}
          alt={name}
          style={{ width: "100px", height: "100px", objectFit: "contain", borderRadius: "50%" }} // ✅ fixed: "contain" not contain
          onError={(e) => { e.target.src = "/andromeda.png"; }}
        />
      );

  if (loading) return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px" }}>Loading {name}...</p>
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

        {/* HERO */}
        <section className="heroCard">
          <div className="heroPlanet">
            <Model />
          </div>
          <div className="heroContent">
            <div className="titleRow">
              <h1>{object?.name?.toUpperCase()}</h1>
              <span className="planetBadge">{object?.type?.toUpperCase()}</span>
            </div>
            <p className="planetDescription">{object?.summary}</p>
          </div>
        </section>

        {/* FACTS */}
        <section className="factsSection">
          <h2>Interesting Facts -</h2>
          <div className="factsGrid">
            {object?.interesting_facts?.map((fact, index) => (
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
            {object?.recommendations?.map((item) => (
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

        {/* COMPARE + TIMELINE ✅ no inline styles */}
        <section className="factsSection">
          <h2>Compare -</h2>
          <div className="exploreRow">
            <input
              type="text"
              placeholder={`Compare ${name} with...`}
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              className="exploreInput"
            />
            <button
              onClick={handleCompare}
              disabled={!compareWith.trim()}
              className="exploreBtn"
            >
              Compare
            </button>
            <button
              onClick={() => navigate(`/timeline/${name}`)}
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