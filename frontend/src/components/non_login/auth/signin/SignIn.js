import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  SignInContainer,
  LoginContainer,
  SignInHeader,
  InputGroup,
  Row,
  Label,
  InputBorder,
  LoginInput,
  LoginLinkContainer,
  OriginLoginBtn,
  Buttons,
  ImgBtnContainer,
  OtherLoginBtn,
} from "./signin.style";
import Navbar from "../../non_login_navbar/Navbar";

const SignIn = () => {
  const url = "http://localhost:8080/users";
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChangeEmailId = (e) => setEmailId(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onClickLogin = (e) => {
    e.preventDefault();
    if (emailId !== "" && password !== "") {
      console.log(`emailId : ${emailId}, password : ${password}`);
      const user = {
        emailId: emailId,
        password: password,
      };
      axios
        .post(`${url}/signIn`, user)
        .then((response) => {
          sessionStorage.setItem("logined_user", JSON.stringify(response.data));
          history.push("/home");
        })
        .catch((error) => {
          console.log(error);
          alert("아이디 또는 비밀번호를 확인해주세요.");
          window.location.reload();
        });
    } else {
      alert("입력하지않은 항목이 있습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <SignInContainer>
            <LoginContainer>
              <SignInHeader>로그인</SignInHeader>
              <InputGroup>
                <Row>
                  <Label>아이디</Label>
                </Row>
                <InputBorder>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="이메일 형식의 아이디를 입력해주세요"
                    onChange={onChangeEmailId}
                  />
                </InputBorder>
              </InputGroup>

              <InputGroup>
                <Row>
                  <Label>비밀번호</Label>
                </Row>
                <InputBorder>
                  <LoginInput
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    onChange={onChangePassword}
                  />
                </InputBorder>
              </InputGroup>

              <LoginLinkContainer>
                <OriginLoginBtn onClick={onClickLogin}>로그인</OriginLoginBtn>
              </LoginLinkContainer>
              <Buttons>
                <Link to="/auth/findPassword">
                  <ImgBtnContainer>
                    <OtherLoginBtn>비밀번호 찾기</OtherLoginBtn>
                  </ImgBtnContainer>
                </Link>
              </Buttons>
            </LoginContainer>
          </SignInContainer>
        </div>
      </div>
    </>
  );
};

export default SignIn;
