import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Dashboard", match: ["/", "/dashboard"] },
    { path: "/analysis", label: "Analysis" },
    { path: "/history", label: "History" },
    { path: "/compare", label: "Comparison", matchPrefix: "/compare" },
  ];

  return (
    <div className="navbar">

      {/* ✅ ONE logo only */}
      <Link to="/" className="navbarLogo">
        <img src="/logo.png" alt="Astro Lens" className="navbarImage" />
        <span>ASTRO LENS</span>
      </Link>

      <div className="navLinks">
        {navLinks.map((link) => {
          const isActive =
            link.match?.includes(location.pathname) ||
            location.pathname === link.path ||
            (link.matchPrefix && location.pathname.startsWith(link.matchPrefix));

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`navLink ${isActive ? "navLinkActive" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
