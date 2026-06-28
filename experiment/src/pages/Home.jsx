import HeroScene from "../components/HeroScene";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { analyzeImage } from "../services/api";
import "./HomeIntro.css";
import IntroOverlay from "../components/IntroOverlay";

function Home() {
  const [introStage, setIntroStage] = useState("title");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ added for button feedback 
  
  useEffect(() => {
  const t1 = setTimeout(() => setIntroStage("boot"), 1000);
  return () => clearTimeout(t1);
}, []);

  // ✅ ONE clean handleAnalyze — no duplicate
  const handleAnalyze = async () => {
    if (!file)
      alert("Please upload a file first");
      return;
    try {
      setLoading(true);
      const result = await analyzeImage(file);
      navigate("/analysis", { state: { result, file } });
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black", position: "relative", overflow: "hidden" }}>
      <HeroScene introStage={introStage}
      onIntroEnd={() => {
  setTimeout(() => {
    setIntroStage("upload");
  }, 800); // gives exit time
}}/>
      {introStage !== "title" && (
        <IntroOverlay introStage={introStage} />
        )}

      {/* Upload Screen */}
      {introStage === "upload" && (
        <>
          {introStage !== "upload" && <Navbar />}
          <div className="uploadSection">
            <h1>Explore the Space with AI</h1>
            <div className="uploadBox">
              <div className="uploadIcon">
                <img src="/upload.png" alt="upload" className="uploadImage" />
              </div>
              <h2>Upload a Space Image Here</h2>
              <p>Drag & Drop your image or click below</p>
              <small>PNG, JPG, JPEG • Maximum file size 10 MB</small>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {/* ✅ Disabled while loading, shows feedback */}
              <button onClick={handleAnalyze} disabled={loading || !file}>
                {loading ? "Analyzing..." : "Analyze Image"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;