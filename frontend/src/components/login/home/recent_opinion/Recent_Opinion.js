import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./recent.style.css";
import axios from "axios";

const RecentOpinion = () => {
  const url = "http://localhost:8080/boards";
  const [address, setAddress] = useState("/detail");
  const [arr, setArr] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${url}/recentBoard`)
      .then((response) => {
        response.data.map((item) => setArr((arr) => [...arr, item]));
      })
      .catch((error) => {
        console.log("실패");
      });
  }, []);

  return (
    <div className="recommendation_opinion_container">
      {arr.map((item) => (
        <div key={item.index}>
          <div>
            <div>
              <div>
                <div className="opinion_title_section">
                  <div
                    className="opinion_title"
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
                        user: item.User,
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
                  </div>

                  <div className="opinion_regdate">{item.boardRegdate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOpinion;
