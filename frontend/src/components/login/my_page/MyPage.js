import React, { useState } from "react";
import InvestProfile from "./invest_profile/InvestProfile";
import AccountSetting from "./account_setting/AccountSetting";
import MyOpinion from "./my_opinion/MyOpinion";
import MyComment from "./my_comment/MyComment";
import "./mypage.style.css";
import Navbar from "../logined_navbar/Navbar";
import Menu from "../menu/Menu";

const content = [
  { title: "개인정보변경", content: <AccountSetting /> },
  { title: "투자프로필변경", content: <InvestProfile /> },
  { title: "작성글", content: <MyOpinion /> },
  { title: "작성댓글", content: <MyComment /> },
];

const useTabs = (initialTabs, allTabs) => {
  const [contentIndex, setContentIndex] = useState(initialTabs);
  return {
    contentItem: allTabs[contentIndex],
    contentChange: setContentIndex,
  };
};

const MyPage = () => {
  const { contentItem, contentChange } = useTabs(0, content);

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />
          <div>
            <div className="documentroom_container">
              <div className="documentroom_text">마이페이지</div>
              <div className="tab_container">
                {content.map((section, index) => (
                  <button
                    onClick={() => contentChange(index)}
                    className="link-list-tab"
                  >
                    {section.title}
                  </button>
                ))}
              </div>

              <div className="tab_content_container">{contentItem.content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
