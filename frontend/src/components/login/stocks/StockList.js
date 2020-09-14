import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./stockList.css";
import { ModalBuying, ModalSelling } from "../items";
import Navbar from "../logined_navbar/Navbar";
import Menu from "../menu/Menu";
import { AssetContext, StockContext } from "../../../context";

const StockList = () => {
  /*  const { asset, setAsset } = useContext(AssetContext); */
  const { asset, setAsset } = useContext(AssetContext);
  const { crawledStock, setCrawledStock } = useContext(StockContext);
  const [assetStockName, setAssetStockName] = useState([]);
  const [ownedAsset, setOwnedAsset] = useState({});
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);

  const [stockOne, setStockOne] = useState({});
  const showDetail = () => {};

  useEffect(() => {
    getAll(1, 1);
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/assets/holdingCount/${
          JSON.parse(sessionStorage.getItem("logined_user")).userId
        }`
      )
      .then((response) => {
        setAsset(response.data);
        response.data.map((item) => {
          setAssetStockName((assetStockName) => [
            ...assetStockName,
            item.stockName,
          ]);
        });
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const linkToDetail = (e) => {
    e.preventDefault();
  };

  // pagination
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
    setCrawledStock([]);
    axios
      .get(`http://localhost:8080/stocks/pagination/${page}/${range}`)
      .then((response) => {
        response.data.list.map((item) => {
          setCrawledStock((crawledStock) => [...crawledStock, item]);
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
      .catch((error) => {
        throw error;
      });
  };

  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="wrapper">
          <Menu />

          <div className="documentroom_container">
            <div className="documentroom_text">투자</div>
            <div className="w-full p-4 mb-4 rounded-lg bg-white border border-grey-100 dark:bg-dark-95 dark:border-dark-90">
              <table className="table documentroom_table w-full">
                <thead>
                  <tr>
                    <th>종목</th>
                    <th>시세</th>
                    <th>전일비</th>
                    <th>시가 총액</th>
                    <th>거래량</th>
                    <th>거래하기</th>
                  </tr>
                </thead>
                <tbody>
                  {crawledStock[0] &&
                    crawledStock.map((crawledOneStock) => (
                      <tr>
                        <Link to={`/stock/detail/${crawledOneStock.symbol}`}>
                          <td
                            onClick={() => {
                              showDetail(crawledOneStock.stockName);
                            }}
                          >
                            {crawledOneStock.stockName}
                          </td>
                        </Link>
                        <td>{crawledOneStock.now}</td>
                        <td>{crawledOneStock.dod}</td>
                        <td>{crawledOneStock.transacAmount}</td>
                        <td>{crawledOneStock.volume}</td>
                        <td>
                          <button
                            className="btn btn-default btn-blue text-white btn-rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              setStockOne(crawledOneStock);
                              setBuyOpen(true);
                            }}
                          >
                            매수
                          </button>
                          <button
                            className="btn btn-default btn-red text-white btn-rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                assetStockName.includes(
                                  crawledOneStock.stockName
                                )
                              ) {
                                setStockOne(crawledOneStock);
                                console.log(stockOne);
                                setSellOpen(true);
                              } else {
                                alert(`현재 보유 중인 종목이 아닙니다.`);
                              }
                            }}
                          >
                            매도
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
          {buyOpen && (
            <ModalBuying
              stockOne={stockOne}
              ownedAsset={ownedAsset}
              isOpen={buyOpen}
              isClose={() => {
                window.location.reload();
                return setBuyOpen(false);
              }}
              ariaHideApp={false}
            />
          )}
          {sellOpen && (
            <ModalSelling
              stockOne={stockOne}
              ownedAsset={ownedAsset}
              isOpen={sellOpen}
              isClose={() => {
                window.location.reload();
                return setSellOpen(false);
              }}
              ariaHideApp={false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StockList;
