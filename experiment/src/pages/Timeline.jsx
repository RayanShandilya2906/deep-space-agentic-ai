import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimeline } from "../services/api";
import Navbar from "../components/Navbar";
import "./Timeline.css";
import SpaceBackground from "../components/SpaceBackground";

export default function Timeline() {
  const { object } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="stars"></div>
      <Navbar />
      <div className="analysisContainer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "Montserrat", fontSize: "18px", color: "#ff4444" }}>Error: {error}</p>
      </div>
    </main>
  );

  return (
    <main className="analysisPage">
      <div className="stars"></div>
      <Navbar />

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
          <h2>Exploration History -</h2>

          <div className="timelineTrack">
            {data?.timeline?.map((item, index) => (
              <div
                className={`timelineItem ${index % 2 === 0 ? "timelineLeft" : "timelineRight"}`}
                key={index}
              >
                <div className="timelineDot" />
                <div className="timelineCard">
                  <h3 className="timelineYear">{item.year}</h3>
                  <p className="timelineEvent">{item.event}</p>
                </div>
              </div>
            ))}
            <div className="timelineLine" />
          </div>
        </section>

        {/* BACK BUTTON */}
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