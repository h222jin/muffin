import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./search.style.css";
import Navbar from "../../login/logined_navbar/Navbar";
import Menu from "../../login/menu/Menu";
import axios from "axios";
import "./search_item/SearchNews";
import SearchNews from "./search_item/SearchNews";
import SearchStock from "./search_item/SearchStock";

const Search = ({ match }) => {
  console.log(match.params.newsSearch);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <Menu />
        <div>
          <div classname="search-partition">
            <SearchStock keyword={match.params.newsSearch} />
            <br />
            <SearchNews keyword={match.params.newsSearch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
