import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">

      <Link to="/" className="navbarLogo">

        <img
          src="/logo.png"
          alt="Astro Lens"
          className="navbarImage"
        />

        <span>ASTRO LENS</span>

      </Link>

    </div>
  );
}