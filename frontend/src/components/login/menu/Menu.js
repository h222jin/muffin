import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.style.css";

const active = {
  marginTop: "25px",
  width: "100%",
  height: "53px",
  color: "var(--greenish-teal)",
  fontSize: "22px",
  fontFamily: "NanumSquareEB",
  textAlign: "center",
  textDecoration: "none",
  borderLeft: "5px solid var(--greenish-teal)",
};

const Menu = () => {
  return (
    <div>
      <div className="menu-container">
        <NavLink className="link-list" to="/home" activeStyle={active}>
          홈
        </NavLink>
        <NavLink className="link-list" activeStyle={active} to="/news">
          뉴스
        </NavLink>
        <NavLink className="link-list" activeStyle={active} to="/stocklist">
          투자
        </NavLink>
        <NavLink className="link-list" activeStyle={active} to="/portfolio">
          포트폴리오
        </NavLink>
        <NavLink className="link-list" activeStyle={active} to="/opinion">
          오피니언
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
