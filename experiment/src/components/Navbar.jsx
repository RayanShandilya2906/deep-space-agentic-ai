import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/history",   label: "History" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div className="navbar">

      {/* ✅ ONE logo only */}
      <Link to="/" className="navbarLogo">
        <img src="/logo.png" alt="Astro Lens" className="navbarImage" />
        <span>ASTRO LENS</span>
      </Link>

      <div className="navLinks">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navLink ${location.pathname === link.path ? "navLinkActive" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

    </div>
  );
}