import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./opinionDetail.style.css";
import Navbar from "../../logined_navbar/Navbar";
import Menu from "../../menu/Menu";
import axios from "axios";

const OpinionDetail = () => {
  const url = "http://localhost:8080/boards";
  const [board, setBoard] = useState(
    JSON.parse(sessionStorage.getItem("opinionDetail"))
  );
  const [authority, setAuthority] = useState(false);
  const [content, setContent] = useState([]);
  const history = useHistory();
  const [commentContent, setCommentContent] = useState("");

  const onChangeComment = (e) => {
    setCommentContent(e.target.value);
  };

  function getFormatDate(date) {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  }

  useEffect(() => {
    setAuthority(
      board.userId === JSON.parse(sessionStorage.getItem("logined_user")).userId
    );
    axios
      .get(`http://localhost:8080/comments/detail/${board.boardId}`)
      .then((response) => {
        response.data.map((item) => {
          setContent((content) => [...content, item]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDelete = (e) => {
    e.preventDefault();
    axios
      .get(`${url}/delete/${board.boardId}`)
      .then((response) => {
        alert("삭제가 완료되었습니다.");
        history.push("/opinion");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />
          <div>
            <div className="documentdetaildiv">
              <div className="documentDetailTitle">
                <div className="Title1">{board.boardTitle}</div>
                <div className="Title2">{board.boardRegdate}</div>
              </div>
              <div className="documentDetailAuthority">
                <div className="authority">작성자 : {board.nickname}</div>
                {authority && (
                  <div className="documentDetailAuthority">
                    <div
                      className="authority2"
                      sylte={{ cursor: "pointer" }}
                      onClick={(e) => {
                        sessionStorage.setItem(
                          "opinionEdit",
                          JSON.stringify(board)
                        );
                        history.push("/opinion/update");
                      }}
                    >
                      수정
                    </div>
                    <div
                      className="authority3"
                      style={{ cursor: "pointer" }}
                      onClick={onDelete}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="contentdetaildiv">
              <div className="detail_content_01">
                <span
                  dangerouslySetInnerHTML={{ __html: board.boardContent }}
                ></span>
              </div>
            </div>
            {content.map((item) => (
              <ul className="commentdiv" key={item.index}>
                <li className="comment-li">
                  <ul className="comment-row-list">
                    <li className="comment-row-list-item1">{item.nickname}</li>
                    <li className="comment-row-list-item2">
                      {item.commentContent}
                    </li>
                    <li className="comment-row-list-item3">
                      {item.commentRegdate}
                    </li>
                    {JSON.parse(sessionStorage.getItem("logined_user"))
                      .userId === item.user.userId && (
                      <li
                        className="comment-row-list-item4"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          axios
                            .get(
                              `http://localhost:8080/comments/delete/${item.commentId}`
                            )
                            .then((response) => {
                              alert("댓글 삭제가 완료되었습니다.");
                              window.location.reload();
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        삭제
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            ))}
            <input className="comment_input" onChange={onChangeComment} />
            <button
              className="comment_button"
              onClick={(e) => {
                const comment = {
                  user: JSON.parse(sessionStorage.getItem("logined_user")),
                  board: board,
                  commentContent: commentContent,
                  nickname: JSON.parse(sessionStorage.getItem("logined_user"))
                    .nickname,
                  commentRegdate: getFormatDate(new Date()),
                };
                axios
                  .post(`http://localhost:8080/comments/insert`, comment)
                  .then((response) => {
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              댓글달기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpinionDetail;
