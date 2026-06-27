import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";

export default function ObjectDetails() {
  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "white",
        padding: "100px 40px",
      }}
    >

        <SpaceBackground />
      <Navbar />

      <h1>Object Details</h1>
      <p>This page will show detailed information about the selected object.</p>
    </div>
  );
}