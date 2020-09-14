import React, { useState } from "react";
import Navbar from "../../../logined_navbar/Navbar";
import Menu from "../../../menu/Menu";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Withdrawal = () => {
  const url = "http://localhost:8080/users";
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChangePassword = (e) => setPassword(e.target.value);

  const onsubmit = (e) => {
    e.preventDefault();
    if (password !== "") {
      if (password === user.password) {
        axios
          .post(`${url}/delete`, user)
          .then((response) => {
            sessionStorage.clear();
            alert("회원 탈퇴가 완료 되었습니다.");
            history.push("/");
          })
          .catch((error) => {
            console.log("실패");
          });
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />
          <div className="authCheck_container">
            <div className="authCheck_texts_div">
              <div className="authCheck_text">회원 탈퇴</div>

              <div className="authCheck_texts_div">
                <div className="authCheck_texts">
                  탈퇴 시, 모든 정보를 삭제하며,
                </div>
                <div className="authCheck_texts">
                  재가입하더라도 복구할 수 없습니다.
                </div>
                <div className="invest_text" style={{ marginTop: "50px" }}>
                  그래도 탈퇴를 원하신다면 비밀번호 입력 후 <br />
                  아래 버튼을 눌러주세요.
                </div>
                <div className="inner-container2">
                  <div className="login-container">
                    <div className="input-group2">
                      <div className="label-div">
                        <div className="label">아이디 </div>
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          paddingLeft: "10px",
                          paddingTop: "3px",
                        }}
                      >
                        {user.emailId}
                      </div>
                    </div>

                    <div className="input-group2">
                      <div className="label-div">
                        <div className="label">비밀번호 </div>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="login-input"
                        placeholder="영문 및 숫자를 포함하여 8자 이상으로 입력하세요."
                        onChange={onChangePassword}
                      />
                    </div>
                  </div>
                </div>
                <button className="start_cameleon" onClick={onsubmit}>
                  회원 탈퇴하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
