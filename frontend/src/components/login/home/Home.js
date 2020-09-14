import React from "react";
import "./home.style.css";
import { Link } from "react-router-dom";
import WordCanvas from "./wordcanvas/WordCanvas";
import Recent_News from "./recent_news/Recent_News";
import Asset from "./asset/Asset";
import Recent_Opinion from "./recent_opinion/Recent_Opinion";
import RecommendationStock from "./recommendation_stock/RecommendationStock";
import { Navbar } from "../logined_navbar";
import Menu from "../menu/Menu";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main_container">
        <div className="wrapper">
          <Menu />
          <div className="home_container">
            <div className="recent_news_container">
              <div className="recent_news_section">
                <div className="title_section">
                  <div className="documentroom_text">최신 뉴스</div>
                  <Link to="/news" className="more">
                    <span>더보기 ▶</span>
                  </Link>
                </div>
                <div className="newsList">
                  <Recent_News />
                </div>
              </div>
              <div className="keyword_wordcloud">
                <div className="title_section">
                  <div className="documentroom_text">핫이슈 키워드</div>
                </div>
                <div className="wordcloud">
                  <WordCanvas />
                </div>
              </div>
            </div>
            <div className="other_container">
              <div className="asset_section">
                <div className="title_section">
                  <div className="documentroom_text">자산 현황</div>
                  <Link to="/portfolio" className="more_2">
                    <span>더보기 ▶</span>
                  </Link>
                </div>
                <div>
                  <Asset />
                </div>
              </div>
              <div className="stock_section">
                <div className="title_section">
                  <div className="documentroom_text">추천 종목</div>
                </div>
                <div>
                  <RecommendationStock />
                </div>
              </div>
              <div className="opinion_section">
                <div className="title_section">
                  <div className="documentroom_text">최신 오피니언</div>
                  <Link to="/opinion" className="more_3">
                    <span>더보기 ▶</span>
                  </Link>
                </div>
                <div>
                  <Recent_Opinion />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
