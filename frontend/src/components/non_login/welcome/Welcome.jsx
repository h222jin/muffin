import React from "react";
import { Link } from "react-router-dom";
import MainIcon from "../../../assets/home/home_main.png";
import {
  DivideLine,
  Title,
  BoldTitle,
  BoldGreenTitle,
  Row,
  Content,
  StartBtn,
  Show1Div,
  Show2Div,
  TemplateBlock,
} from "./welcome.style";
import Navbar from "../non_login_navbar/Navbar";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <TemplateBlock>
            <Row style={{ position: "absolute" }}>
              <Show1Div>
                <DivideLine />
                <Title>텍스트 마이닝과 </Title>
                <Title>추천 알고리즘을 활용한</Title>
                <Row>
                  <BoldTitle>경제 미디어 플랫폼,</BoldTitle>
                </Row>
                <Row>
                  <BoldGreenTitle>Muffin</BoldGreenTitle>
                </Row>

                <Content>
                  필요한 정보를 얻기 위해 언제까지 검색하고, 새로고침하고
                  하시나요? 머핀에서는 터치 한 번으로 내가 원하는 정보만 쏙쏙
                  골라 보세요.
                </Content>
                <Link to="/auth/signUp">
                  <StartBtn>Muffin 처음 시작하기</StartBtn>
                </Link>
                <div>
                  <Link to="/auth/signIn">
                    <StartBtn>로그인하러 가기</StartBtn>
                  </Link>
                </div>
              </Show1Div>
              <Show2Div>
                <img
                  width="687px"
                  height="687px"
                  src={MainIcon}
                  style={{ marginTop: "50px" }}
                />
              </Show2Div>
            </Row>
          </TemplateBlock>
        </div>
      </div>
    </>
  );
};

export default Welcome;
