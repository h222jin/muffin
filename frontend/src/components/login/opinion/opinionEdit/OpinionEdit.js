import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./opinionEdit.css";
import Navbar from "../../logined_navbar/Navbar";
import Menu from "../../menu/Menu";
import axios from "axios";

const OpinionRegister = () => {
  const [board, setBoard] = useState(
    JSON.parse(sessionStorage.getItem("opinionEdit"))
  );
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const url = "http://localhost:8080/boards";
  const onChangeBoardTitle = (e) => {
    setBoardTitle(e.target.value);
  };

  useEffect(() => {
    console.log(board);
    setBoardTitle(board.boardTitle);
    setBoardContent(board.boardContent);
  }, []);

  const onChangeBoardContent = (value) => {
    setBoardContent(value);
  };

  const edit = (e) => {
    e.preventDefault();
    const boardJson = {
      boardId: board.boardId,
      boardTitle: boardTitle,
      boardContent: boardContent,
      user: JSON.parse(sessionStorage.getItem("logined_user")),
      viewCnt: board.viewCnt,
      boardRegdate: board.boardRegdate,
      commentList: board.commentList,
      userId: JSON.parse(sessionStorage.getItem("logined_user")).userId,
      nickname: JSON.parse(sessionStorage.getItem("logined_user")).nickname,
    };
    if (boardTitle !== "" && boardContent !== "") {
      console.log(boardJson);
      axios.post(`${url}/update`, boardJson).then((response) => {
        alert("게시물 수정이 완료되었습니다.");
        sessionStorage.setItem("opinionDetail", JSON.stringify(boardJson));
        window.location.href = "/opinion/detail";
      });
    } else if (boardTitle === "") {
      alert("제목을 입력해주세요.");
    } else {
      alert("내용을 입력해주세요.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />
          <div className="documentroom_container">
            <form>
              <input
                className="form-input input_title"
                placeholder="제목을 입력하세요"
                type="text"
                value={boardTitle}
                onChange={onChangeBoardTitle}
              />
              <div className="w-full mb-4">
                <div className="w-full">
                  <ReactQuill
                    theme="snow"
                    placeholder="내용을 입력하세요"
                    value={boardContent}
                    onChange={onChangeBoardContent}
                  />
                </div>
              </div>
              <div className={"buttons"}>
                <button
                  className="btn btn-default bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-rounded btn-raised"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    window.location.href = "/opinion";
                  }}
                >
                  취소하기
                </button>
                <button
                  className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded"
                  style={{ cursor: "pointer" }}
                  onClick={edit}
                >
                  수정하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpinionRegister;
