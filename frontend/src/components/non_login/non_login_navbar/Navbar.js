import React from "react";
import { NavLink, Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import LogoBlackIcon from "../../../assets/home/Logo_black.png";

import "./navbar.style.css";
const active = {
  fontSize: "13.5px",
  fontFamily: "NanumSquareB",
  cursor: "pointer",
  width: "80px",
  height: "33px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  border: "1px solid var(--greenish-teal)",
  borderRadius: "16.5px",
  outline: "none",

  color: "var(--greenish-teal)",
};

const Navbar = () => {
  return (
    <div className="container">
      <div className="nav-container">
        <Link to="/">
          <div className="logo-container">
            <img width="129px" height="40px" src={LogoBlackIcon} />
          </div>
        </Link>

        <div className="btn-container">
          <div className="btn-p">
            <Link to="/auth/signIn">
              <button className="nav-btn">로그인</button>
            </Link>
          </div>
          <Link to="/auth/signUp">
            <button className="nav-btn">회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
