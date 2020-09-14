import React, { useState, useEffect } from "react";
import axios from "axios";
import "./totalbudget.style.css";

const TotalBudget = () => {
  const [userAsset, setUserAsset] = useState(0);
  const [userProfit, setUserProfit] = useState(0);
  const [userProfitRatio, setUserProfitRatio] = useState(0);
  const [plusOrMinus, setPlusOrMinus] = useState("blue");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/assets/myAsset/${
          JSON.parse(sessionStorage.getItem("logined_user")).userId
        }`
      )
      .then((response) => {
        setUserAsset(response.data.totalAsset);
        setUserProfit(response.data.profitLoss);
        setUserProfitRatio(response.data.profitRatio);
        if (response.data.profitLoss > 0) {
          setPlusOrMinus("red");
        } else if (response.data.profitLoss === 0) {
          setPlusOrMinus("black");
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <>
      <tr>
        <td style={{ paddingRight: "30px" }}>
          <div className="my_totlabudget_title"> 내 자산총액</div>
          <div className="my_totlabudget_money">
            {String(userAsset).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </div>
        </td>
        <td style={{ paddingRight: "30px" }}>
          <div className="my_totlabudget_title">평가 수익률</div>
          <span className="my_totlabudget_money" style={{ color: "#ea5455" }}>
            <span className={plusOrMinus}>
              {String(userProfitRatio).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </span>
          <span className="my_totlabudget_money"> %</span>
        </td>
        <td style={{ paddingRight: "30px" }}>
          <div className="my_totlabudget_title">평가 손익</div>
          <span className="my_totlabudget_money" style={{ color: "#ea5455" }}>
            <span className={plusOrMinus}>
              {String(userProfit).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </span>
          <span className="my_totlabudget_money"> 원</span>
        </td>
      </tr>
    </>
  );
};

export default TotalBudget;
