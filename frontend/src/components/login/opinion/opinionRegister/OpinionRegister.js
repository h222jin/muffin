import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./opinionRegister.css";
import Navbar from "../../logined_navbar/Navbar";
import Menu from "../../menu/Menu";
import axios from "axios";

const OpinionRegister = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("logined_user"))
  );

  const onChangeBoardTitle = (e) => {
    setBoardTitle(e.target.value);
  };

  const onChangeBoardContent = (value) => {
    setBoardContent(value);
  };

  const url = "http://localhost:8080/boards";

  function getFormatDate(date) {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  }

  const register = (e) => {
    e.preventDefault();
    const board = {
      boardTitle: boardTitle,
      boardContent: boardContent,
      user: user,
      viewCnt: 0,
      boardRegdate: getFormatDate(new Date()),
    };
    if (boardTitle !== "" && boardContent !== "") {
      axios.post(`${url}/insert`, board).then((response) => {
        alert("게시물 등록이 완료되었습니다.");
        window.location.href = "/opinion";
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
                onChange={onChangeBoardTitle}
              />
              <div className="w-full mb-4">
                <div className="w-full">
                  <ReactQuill
                    theme="snow"
                    value={boardContent}
                    placeholder="내용을 입력하세요"
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
                  onClick={register}
                >
                  등록하기
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
