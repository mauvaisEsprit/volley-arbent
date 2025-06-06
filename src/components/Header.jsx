import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import LogoImage from "../components/LogoImage";
import BurgerMenu from "../components/BurgerMenu";
import "../styles/componentStyles/Header.css";
import Navbar from "./Navbar";

export default function Header() {

  return (
    <header>
        <LogoImage />
        <Logo />
        <Navbar />     
    </header>
  );
}
