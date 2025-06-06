import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import LogoImage from "../components/LogoImage";
import BurgerMenu from "../components/BurgerMenu";
import "../styles/componentStyles/Header.css";
import Navbar from "./Navbar";

export default function Header() {

  return (
    <header>
      <div class="header-left">
        <LogoImage />
      </div>
      <div class="header-center">
        <Logo />
      </div>
      <div class="header-right">
        <Navbar />
      </div>     
    </header>
  );
}
