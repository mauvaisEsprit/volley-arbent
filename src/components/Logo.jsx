import { Link } from "react-router-dom";
import '../styles/componentStyles/Logo.css'
export default function Logo() {
    return (
    <div className="logo" to="/">
        <Link to="/">Arbent Volley</Link>  
    </div>
    );
}