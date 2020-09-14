import React, { useState, useEffect } from "react";
import "./opinionList.style.css";
import { Link, useHistory } from "react-router-dom";
import { Navbar } from "../logined_navbar";
import Menu from "../menu/Menu";
import axios from "axios";

const OpinionList = () => {
  const url = "http://localhost:8080/boards";
  const [boardArr, setBoardArr] = useState([]);
  const [pageArr, setPageArr] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(1);
  const [condition, setCondition] = useState("boardTitle");
  const [searchWord, setSearchWord] = useState("");
  const history = useHistory();

  const onChangeCondition = (e) => {
    setCondition(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  const clickNext = () => {
    getAll(pageArr[0] + 5, range + 1);
  };

  const clickPrev = () => {
    getAll(pageArr[0] - 1, range - 1);
  };

  const searchPage = (page, range) => {
    setPage(page);
    setRange(range);
    setPageArr([]);
    setBoardArr([]);
    axios
      .get(`${url}/search/${searchWord}/${condition}/${page}/${range}`)
      .then((response) => {
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
      .catch((error) => console.log("실패"));
  };

  const getAll = (page, range) => {
    setPage(page);
    setRange(range);
    setPageArr([]);
    setBoardArr([]);
    axios
      .get(`${url}/pagination/${page}/${range}`)
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

  const search = (e) => {
    setPageArr([]);
    setBoardArr([]);
    e.preventDefault();
    axios
      .get(`${url}/search/${searchWord}/${condition}/1/1`)
      .then((response) => {
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
      .catch((error) => console.log("실패"));
  };

  useEffect(() => {
    getAll(1, 1);
  }, []);

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />
          <div>
            <div className="documentroom_container">
              <div className="documentroom_text">오피니언</div>

              <div className="documentroom_table">
                <div className="table_head">
                  <div className="table_head_text1">No.</div>
                  <div className="table_head_text2">제목</div>
                  <div className="table_head_text3">작성자</div>
                  <div className="table_head_text4">등록날짜</div>
                  <div className="table_head_text4">조회수</div>
                </div>

                {boardArr.map((item) => (
                  <ul key={item.index} className="post-ul">
                    <li className="post-li">
                      <ul className="post-row-list">
                        <li className="post-row-list-item1">{item.boardId}</li>
                        <li
                          className="post-row-list-item2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const boardJson = {
                              boardId: item.boardId,
                              userId: item.userId,
                              boardTitle: item.boardTitle,
                              boardContent: item.boardContent,
                              boardRegdate: item.boardRegdate,
                              nickname: item.nickname,
                              viewCnt: item.viewCnt + 1,
                              commentList: item.commentList,
                            };
                            axios
                              .post(`${url}/update`, boardJson)
                              .then((response) => {
                                console.log(boardJson);
                                sessionStorage.setItem(
                                  "opinionDetail",
                                  JSON.stringify(boardJson)
                                );
                                history.push("/opinion/detail");
                              })
                              .catch((error) => {
                                console.log("실패");
                              });
                          }}
                        >
                          {item.boardTitle}
                        </li>

                        <li className="post-row-list-item3">{item.nickname}</li>
                        <li className="post-row-list-item4">
                          {item.boardRegdate}
                        </li>
                        <li className="post-row-list-item5">{item.viewCnt}</li>
                      </ul>
                    </li>
                  </ul>
                ))}

                <Link to="/opinion/write" className="write_button">
                  글쓰기
                </Link>
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
                        if (searchWord === "") {
                          getAll(pagenum, range);
                        } else {
                          searchPage(pagenum, range);
                        }
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

              <div className="conference_search">
                <select className="search_select" onChange={onChangeCondition}>
                  <option className="search_option" value="boardTitle">
                    제목
                  </option>
                  <option className="search_option" value="nickname">
                    작성자
                  </option>
                </select>

                <input
                  placeholder="제목이나 작성자를 입력하세요"
                  className="search_input"
                  value={searchWord}
                  onChange={onChangeSearch}
                />
                <div
                  style={{ cursor: "pointer" }}
                  className="search_button"
                  onClick={search}
                >
                  검색
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpinionList;
