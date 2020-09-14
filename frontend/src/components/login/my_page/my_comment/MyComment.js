import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./myComment.style.css";
import axios from "axios";

const MyComment = () => {
  const url = "http://localhost:8080/comments";
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );
  const [commentArr, setCommentArr] = useState([]);
  const [pageArr, setPageArr] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(1);
  const history = useHistory();

  const clickNext = () => {
    getMyCommentAll(pageArr[0] + 5, range + 1);
  };

  const clickPrev = () => {
    getMyCommentAll(pageArr[0] - 1, range - 1);
  };

  const getMyCommentAll = (page, range) => {
    setPage(page);
    setRange(range);
    setPageArr([]);
    setCommentArr([]);
    axios.post(`${url}/myComment/${page}/${range}`, user).then((response) => {
      console.log(response.data);
      response.data.list.map((item) => {
        setCommentArr((comment) => [...comment, item]);
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
    });
  };

  useEffect(() => {
    getMyCommentAll(1, 1);
  }, []);

  return (
    <div>
      <div className="documentroom_container">
        <div className="documentroom_table">
          <div className="table_head">
            <div className="table_my_comment_head_text1">댓글</div>
            <div className="table_my_comment_head_text2">등록날짜</div>
          </div>

          {commentArr.map((item) => (
            <ul className="post-ul">
              <li className="myComment-li">
                <ul className="post-row-list">
                  <li className="post-my_row-list-item1">
                    {item.commentContent}
                  </li>
                  <li
                    className="post-my_row-list-item2"
                    onClick={() => {
                      sessionStorage.setItem(
                        "opinionDetail",
                        JSON.stringify(item.board)
                      );
                      history.push("/opinion/detail");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    원문보기▶
                  </li>
                  <li className="post-my_row-list-item3">
                    {item.commentRegdate}
                  </li>
                </ul>
              </li>
            </ul>
          ))}
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
                    getMyCommentAll(pagenum, range);
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
  );
};

export default MyComment;
