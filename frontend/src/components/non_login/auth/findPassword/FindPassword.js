import React, { useState } from "react";
import Navbar from "../../non_login_navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const FindPassword = () => {
  const url = "http://localhost:8080/users";
  var emailIdJ = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const [emailId, setEmailId] = useState("");
  const [checkId, setCheckId] = useState("");
  const history = useHistory();

  const onChangeEmailId = (e) => setEmailId(e.target.value);

  const onBlurEmail = (e) => {
    e.preventDefault();
    console.log(emailId);

    if (emailIdJ.test(emailId)) {
      axios
        .get(url + `/idCheck/${emailId}`)
        .then((respose) => {
          console.log(respose.data);

          if (respose.data) {
            setCheckId("");
          } else {
            setCheckId("해당 이메일은 등록되어 있지 않은 계정입니다.");
          }
        })
        .catch((error) => {
          console.log("실패");
        });
    } else {
      setCheckId("이메일을 확인해주세요.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(emailId);

    if (checkId === "") {
      axios
        .get(`${url}/findPassword/${emailId}`)
        .then((response) => {
          alert("해당 이메일로 임시 비밀번호를 발급해드렸습니다.");
          history.push("/");
        })
        .catch((error) => {
          console.log("실패");
        });
    } else {
      alert("잘못 입력한 항목이 있습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <div className="inner-container2">
            <div className="login-container">
              <div className="header2">비밀번호 찾기</div>

              <div className="input-group2">
                <div className="label-div">
                  <div className="label">아이디 </div>
                </div>

                <input
                  type="text"
                  name="emailId"
                  className="login-input"
                  placeholder="이메일 형태의 아이디를 입력하세요."
                  onChange={onChangeEmailId}
                  onBlur={onBlurEmail}
                />
                <div
                  style={{
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "5px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  name="id_check"
                >
                  {checkId}
                </div>
              </div>

              <button className="join-btn" onClick={onSubmit}>
                확 인
              </button>
              <Link to="/auth/signIn">
                <button className="withdrawal-btn">취소하기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPassword;
