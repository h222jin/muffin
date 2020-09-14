import React, { useState, useEffect } from "react";
import "./newsList.style.css";
import { Link } from "react-router-dom";
import Navbar from "../logined_navbar/Navbar";
import Menu from "../menu/Menu";
import axios from "axios";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const showDetail = () => {};

  const [pageArr, setPageArr] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(1);

  const clickNext = () => {
    getAll(pageArr[0] + 5, range + 1);
  };
  const clickPrev = () => {
    getAll(pageArr[0] - 1, range - 1);
  };
  const getAll = (page, range) => {
    setPage(page);
    setRange(range);
    setPageArr([]);
    setNewsList([]);
    axios
      .get(`http://localhost:8080/news/pagination/${page}/${range}`)
      .then((response) => {
        console.log(response.data);
        response.data.list.map((item) => {
          setNewsList((newsList) => [...newsList, item]);
        });
        let i = 0;
        const startPage = response.data.pagination.startPage;
        const endPage = response.data.pagination.endPage;
        if (
          response.data.pagination.pageCnt <
          startPage + response.data.pagination.rangeSize
        ) {
          for (i; i < response.data.pagination.pageCnt - startPage + 1; i++)
            setPageArr((pageArr) => [...pageArr, startPage + i]);
        } else {
          for (i; i < response.data.pagination.rangeSize; i++)
            setPageArr((pageArr) => [...pageArr, startPage + i]);
        }
        setPrev(response.data.pagination.prev);
        setNext(response.data.pagination.next);
      })
      .catch((error) => console.log("error"));
  };
  useEffect(() => {
    getAll(1, 1);
  }, []);

  /* useEffect(()=>{
     axios.get(`${url}/news/getList`)
       .then((response)=>{
         console.log('여기예요')
         setNewsList(response.data)
       })
       .catch((error)=>{
         console.log(`try to effect`)
         throw error
       })
   },[])
*/

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />
          <div>
            <div className="documentroom_container">
              <div className="documentroom_text"></div>
              <div className="news_table">
                {newsList.map((item) => (
                  <ul className="news-ul">
                    <li className="news-li">
                      <ul className="news-row-list">
                        <li className="post-row-list-item1">
                          <img
                            className="thumbnail-style"
                            src={item.newsThumbnail}
                            alt="media"
                            key={item.newsTitle}
                          />
                        </li>
                        <li>
                          <Link to={`/news/detail/${item.newsId}`}>
                            <div
                              className="news_title_div link"
                              onClick={() => {
                                showDetail(item.newsTitle);
                              }}
                            >
                              {item.newsTitle}
                            </div>
                          </Link>
                        </li>
                        <li>
                          <div className="news_regdate_div">
                            {item.newsRegDate}
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ))}
              </div>

              <div className="pagination-div">
                <div className="pagination">
                  {prev && (
                    <div className="page_button" id="prev" onClick={clickPrev}>
                      이전
                    </div>
                  )}

                  {pageArr.map((pagenum) => (
                    <div
                      className="page_button"
                      key={pagenum}
                      onClick={() => {
                        getAll(pagenum, range);
                      }}
                    >
                      {pagenum}
                    </div>
                  ))}

                  {next && (
                    <div className="page_button" id="next" onClick={clickNext}>
                      다음
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsList;
