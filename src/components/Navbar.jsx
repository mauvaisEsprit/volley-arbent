import { Link, useLocation } from "react-router-dom";
import "../styles/componentStyles/Navbar.css";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  const location = useLocation();

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault(); // уже на этой странице — просто скроллим вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // иначе NavLink сам сработает
  };

  const pages = [
    { path: "/", label: "Accueil" },
    { path: "/news", label: "Actualités" },
    { path: "/about", label: "À propos" },
    { path: "/planning", label: "Planning" },
  ];

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-menu">
          {pages
            .filter((page) => page.path !== location.pathname)
            .map((page) => (
              <div key={page.path} className="nav-item">
                <Link
                  to={page.path}
                  onClick={(e) => handleLinkClick(e, page.path)}
                >
                  {page.label}
                </Link>
              </div>
            ))}

          <div className="nav-item dropdown">
            <button className="dropdown-toggle">Plus</button>
            <div className="dropdown-menu">
              <Link to="/faq" onClick={(e) => handleLinkClick(e, "/faq")}>
                FAQ
              </Link>
              <Link
                to="/contact"
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                Contact
              </Link>
              <Link
                to="/mentions-legales"
                onClick={(e) => handleLinkClick(e, "/mentions-legales")}
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-de-confidentialite"
                onClick={(e) =>
                  handleLinkClick(e, "/politique-de-confidentialite")
                }
              >
                Politique de confidentialité
              </Link>
              <Link to="/inscription" onClick={(e) => handleLinkClick(e, "/inscription")}>
                Inscription
              </Link>

              <Link to="/tarifs" onClick={(e) => handleLinkClick(e, "/tarifs")}>
                Tarifs
              </Link>

              <Link to="/login" onClick={(e) => handleLinkClick(e, "/login")}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </nav>
  );
}
