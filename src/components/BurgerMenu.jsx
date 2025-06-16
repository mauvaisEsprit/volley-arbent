import "../styles/componentStyles/BurgerMenu.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoImage from "./LogoImage";


export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault(); // уже на этой странице — просто скроллим вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // иначе NavLink сам сработает
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="burger-wrapper">
      {!isOpen && (
        <div className="burger-icon" onClick={toggleMenu}>
          <div className={`line ${isOpen ? "line1" : ""}`}></div>
          <div className={`line ${isOpen ? "line2" : ""}`}></div>
          <div className={`line ${isOpen ? "line3" : ""}`}></div>
        </div>
      )}
      {isOpen && (
        <div className="fullscreen-menu open" onClick={toggleMenu}>
          <div className="logoBurger">Arbent Volley</div>
          {/* Внутренний контейнер, который НЕ закрывает меню при клике */}
          <div className="menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="close-icon" onClick={toggleMenu}>
              <span></span>
              <span></span>
            </div>

            <nav>
              <Link to="/" onClick={(e) => 
                {
                  toggleMenu();
                  handleLinkClick(e, "/");}}>
                Accueil
              </Link>
              <Link to="/news" onClick={(e) => 
                {
                  toggleMenu();
                  handleLinkClick(e, "/news");}}>
                Actualités
              </Link>
              <Link to="/about" onClick={(e) => 
                {
                  toggleMenu();
                  handleLinkClick(e, "/about");}}>
                À propos
              </Link>
              <Link to="/contact" onClick={(e) =>
                {
                  toggleMenu();
                  handleLinkClick(e, "/contact");}}>
                Contact
              </Link>
              <Link to="/planning" onClick={(e) => 
                {
                  toggleMenu();
                  handleLinkClick(e, "/planning");}}>
                Planning
              </Link>
              <Link to="/inscription" onClick={(e) => 
                {
                  toggleMenu();
                  handleLinkClick(e, "/inscription");}}>
                Inscription
              </Link>
              <Link to="/login" onClick={(e) => 
                {
                  toggleMenu();
                  handleLinkClick(e, "/login");}}>
                Login
              </Link>
            </nav>
            <LogoImage />
          </div>
        </div>
      )}
    </div>
  );
}
