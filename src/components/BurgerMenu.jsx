import "../styles/componentStyles/BurgerMenu.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoImage from "./LogoImage";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

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
              <Link to="/" onClick={toggleMenu}>
                Accueil
              </Link>
              <Link to="/news" onClick={toggleMenu}>
                Actualités
              </Link>
              <Link to="/about" onClick={toggleMenu}>
                À propos
              </Link>
              <Link to="/creneau" onClick={toggleMenu}>
                Creneau
              </Link>
              <Link to="/login" onClick={toggleMenu}>
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
