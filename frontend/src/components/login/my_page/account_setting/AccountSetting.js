import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const AccountSetting = () => {
  const url = "http://localhost:8080/users";
  var passwordJ = /^[A-Za-z0-9]{8,30}$/;

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );
  const [userId, setId] = useState(user.userId);
  const [name, setName] = useState(user.name);
  const [emailId, setEmailId] = useState(user.emailId);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const history = useHistory();

  const onChangeNickname = (e) => setNickname(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onBlurPassword = (e) => {
    e.preventDefault();
    if (passwordJ.test(password)) {
      console.log(passwordJ.test(password));
      setCheckPassword("");
    } else {
      setCheckPassword("영문 및 숫자를 포함하여 8자 이상으로 입력하세요.");
    }
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    const postUser = {
      userId: userId,
      password: password,
      nickname: nickname,
    };
    if (checkPassword === "") {
      axios
        .post(`${url}/update`, postUser)
        .then((response) => {
          sessionStorage.removeItem("logined_user");
          sessionStorage.setItem("logined_user", JSON.stringify(response.data));
          alert("수정이 완료되었습니다.");
          history.push("/home");
        })
        .catch((error) => {
          console.log("실패");
        });
    } else {
      alert("잘못 입력한 항목이 있습니다. ");
    }
  };

  return (
    <div>
      <div className="inner-container2">
        <div className="login-container">
          <div className="input-group2">
            <div className="label-div">
              <div className="label">이름</div>
            </div>
            <div
              style={{
                fontSize: "14px",
                paddingLeft: "10px",
                paddingTop: "3px",
              }}
            >
              {user.name}
            </div>
          </div>

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
              <div className="label">닉네임 </div>
            </div>

            <input
              type="text"
              name="email"
              className="login-input"
              placeholder={user.nickname}
              onChange={onChangeNickname}
            />
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
          <button className="join-btn" onClick={onClickUpdate}>
            수정하기
          </button>
          <Link to="/withdrawal">
            <button className="withdrawal-btn">회원탈퇴</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
