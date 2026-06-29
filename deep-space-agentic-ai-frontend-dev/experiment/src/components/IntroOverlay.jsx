import "./IntroOverlay.css";

export default function IntroOverlay({ introStage }) {
  return (
    <>

      {introStage === "boot" && (
        <div className="bootSequence">
            <p className="line line1">INITIALIZING AI...</p>
            <p className="line line2">Loading Vision Model...</p>
            <p className="line line3">Connecting Deep Space Database...</p>

            <p className="line line4">
                MISSION READY<span className="cursor">_</span>
                </p>
            </div>


      )}
    </>
  );
}