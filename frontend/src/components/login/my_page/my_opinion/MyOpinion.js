import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./myOpinion.style.css";
import axios from "axios";

const MyOpinion = () => {
  const url = "http://localhost:8080/boards";
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );
  const [boardArr, setBoardArr] = useState([]);
  const [pageArr, setPageArr] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(1);
  const history = useHistory();

  const clickNext = () => {
    getMyBoardAll(pageArr[0] + 5, range + 1);
  };

  const clickPrev = () => {
    getMyBoardAll(pageArr[0] - 1, range - 1);
  };

  const getMyBoardAll = (page, range) => {
    setPage(page);
    setRange(range);
    setPageArr([]);
    setBoardArr([]);
    axios
      .post(`${url}/myBoard/${page}/${range}`, user)
      .then((response) => {
        console.log(response.data);
        response.data.list.map((item) => {
          setBoardArr((boardArr) => [...boardArr, item]);
        });
        let i = 0;
        const startPage = response.data.pagination.startPage;
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
      .catch((err) => console.log("실패"));
  };

  useEffect(() => {
    getMyBoardAll(1, 1);
  }, []);

  return (
    <div>
      <div className="documentroom_container">
        <div className="documentroom_table">
          <div className="table_head">
            <div className="table_my_head_text1">제목</div>
            <div className="table_my_head_text2">등록날짜</div>
          </div>

          {boardArr.map((item) => (
            <ul className="post-ul">
              <li className="post-li">
                <ul className="post-row-list">
                  <Link to="/opinion/detail">
                    <li
                      className="post-row-list-item2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        sessionStorage.setItem(
                          "opinionDetail",
                          JSON.stringify(item)
                        );
                        history.push("/opinion/detail");
                      }}
                    >
                      {item.boardTitle}
                    </li>
                  </Link>
                  <li className="post-row-list-item4">{item.boardRegdate}</li>
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
                  getMyBoardAll(pagenum, range);
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
  );
};

export default MyOpinion;
