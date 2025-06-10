import { Link } from "react-router-dom";
import '../styles/componentStyles/Logo.css'
import Logotype from '../assets/ArbentLogo.png'
export default function LogoImage() {
    const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault(); // уже на этой странице — просто скроллим вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // иначе NavLink сам сработает
  };
    return (
    <div className="logoImage-container">
        <Link to="/" onClick={(e) => handleLinkClick(e, "/")}>
        <img 
            className="logoImage" 
            src={Logotype}
            alt="logo" 
        />
        </Link>
    </div>
    );
}