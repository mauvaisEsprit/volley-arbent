import { Link, useLocation } from "react-router-dom";
import "../styles/componentStyles/Navbar.css";
import BurgerMenu from "./BurgerMenu";
import ScrollToTop from "./ScrollToTop";
export default function Navbar() {
    const location = useLocation();

    const pages = [
    { path: "/", label: "Accueil" },
    { path: "/news", label: "Actualités" },
    { path: "/about", label: "À propos" },
    { path: "/creneau", label: "Créneau" },
  ];


  return (
     <nav className="nav">
      <div className="nav-container">
        <div className="nav-menu">
          {pages
            .filter((page) => page.path !== location.pathname)
            .map((page) => (
              <div key={page.path} className="nav-item">
                <Link to={page.path}>{page.label}</Link>
              </div>
            ))}
          <div className="nav-item dropdown">
            <button className="dropdown-toggle">Plus</button>
            <div className="dropdown-menu">
              <Link to="/faq">FAQ</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/support">Support</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
      <BurgerMenu />
    </nav>
  );
}








