import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const InvestProfile = () => {
  const url = "http://localhost:8080/investProfile";
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [investmentPropensity, setInvestmentPropensity] = useState("");
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );
  const history = useHistory();

  useEffect(() => {
    console.log(user);
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    console.log(
      `투자스타일 : ${investmentPeriod}, 투자성향 : ${investmentPropensity}`
    );
    const investProfile = {
      investmentPeriod: investmentPeriod,
      investmentPropensity: investmentPropensity,
      user: user,
    };
    if (investmentPropensity !== "" && investmentPeriod !== "") {
      axios
        .post(`${url}/update`, investProfile)
        .then(alert("수정이 완료되었습니다."), history.push("/home"))
        .catch((error) => {
          console.log("실패");
        });
    } else {
      alert("선택되지 않은 항목이 있습니다.");
    }
  };

  return (
    <div className="authCheck_container">
      <div className="authCheck_texts_div">
        <div className="invest_text">투자스타일을 선택해주세요.</div>
        <div className="authCheck_num_div">
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_style"
              onClick={() => setInvestmentPeriod("단기")}
            />
            <span className="auth_span"> </span>
            <span>단기(1개월~6개월)</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_style"
              onClick={() => setInvestmentPeriod("중기")}
            />
            <span className="auth_span"> </span>
            <span>중기(6개월~1년)</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_style"
              onClick={() => setInvestmentPeriod("중장기")}
            />
            <span className="auth_span"> </span>
            <span>중장기(1년~3년)</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_style"
              onClick={() => setInvestmentPeriod("장기")}
            />
            <span className="auth_span"> </span>
            <span>장기(3년↑)</span>
          </span>
        </div>
      </div>
      <div className="authCheck_texts_div">
        <div className="invest_text">투자성향을 선택해주세요.</div>
        <div className="authCheck_num_div">
          <span className="auth_container">
            <input
              type="radio"
              value="0"
              name="invest_character"
              onClick={() => setInvestmentPropensity("공격투자형")}
            />
            <span className="auth_span"> </span>
            <span>공격투자형</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_character"
              onClick={() => setInvestmentPropensity("적극투자형")}
            />
            <span className="auth_span"> </span>
            <span>적극투자형</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_character"
              onClick={() => setInvestmentPropensity("위험중립형")}
            />
            <span className="auth_span"> </span>
            <span>위험중립형</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_character"
              onClick={() => setInvestmentPropensity("안정추구형")}
            />
            <span className="auth_span"> </span>
            <span>안정추구형</span>
          </span>
          <span className="auth_container">
            <input
              type="radio"
              value="1"
              name="invest_character"
              onClick={() => setInvestmentPropensity("안정형")}
            />
            <span className="auth_span"> </span>
            <span>안정형</span>
          </span>
        </div>
      </div>
      <button className="start_cameleon" onClick={onClick}>
        수정하기
      </button>
    </div>
  );
};

export default InvestProfile;
