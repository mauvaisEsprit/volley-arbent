import { Link } from "react-router-dom";
import '../styles/componentStyles/Logo.css'
export default function LogoImage() {
    return (
    <div className="logoImage-container">
        <Link to="/">
        <img 
            className="logoImage" 
            src="https://lh6.googleusercontent.com/LJyv48jbvU5_-wXGmDz_9saAM_46F1mQKGHV0aaRQeJSezkPkSWrGdxab-E5sfWHnWDpRPcf0lsut69OQFANYnKpP6FNxdmN5W8m9kN5ch4D_EmkoHhA_Cmp4QJn30smVcUlKSIXabc=w16383" 
            alt="logo" 
        />
        </Link>
    </div>
    );
}