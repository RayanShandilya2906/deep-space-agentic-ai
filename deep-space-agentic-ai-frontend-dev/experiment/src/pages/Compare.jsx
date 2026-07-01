import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { compareObjects, getFriendlyError } from "../services/api";
import Navbar from "../components/Navbar";
import "./Compare.css";
import SpaceBackground from "../components/SpaceBackground";

const objectOptions = [
  "Sun",
  "Mercury",
  "Venus",
  "Earth",
  "Moon",
  "Mars",
  "Phobos",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Andromeda",
];

export default function Compare() {
  const { objectA, objectB } = useParams();
  const navigate = useNavigate();
  const [firstObject, setFirstObject] = useState(objectA ? decodeURIComponent(objectA) : "Earth");
  const [secondObject, setSecondObject] = useState(objectB ? decodeURIComponent(objectB) : "Mars");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(objectA && objectB));
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchComparison() {
      if (!objectA || !objectB) {
        setData(null);
        setLoading(false);
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");
        const a = decodeURIComponent(objectA);
        const b = decodeURIComponent(objectB);
        setFirstObject(a);
        setSecondObject(b);
        const result = await compareObjects(a, b);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(getFriendlyError(err, "Comparison failed because the backend is unavailable."));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchComparison();
    return () => {
      isMounted = false;
    };
  }, [objectA, objectB]);

  const startComparison = () => {
    const a = firstObject.trim();
    const b = secondObject.trim();
    if (!a || !b || a.toLowerCase() === b.toLowerCase()) return;
    navigate(`/compare/${encodeURIComponent(a)}/${encodeURIComponent(b)}`);
  };

  const decodedA = objectA ? decodeURIComponent(objectA) : firstObject;
  const decodedB = objectB ? decodeURIComponent(objectB) : secondObject;

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      <div className="analysisContainer">
        <section className="heroCard">
          <div className="heroContent">
            <div className="titleRow">
              <h1>OBJECT COMPARISON</h1>
              <span className="planetBadge">AI MATCHUP</span>
            </div>
            <p className="planetDescription">Select two celestial objects and compare their similarities and differences.</p>
          </div>
        </section>

        <section className="factsSection">
          <h2>Select Objects -</h2>
          <div className="compareSelectorPanel">
            <div className="compareInputGroup">
              <label htmlFor="first-object">First Object</label>
              <input
                id="first-object"
                className="exploreInput"
                list="space-objects"
                value={firstObject}
                onChange={(event) => setFirstObject(event.target.value)}
              />
            </div>
            <div className="compareInputGroup">
              <label htmlFor="second-object">Second Object</label>
              <input
                id="second-object"
                className="exploreInput"
                list="space-objects"
                value={secondObject}
                onChange={(event) => setSecondObject(event.target.value)}
              />
            </div>
            <datalist id="space-objects">
              {objectOptions.map((object) => (
                <option value={object} key={object} />
              ))}
            </datalist>
            <button
              className="exploreBtn"
              onClick={startComparison}
              disabled={!firstObject.trim() || !secondObject.trim() || firstObject.trim().toLowerCase() === secondObject.trim().toLowerCase()}
            >
              Compare Objects
            </button>
          </div>
        </section>

        {loading && (
          <div className="emptyState">Comparing {decodedA} and {decodedB}...</div>
        )}

        {error && (
          <div className="emptyState">
            <p>{error}</p>
            <button className="retryButton" onClick={() => navigate(0)}>Retry</button>
          </div>
        )}

        {data && !loading && !error && (
          <>
            <section className="compareHero">
              <div className="compareHeroSide">
                <img
                  src={`/${decodedA.toLowerCase()}.png`}
                  alt={decodedA}
                  className="compareHeroImg"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <h1 className="compareHeroName">{decodedA.toUpperCase()}</h1>
              </div>

              <div className="compareVsBadge">VS</div>

              <div className="compareHeroSide">
                <img
                  src={`/${decodedB.toLowerCase()}.png`}
                  alt={decodedB}
                  className="compareHeroImg"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <h1 className="compareHeroName">{decodedB.toUpperCase()}</h1>
              </div>
            </section>

            <section className="factsSection">
              <div className="compareScroll">
                <div className="compareGrid">
                  <div className="compareColumn">
                    <div className="compareColHeader simHeader">
                      <span className="compareColIcon">*</span>
                      <h2>Similarities</h2>
                    </div>
                    {data?.similarities?.length ? (
                      data.similarities.map((item, index) => (
                        <div className="compareCard simCard" key={index}>
                          <span className="compareCardIcon">*</span>
                          <p>{item}</p>
                        </div>
                      ))
                    ) : (
                      <div className="emptyState">No similarities were returned.</div>
                    )}
                  </div>

                  <div className="compareColumn">
                    <div className="compareColHeader diffHeader">
                      <span className="compareColIcon">*</span>
                      <h2>Differences</h2>
                    </div>
                    {data?.differences?.length ? (
                      data.differences.map((item, index) => (
                        <div className="compareCard diffCard" key={index}>
                          <span className="compareCardIcon">*</span>
                          <p>{item}</p>
                        </div>
                      ))
                    ) : (
                      <div className="emptyState">No differences were returned.</div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
