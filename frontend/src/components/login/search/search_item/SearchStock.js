import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../search_item/searchStock.style.css";

const SearchStock = ({ keyword }) => {
  const [crawledStock, setCrawledStock] = useState([]);
  const showDetail = () => {};

  const linkToDetail = (e) => {
    e.preventDefault();
  };
  const getAll = () => {
    axios
      .get(`http://localhost:8080/stocks/search/${keyword}`)
      .then((response) => {
        console.log(response.data.list);
        response.data.list.map((item) => {
          setCrawledStock((crawledStock) => [...crawledStock, item]);
        });
      })
      .catch((error) => {
        throw error;
      });
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <div className="search-div-style">
        {crawledStock.map((item) => (
          <span className="stock-search-section">
            <Link to={`/stock/detail/${item.symbol}`}>
              <span
                onClick={() => {
                  showDetail(item.stockName);
                }}
                className="stock-tag-button"
              >
                #{item.stockName}
              </span>{" "}
            </Link>
          </span>
        ))}
      </div>
    </>
  );
};

export default SearchStock;
