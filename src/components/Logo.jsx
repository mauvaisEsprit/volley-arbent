import { Link } from "react-router-dom";
import '../styles/componentStyles/Logo.css'
import Scatter from "./Scatter";
export default function Logo() {
    const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault(); // уже на этой странице — просто скроллим вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // иначе NavLink сам сработает
  };
    return (
    <div className="logo" to="/">
        <Link to="/" onClick={(e) => handleLinkClick(e, "/")}>
        <Scatter text="Arbent Volley" />
        </Link>  
    </div>
    );
}