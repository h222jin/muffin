import React, { useState, useEffect } from "react";
import "./stockDetail.css";
import { ModalBuying, ModalSelling } from "../../items";
import axios from "axios";

const StockDetail = ({ stockDetail }) => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [bill, setBill] = useState({});
  const [asset, setAsset] = useState([]);
  const [assetStockName, setAssetStockName] = useState([]);
  const [ownedAsset, setOwnedAsset] = useState({});

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

  return (
    <>
      <table className="stock_table w-full">
        <tr className="line_setting_1">
          <td>
            <span className="stock_name">{stockDetail.stockName}</span>
            <span className="stock_code">{stockDetail.symbol}</span>
          </td>
          <td>
            <span className={"text-xs"}>{stockDetail.date}</span>
          </td>
          <td>
            <button
              className="btn btn-default text-white btn-red btn-rounded btn-icon mystock"
              onClick={(e) => {
                e.preventDefault();
                setAsset(stockDetail);
                setSellOpen(true);
              }}
            >
              <span>매도</span>
            </button>
            <button
              className="btn btn-default text-white btn-blue btn-rounded btn-icon mystock"
              onClick={(e) => {
                e.preventDefault();
                setAsset(stockDetail);
                setBuyOpen(true);
              }}
            >
              <span>매수</span>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-dark-95 dark:border-dark-90">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <div className="stock_name">{stockDetail.now}</div>
                  <div className="text-xs font-light text-grey-500">
                    {stockDetail.dod}
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td colSpan={2}>
            <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-dark-95 dark:border-dark-90 card_second">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <table className="line_setting_2">
                    <tr>
                      <td className="card_grid">
                        <span className="text-xs font-light text-grey-500 stocks_data">
                          전일
                        </span>
                        <span className="text-xl font-bold text_row">
                          {stockDetail.close}
                        </span>
                        <br />
                        <span className="text-xs font-light text-grey-500 stocks_data">
                          시가
                        </span>
                        <span className="text-xl font-bold">
                          {stockDetail.open}
                        </span>
                      </td>
                      <td className="card_grid">
                        <span className="text-xs font-light text-grey-500 stocks_data">
                          고가
                        </span>
                        <span className="text-xl font-bold text_row">
                          {stockDetail.high}
                        </span>
                        <br />
                        <span className="text-xs font-light text-grey-500 stocks_data">
                          저가
                        </span>
                        <span className="text-xl font-bold">
                          {stockDetail.low}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs font-light text-grey-500 stocks_data">
                          거래량
                        </span>
                        <span className="text-xl font-bold text_row">
                          {stockDetail.volume}
                        </span>
                        <br />
                        <span className="text-xs font-light text-grey-500 stocks_data">
                          거래대금
                        </span>
                        <span className="text-xl font-bold">
                          {stockDetail.transacAmount}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      {buyOpen && (
        <ModalBuying
          stockOne={stockDetail}
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
          stockOne={stockDetail}
          ownedAsset={ownedAsset}
          isOpen={sellOpen}
          isClose={() => {
            window.location.reload();
            return setSellOpen(false);
          }}
          ariaHideApp={false}
        />
      )}
    </>
  );
};

export default StockDetail;
