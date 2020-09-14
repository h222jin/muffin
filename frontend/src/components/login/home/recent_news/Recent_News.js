import React, { useState, useEffect } from "react";
import axios from "axios";
import "./recent_news.style.css";
import { Link } from "react-router-dom";

const Recent_News = () => {
  const [newsList, setNewsList] = useState([]);
  const url = "http://localhost:8080";
  const showDetail = () => {};
  useEffect(() => {
    axios
      .get(`${url}/news/getList`)
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        console.log(`try to effect`);
        throw error;
      });
  }, []);

  return (
    <>
      <div className="recent_container">
        {newsList.map((item) => (
          <div className="test" key={item.newsId}>
            <div className="news_title_section">
              <div className="news_title">
                <Link to={`/news/detail/${item.newsId}`} className="link">
                  <div
                    className="news_title_style"
                    onClick={() => {
                      showDetail(item.newsTitle);
                    }}
                  >
                    {item.newsTitle}
                  </div>
                </Link>
              </div>
              <div className="news_regdate">{item.newsRegDate}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Recent_News;
