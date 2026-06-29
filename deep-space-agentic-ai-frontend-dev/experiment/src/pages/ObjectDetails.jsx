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

function DefaultModel({ name, object }) {
  return (
    <img
      src={object?.imageUrl || `/${name?.toLowerCase()}.png`}
      alt={name}
      className="detailHeroImage"
      onError={(event) => {
        event.currentTarget.src = "/andromeda.png";
      }}
    />
  );
}

export default function ObjectDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareWith, setCompareWith] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchObject() {
      try {
        setLoading(true);
        setError(null);
        const data = await getObjectDetails(name);
        if (isMounted) setObject(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Unable to fetch object details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchObject();
    return () => {
      isMounted = false;
    };
  }, [name]);

  const handleCompare = () => {
    if (!compareWith.trim()) return;
    navigate(`/compare/${encodeURIComponent(name)}/${encodeURIComponent(compareWith.trim())}`);
  };

  const planetModels = {
    earth: EarthModel,
    mars: MarsModel,
    jupiter: JupiterModel,
    saturn: SaturnModel,
    phobos: PhobosModel,
    sun: SunModel,
  };

  const ModelComponent = planetModels[name?.toLowerCase()];
  const Model = ModelComponent || DefaultModel;

  const facts = Array.isArray(object?.interesting_facts)
    ? object.interesting_facts.map((fact, index) =>
        typeof fact === "string"
          ? { title: `Fact ${index + 1}`, body: fact }
          : fact
      )
    : [];

  const recommendations = (object?.recommendations || []).map((item) =>
    typeof item === "string"
      ? { name: item, image: "/andromeda.png" }
      : item
  );

  if (loading) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer statusContainer">
          <div className="emptyState">Loading {name}...</div>
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
            <button className="retryButton" onClick={() => navigate(0)}>
              Retry
            </button>
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
            <div className="emptyState">No facts were returned for this object.</div>
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
          <h2>Compare -</h2>
          <div className="exploreRow">
            <input
              type="text"
              placeholder={`Compare ${name} with...`}
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              className="exploreInput"
            />
            <button onClick={handleCompare} disabled={!compareWith.trim()} className="exploreBtn">
              Compare
            </button>
            <button onClick={() => navigate(`/timeline/${encodeURIComponent(name)}`)} className="timelineBtn">
              View Timeline →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}