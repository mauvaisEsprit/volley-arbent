import { Link } from "react-router-dom";
import '../styles/componentStyles/Logo.css'
import Logotype from '../assets/ArbentLogo.png'
export default function LogoImage() {
    return (
    <div className="logoImage-container">
        <Link to="/">
        <img 
            className="logoImage" 
            src={Logotype}
            alt="logo" 
        />
        </Link>
    </div>
    );
}