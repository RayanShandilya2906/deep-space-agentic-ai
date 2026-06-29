import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimeline } from "../services/api";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import "./Timeline.css";

export default function Timeline() {
  const { object } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false); // ✅ new

  useEffect(() => {
    async function fetchTimeline() {
      try {
        setLoading(true);
        // const result = await getTimeline(object);
        const result = {
          object: object,
          timeline: [
            { year: "1965", event: "Mariner 4 performs the first successful flyby, returning 21 images of the surface." },
            { year: "1971", event: "Mariner 9 becomes the first spacecraft to orbit another planet." },
            { year: "1976", event: "Viking 1 successfully lands and sends back the first images from the surface." },
            { year: "1997", event: "Mars Pathfinder lands with Sojourner, the first rover to operate on another planet." },
            { year: "2004", event: "Spirit and Opportunity rovers land, far exceeding their 90-day mission." },
            { year: "2012", event: "Curiosity rover lands in Gale Crater to study Mars climate and geology." },
            { year: "2021", event: "Perseverance rover lands, begins search for ancient microbial life." }
          ]
        };
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTimeline();
  }, [object]);

  // ✅ close fullscreen on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (loading) return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px" }}>Loading timeline for {object}...</p>
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

  const TimelineContent = () => (
    <div className="timelineTrack">
      {data?.timeline?.map((item, index) => (
        <div className={`timelineItem ${index % 2 === 0 ? "" : "timelineRight"}`} key={index}>
          <div className="timelineDot" />
          <div className="timelineCard">
            <h3 className="timelineYear">{item.year}</h3>
            <p className="timelineEvent">{item.event}</p>
          </div>
        </div>
      ))}
      <div className="timelineLine" />
    </div>
  );

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      {/* ✅ FULLSCREEN MODAL */}
      {fullscreen && (
        <div className="timelineModal">
            <SpaceBackground />
          <div className="timelineModalHeader">
            <h2 style={{ fontFamily: "Jersey 10", fontSize: "28px", letterSpacing: "2px", margin: 0 }}>
              {object?.toUpperCase()} TIMELINE
            </h2>
            <button
              onClick={() => setFullscreen(false)}
              className="timelineCloseBtn"
            >
              ✕ Close
            </button>
          </div>
          <div className="timelineModalBody">
            <TimelineContent />
          </div>
        </div>
      )}

      <div className="analysisContainer">

        {/* HEADER */}
        <section className="heroCard">
          <div className="heroContent">
            <div className="titleRow">
              <h1>{object?.toUpperCase()} TIMELINE</h1>
              <span className="planetBadge">HISTORY</span>
            </div>
            <p className="planetDescription">
              Key milestones in the exploration of {object}.
            </p>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="factsSection">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Exploration History -</h2>
            <button
              onClick={() => setFullscreen(true)}
              className="timelineExpandBtn"
            >
              ⛶ View Fullscreen
            </button>
          </div>
          <div className="timelineScroll">
            <TimelineContent />
          </div>
        </section>

        <button
          onClick={() => navigate(`/object/${object}`)}
          style={{
            background: "#6820d6",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "60px"
          }}
        >
          ← Back to {object}
        </button>

      </div>
    </main>
  );
}