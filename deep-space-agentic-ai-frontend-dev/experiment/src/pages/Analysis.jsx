import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "./Analysis.css";
import { analyzeImage, getFriendlyError } from "../services/api";
import HeroScene from "../components/HeroScene";
import Navbar from "../components/Navbar";
import MarsModel from "../components/MarsModel";
import SpaceBackground from "../components/SpaceBackground";

function normalizeFacts(result) {
  return Array.isArray(result?.interesting_facts)
    ? result.interesting_facts.map((fact, index) =>
        typeof fact === "string" ? { title: `Fact ${index + 1}`, body: fact } : fact
      )
    : [];
}

function normalizeRecommendations(result) {
  return (result?.recommendations || []).map((item) =>
    typeof item === "string" ? { name: item, image: "/andromeda.png" } : item
  );
}

export default function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(state?.file || null);
  const [result, setResult] = useState(state?.result || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [compareWith, setCompareWith] = useState("");

  const facts = normalizeFacts(result);
  const recommendations = normalizeRecommendations(result);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a space image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await analyzeImage(file);
      setResult(data);
      navigate("/analysis", { replace: true, state: { result: data, file } });
    } catch (err) {
      setError(getFriendlyError(err, "Analysis failed because the backend is unavailable. Please try again later."));
    } finally {
      setLoading(false);
    }
  };

  const uploadPanel = (
    <div className="uploadSection analysisUploadSection">
      <h1>Explore the Space with AI</h1>
      <div className="uploadBox">
        <div className="uploadIcon">
          <img src="/upload.png" alt="upload" className="uploadImage" />
        </div>
        <h2>Upload a Space Image Here</h2>
        <p>Drag & Drop your image or click below</p>
        <small>PNG, JPG, JPEG - Maximum file size 10 MB</small>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(event) => {
            setFile(event.target.files?.[0] || null);
            if (error) setError("");
          }}
        />

        {file && <p className="uploadFileName">Selected: {file.name}</p>}
        {error && <p className="uploadError">{error}</p>}

        <button onClick={handleAnalyze} disabled={loading || !file}>
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </div>
    </div>
  );

  if (!result) {
    return (
      <div className="analysisUploadPage">
        <HeroScene introStage="upload" />
        <Navbar />
        {uploadPanel}
      </div>
    );
  }

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      <div className="analysisContainer">
        <section className="analysisCompactUpload">{uploadPanel}</section>

        <section className="heroCard">
          <div className="heroPlanet">
            <MarsModel />
          </div>
          <div className="heroContent">
            <div className="titleRow">
              <h1>{result.name?.toUpperCase() || "ANALYSIS RESULT"}</h1>
              <span className="planetBadge">{result.type?.toUpperCase() || "DETECTED OBJECT"}</span>
            </div>
            <p className="planetDescription">{result.summary || "No summary was returned for this analysis."}</p>
          </div>
        </section>

        <section className="factsSection">
          <h2>Interesting Facts -</h2>
          {facts.length > 0 ? (
            <div className="factsGrid">
              {facts.map((fact, index) => (
                <div className="factCard" key={`${fact.title || "fact"}-${index}`}>
                  <h3>{fact.title || `Fact ${index + 1}`}</h3>
                  <p>{fact.body || fact.description || "No fact details were returned."}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="emptyState">No facts were returned for this analysis.</div>
          )}
        </section>

        <section className="relatedSection">
          <h2>Recommendations -</h2>
          {recommendations.length > 0 ? (
            <div className="relatedGrid">
              {recommendations.map((item) => (
                <div
                  className="relatedCard"
                  key={item.name}
                  onClick={() => navigate(`/object/${encodeURIComponent(item.name)}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item.image || "/andromeda.png"}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src = "/andromeda.png";
                    }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="emptyState">No recommendations were returned.</div>
          )}
        </section>

        <section className="factsSection">
          <h2>Timeline -</h2>
          <div className="emptyState analysisActionState">
            <p>Open the supported exploration timeline for {result.name || "this object"}.</p>
            <button
              onClick={() => navigate(`/timeline/${encodeURIComponent(result.name)}`)}
              disabled={!result.name}
              className="timelineBtn"
            >
              View Timeline
            </button>
          </div>
        </section>

        <section className="factsSection">
          <h2>Compare -</h2>
          <div className="exploreRow">
            <input
              type="text"
              placeholder={`Compare ${result.name || "object"} with...`}
              value={compareWith}
              onChange={(event) => setCompareWith(event.target.value)}
              className="exploreInput"
            />
            <button
              onClick={() => navigate(`/compare/${encodeURIComponent(result.name)}/${encodeURIComponent(compareWith.trim())}`)}
              disabled={!result.name || !compareWith.trim()}
              className="exploreBtn"
            >
              Compare
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
