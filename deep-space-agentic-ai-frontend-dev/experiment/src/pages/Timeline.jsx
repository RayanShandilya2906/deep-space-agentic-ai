import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimeline } from "../services/api";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import "./Timeline.css";

function TimelineContent({ data }) {
  return (
    <div className="timelineTrack">
      {data?.timeline?.map((item, index) => (
        <div className={`timelineItem ${index % 2 === 0 ? "" : "timelineRight"}`} key={`${item.year}-${index}`}>
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
}

export default function Timeline() {
  const { object } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchTimeline() {
      try {
        setLoading(true);
        setError(null);
        const result = await getTimeline(decodeURIComponent(object));
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || "Unable to fetch timeline.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchTimeline();
    return () => {
      isMounted = false;
    };
  }, [object]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (loading) {
    return (
      <main className="analysisPage">
        <SpaceBackground />
        <Navbar />
        <div className="analysisContainer statusContainer">
          <div className="emptyState">Loading timeline for {decodeURIComponent(object)}...</div>
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
            <button className="retryButton" onClick={() => navigate(0)}>Retry</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="analysisPage">
      <SpaceBackground />
      <Navbar />

      {fullscreen && (
        <div className="timelineModal">
          <SpaceBackground />
          <div className="timelineModalHeader">
            <h2>{decodeURIComponent(object)?.toUpperCase()} TIMELINE</h2>
            <button onClick={() => setFullscreen(false)} className="timelineCloseBtn">
              ✕ Close
            </button>
          </div>
          <div className="timelineModalBody">
            <TimelineContent data={data} />
          </div>
        </div>
      )}

      <div className="analysisContainer">
        <section className="heroCard">
          <div className="heroContent">
            <div className="titleRow">
              <h1>{decodeURIComponent(object)?.toUpperCase()} TIMELINE</h1>
              <span className="planetBadge">HISTORY</span>
            </div>
            <p className="planetDescription">Key milestones in the exploration of {decodeURIComponent(object)}.</p>
          </div>
        </section>

        <section className="factsSection">
          <div className="timelineHeaderRow">
            <h2>Exploration History -</h2>
            <button onClick={() => setFullscreen(true)} className="timelineExpandBtn">
              ⛶ View Fullscreen
            </button>
          </div>
          <div className="timelineScroll">
            <TimelineContent data={data} />
          </div>
        </section>

        <button onClick={() => navigate(`/object/${encodeURIComponent(object)}`)} className="compareBackBtn">
          ← Back to {decodeURIComponent(object)}
        </button>
      </div>
    </main>
  );
}