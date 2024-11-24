import { HeaderContainer } from "./style";
import logo from '../../assets/logo.svg'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header(){
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer"><Timer size={24} /></NavLink>
        <NavLink to="/history" title="History"><Scroll size={24} /></NavLink>
      </nav>
    </HeaderContainer>
  )
}