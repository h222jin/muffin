import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import LogoBlackIcon from "../../../assets/home/Logo_black.png";
import "./navbar.style.css";

const Navbar = () => {
  const history = useHistory();

  const onClickLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("logined_user");
    history.push("/");
  };

  const [newsSearch, setNewsSearch] = useState("");
  const onChangeNewsSearch = (e) => {
    setNewsSearch(e.target.value);
  };

  const searchNews = () => {
    if (newsSearch === "") {
      alert("검색어를 입력하세요");
    } else {
      console.log(newsSearch);
      window.location.assign(`/search/${newsSearch}`);
    }
  };

  return (
    <div className="container">
      <div className="nav-container">
        <Link to="/home">
          <div className="logo-container">
            <img width="129px" height="40px" src={LogoBlackIcon} />
          </div>
        </Link>

        <div className="search_section">
          <input
            placeholder="검색"
            className="search_nav_input"
            value={newsSearch}
            onChange={onChangeNewsSearch}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                searchNews();
              }
            }}
          />
          <button
            style={{ cursor: "pointer" }}
            className="search_nav_button"
            onClick={() => {
              searchNews();
            }}
          >
            <FiSearch className="fisearch" />
          </button>
        </div>

        <div className="btn-container">
          <div className="btn-p">
            <Link to="/mypage">
              <button className="nav-btn">마이페이지</button>
            </Link>
          </div>
          <button className="nav-btn" onClick={onClickLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
