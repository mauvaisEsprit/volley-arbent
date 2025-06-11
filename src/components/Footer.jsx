import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTelegram,
} from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import "../styles/componentStyles/Footer.css";
import LogoImage from "./LogoImage";

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault(); // уже на этой странице — просто скроллим вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // иначе NavLink сам сработает
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Liens</h3>
          <ul>
            <li>
              <NavLink to="/faq" onClick={(e) => handleLinkClick(e, "/faq")}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                Contact
              </NavLink>
            </li>
    
            <li>
              <NavLink
                to="/mentions-legales"
                onClick={(e) => handleLinkClick(e, "/mentions-legales")}
              >
                Mentions Légales
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/politique-de-confidentialite"
                onClick={(e) =>
                  handleLinkClick(e, "/politique-de-confidentialite")
                }
              >
                Politique de Confidentialité
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Infos</h3>
          <ul>
            <li>
              <NavLink to="/" onClick={(e) => handleLinkClick(e, "/")}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" onClick={(e) => handleLinkClick(e, "/news")}>
                Actualités
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/planning"
                onClick={(e) => handleLinkClick(e, "/planning")}
              >
                Planning
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={(e) => handleLinkClick(e, "/about")}
              >
                À propos
              </NavLink>
            </li>
            
          </ul>
          <LogoImage />
        </div>

        <div className="footer-column">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
      

      <div className="footer-bottom">
        <p>&copy; 2025 Vladyslav Petrenko. Tous droits reservés</p>
      </div>
    </footer>
  );
}
