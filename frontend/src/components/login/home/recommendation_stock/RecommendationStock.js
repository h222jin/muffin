import React, { useEffect, useState } from "react";
import "./recommendation_stock.style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const RecommendationStock = () => {
  const url = "http://localhost:8080/investProfile";

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/findOne/${user.userId}`)
      .then((response) => {
        console.log(
          `${response.data.investmentPeriod}, ${response.data.investmentPropensity}`
        );
        python(
          response.data.investmentPeriod,
          response.data.investmentPropensity
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const python = (investmentPeriod, investmentPropensity) => {
    axios
      .get(
        `http://127.0.0.1:5000/recommendation/${investmentPeriod}/${investmentPropensity}`
      )
      .then((res) => {
        const stock1 = {
          종목명: res.data.종목명[0],
          현재가: res.data.현재가[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일대비: res.data.전일대비[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일비: res.data.전일비[0],
          redofblue: res.data.전일비[0].includes("-") ? "down" : "up",
          종목코드: res.data.종목코드[0],
        };
        const stock2 = {
          종목명: res.data.종목명[1],
          현재가: res.data.현재가[1].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일대비: res.data.전일대비[1].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일비: res.data.전일비[1],
          redofblue: res.data.전일비[1].includes("-") ? "down" : "up",
          종목코드: res.data.종목코드[1],
        };
        const stock3 = {
          종목명: res.data.종목명[2],
          현재가: res.data.현재가[2].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일대비: res.data.전일대비[2].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일비: res.data.전일비[2],
          redofblue: res.data.전일비[2].includes("-") ? "down" : "up",
          종목코드: res.data.종목코드[2],
        };
        const stock4 = {
          종목명: res.data.종목명[3],
          현재가: res.data.현재가[3].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일대비: res.data.전일대비[3].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일비: res.data.전일비[3],
          redofblue: res.data.전일비[3].includes("-") ? "down" : "up",
          종목코드: res.data.종목코드[3],
        };
        const stock5 = {
          종목명: res.data.종목명[4],
          현재가: res.data.현재가[4].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일대비: res.data.전일대비[4].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          전일비: res.data.전일비[4],
          redofblue: res.data.전일비[4].includes("-") ? "down" : "up",
          종목코드: res.data.종목코드[4],
        };
        setStocks([stock1, stock2, stock3, stock4, stock5]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="recommendation_stock_container1">
      {stocks.map((stock) => (
        <div className="stock_detail_section_01" key={stock.index}>
          <Link to={`/stock/detail/${stock.종목코드}`}>
            <div className="stock_title_section">{stock.종목명}</div>
          </Link>
          <div className={stock.redofblue}>
            <div className="stock_column_section">{stock.현재가}</div>
            <div className="stock_column_section">{stock.전일대비}</div>
            <div className="stock_column_section">{stock.전일비}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationStock;
