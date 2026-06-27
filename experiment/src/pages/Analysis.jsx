import { useState } from "react";
import Navbar from "../components/Navbar";
import MarsModel from "../components/MarsModel";

export default function Analysis() {
  const [planet] = useState({
    name: "Mars",
    type: "Planet",
    image: "/mars.png",
    summary:
      "The fourth planet from the Sun, Mars is a cold desert world with the tallest volcano and largest canyon in the solar system. Its reddish surface is due to iron oxide.",

    facts: [
      {
        title: "24h 37m",
        body: "A Martian day is only slightly longer than an Earth day."
      },
      {
        title: "Olympus Mons",
        body: "Largest volcano in the Solar System."
      },
      {
        title: "2 Moons",
        body: "Phobos and Deimos orbit Mars."
      }
    ],

    related: [
      {
        name: "Earth",
        image: "/earth.png"
      },
      {
        name: "Sun",
        image: "/sun.png"
      },
      {
        name: "Jupiter",
        image: "/jupiter.png"
      },
      {
        name: "Saturn",
        image: "/saturn.png"
      }
    ]
  });

  return (
    <div className="analysisPage">

      <div className="stars"></div>

      <Navbar />

      <div className="planetCard">

        <div className="planetModel">
            <MarsModel />
            </div>

        <div>

          <div className="planetHeader">

            <h1>{planet.name}</h1>

            <span>{planet.type}</span>

          </div>

          <p>{planet.summary}</p>

        </div>

      </div>

      <h2>Interesting Facts</h2>

      <div className="factsGrid">

        {planet.facts.map((fact) => (

          <div className="factCard">

            <h3>{fact.title}</h3>

            <p>{fact.body}</p>

          </div>

        ))}

      </div>

      <h2>Related Objects</h2>

      <div className="relatedRow">

        {planet.related.map((item) => (

          <div className="relatedCard">

            <img src={item.image} />

            <span>{item.name}</span>

          </div>

        ))}

      </div>

    </div>
  );
}