import SpaceBackground from "../components/SpaceBackground";
import "../App.css";

export default function Loading() {
  return (
    <div className="loadingPage">
      <SpaceBackground />

      {/* HUD corners */}
      <div className="scanCorner scanTL" />
      <div className="scanCorner scanTR" />
      <div className="scanCorner scanBL" />
      <div className="scanCorner scanBR" />

      {/* center content */}
      <div className="scanCenter">

        {/* rings */}
        <div className="scanRing scanRing1" />
        <div className="scanRing scanRing2" />
        <div className="scanRing scanRing3" />

        {/* rotating arc */}
        <div className="scanArc" />

        {/* icon */}
        <div className="scanIcon">
          <img src="/logo.png" alt="scan" style={{ width: "48px", opacity: 0.9 }} />
        </div>

      </div>

      {/* text */}
      <p className="scanLabel">SCANNING IMAGE</p>
      <p className="scanSub">AI Vision Model Processing...</p>

      {/* bottom status bar */}
      <div className="scanStatusBar">
        <div className="scanStatusFill" />
      </div>
      <p className="scanStatusText">ANALYZING DEEP SPACE DATA</p>

    </div>
  );
}