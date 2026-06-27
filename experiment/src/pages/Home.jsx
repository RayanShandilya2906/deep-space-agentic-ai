import JupiterScene from "../components/JupiterScene";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [showHud, setShowHud] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [stage, setStage] = useState(0);
  const [jupiterExit, setJupiterExit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. HUD appears
    const hudTimer = setTimeout(() => {
      setShowHud(true);
    }, 1500);

    // 2. HUD disappears + Jupiter starts moving
    const stage1Timer = setTimeout(() => {
      setShowHud(false);
      setStage(1);
    }, 4000);

    // 3. Jupiter disappears
    const jupiterTimer = setTimeout(() => {
      setJupiterExit(true);
    }, 7000);

    // 4. Intro logo
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 5000);

    // 5. Upload UI appears
    const uiTimer = setTimeout(() => {
      setShowLogo(false);
      setStage(2);
    }, 7000);

    return () => {
      clearTimeout(hudTimer);
      clearTimeout(stage1Timer);
      clearTimeout(jupiterTimer);
      clearTimeout(logoTimer);
      clearTimeout(uiTimer);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <JupiterScene
        jupiterExit={jupiterExit}
        stage={stage}
      />

      {/* HUD */}
      <div className={`hud ${showHud ? "hud-visible" : "hud-hidden"}`}>
        <div className="corner tl"></div>
        <div className="corner tr"></div>
        <div className="corner bl"></div>
        <div className="corner br"></div>
        <div className="scanner"></div>
      </div>

      {/* Intro Logo */}
      {showLogo && (
        <div className="logo">
          ASTRO LENS
        </div>
      )}

      {/* Upload Screen */}
{stage >= 2 && (
  <>
    <Navbar />

    <div className="uploadSection">
      <h1>Explore the Space with AI</h1>

      <div className="uploadBox">
        <div className="uploadIcon">
          <img
            src="/upload.png"
            alt="upload"
            className="uploadImage"
          />
        </div>

        <h2>Upload a Space Image Here</h2>

        <p>Drag & Drop your image or click below</p>

        <small>
          PNG, JPG, JPEG • Maximum file size 10 MB
        </small>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
        />

        <button onClick={() => navigate("/loading")}>
          Analyze Image
        </button>
      </div>
    </div>
  </>
)}
    </div>
  );
}

export default Home;