import styled, { keyframes } from "styled-components";
import { slideInUp } from "react-animations";

const showUpAnimation = keyframes`${slideInUp}`;
export const TemplateBlock = styled.div`
  background: #222222;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
`;
export const DivideLine = styled.div`
  width: 74px;
  height: 3px;
  background: var(--greenish-teal);
  margin-top: 122px;
  margin-left: 171px;
  margin-bottom: 34px;
`;
export const Title = styled.div`
  font-size: 40px;
  font-family: NanumSquareL;
  color: var(--light-black);
  margin-left: 171px;
  color: white;
`;
export const BoldTitle = styled.div`
  font-size: 40px;
  color: var(--light-black);
  margin-left: 171px;
  color: white;
`;
export const BoldGreenTitle = styled.div`
  font-size: 40px;
  font-family: NanumSquareB;
  color: var(--greenish-teal);
  margin-left: 171px;
`;
export const Row = styled.div`
  display: flex;
  background-color: #222222;
`;
export const Content = styled.div`
  font-size: 18.5px;
  color: #ffffff;
  font-family: NanumSquareL;
  width: 387px;
  margin-left: 171px;
`;
export const StartBtn = styled.button`
  width: 235px;
  height: 52px;
  background: var(--greenish-teal);

  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
  margin-top: 41px;
  border-radius: 25px;
  margin-left: 171px;
  color: #222222;
  font-size: 16px;
  outline: none;

  cursor: pointer;
`;

export const Show1Div = styled.div`
  background-color: #222222
  animation: 1.3s ${showUpAnimation};
`;

export const Show2Div = styled.div`
  background-color: #222222
  animation: 1.8s ${showUpAnimation};
`;
