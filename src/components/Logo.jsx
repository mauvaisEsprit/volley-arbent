import { Link } from "react-router-dom";
import '../styles/componentStyles/Logo.css'
import Scatter from "./Scatter";
export default function Logo() {
    return (
    <div className="logo" to="/">
        <Link to="/">
        <Scatter text="Arbent Volley" />
        </Link>  
    </div>
    );
}