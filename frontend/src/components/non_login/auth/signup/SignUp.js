import React, { useState } from "react";
import "./signup.style.css";
import Navbar from "../../non_login_navbar/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const url = "http://localhost:8080/users";

  var emailIdJ = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var passwordJ = /^[A-Za-z0-9]{8,30}$/;
  var nameJ = /^[가-힣]{2,6}$/;

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkName, setCheckName] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkId, setCheckId] = useState("");
  const history = useHistory();

  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmailId = (e) => setEmailId(e.target.value);
  const onChangeNickname = (e) => setNickname(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onBlurName = (e) => {
    e.preventDefault();
    console.log(name);
    if (nameJ.test(name)) {
      console.log(nameJ.test(name));
      setCheckName("");
    } else {
      setCheckName("이름을 확인해주세요.");
    }
  };

  const onBlurEmail = (e) => {
    e.preventDefault();
    console.log(emailId);

    if (emailIdJ.test(emailId)) {
      axios
        .get(url + `/idCheck/${emailId}`)
        .then((respose) => {
          console.log(respose.data);

          if (respose.data) {
            setCheckId("사용 중인 아이디입니다.");
          } else {
            setCheckId("");
          }
        })
        .catch((error) => {
          console.log("실패");
        });
    } else {
      setCheckId("이메일을 확인해주세요.");
    }
  };

  const onBlurPassword = (e) => {
    e.preventDefault();
    if (passwordJ.test(password)) {
      console.log(passwordJ.test(password));
      setCheckPassword("");
    } else {
      setCheckPassword("영문 및 숫자를 포함하여 8자 이상으로 입력하세요.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      emailId: emailId,
      name: name,
      password: password,
      nickname: nickname === "" ? name : nickname,
    };
    console.log(
      `emailId: ${user.emailId}, name: ${user.name}, password: ${user.password}, nickname: ${user.nickname}`
    );
    if (checkName === "" && checkPassword === "" && checkId === "") {
      axios
        .post(`${url}/signUp`, user)
        .then((response) => {
          sessionStorage.setItem("logined_user", JSON.stringify(response.data));
          history.push("/auth/investProfile");
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
              <div className="header2">회원가입</div>
              <div className="input-group2">
                <div className="label-div">
                  <div className="label">이름</div>
                  <div className="star">*</div>
                  <div className="green-message">
                    * 문항은 필수 입력사항입니다
                  </div>
                </div>
                <input
                  type="text"
                  name="name"
                  className="login-input"
                  placeholder="이름을 입력하세요."
                  onChange={onChangeName}
                  onBlur={onBlurName}
                />
                <div
                  style={{
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "5px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  name="name_check"
                >
                  {checkName}
                </div>
              </div>

              <div className="input-group2">
                <div className="label-div">
                  <div className="label">아이디 </div>
                  <div className="star">*</div>
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

              <div className="input-group2">
                <div className="label-div">
                  <div className="label">닉네임 </div>
                </div>

                <input
                  type="text"
                  name="nickname"
                  className="login-input"
                  placeholder="다른 사용자에게 보일 닉네임을 입력하세요."
                  onChange={onChangeNickname}
                />
              </div>

              <div className="input-group2">
                <div className="label-div">
                  <div className="label">비밀번호 </div>
                  <div className="star">*</div>
                </div>
                <input
                  type="password"
                  name="password"
                  className="login-input"
                  placeholder="영문 및 숫자를 포함하여 8자 이상으로 입력하세요."
                  onChange={onChangePassword}
                  onBlur={onBlurPassword}
                />
                <div
                  style={{
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "5px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  name="password_check"
                >
                  {checkPassword}
                </div>
              </div>

              <button className="join-btn" onClick={onSubmit}>
                가입하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
