import React, { useState, useEffect } from "react";
import { ModalBuying, ModalSelling } from "../../items";
import "./holdingShares.style.css";
import axios from "axios";

const HoldingShares = ({ asset }) => {
  const [ownedAsset, setOwnedAsset] = useState({});
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);

  const [stockOne, setStockOne] = useState({});

  return (
    <>
      <table className="w-full_holding">
        <tr>
          <td>
            <div>
              {asset[1] &&
                asset.map(
                  (ownedAsset, i) =>
                    ownedAsset.stockName && (
                      <div
                        className="flex flex-row items-center justify-between stock_card"
                        key={i}
                      >
                        <div className="flex flex-col">
                          <tr className="tr_height_title">
                            <td style={{ "min-width": "200px" }}>
                              <span className="shares_title">
                                {ownedAsset.stockName}
                              </span>
                              <span
                                className="text-sm"
                                style={{
                                  "margin-left": "20px",
                                  verticalAlign: "bottom",
                                }}
                              >
                                {ownedAsset.symbol}
                              </span>
                            </td>
                            <td className="btn_section">
                              <button
                                className="btn btn-default btn-blue text-white btn-rounded"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOwnedAsset(ownedAsset);
                                  setBuyOpen(true);
                                }}
                              >
                                매수
                              </button>
                              <button
                                className="btn btn-default btn-red text-white btn-rounded"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOwnedAsset(ownedAsset);
                                  setSellOpen(true);
                                }}
                              >
                                매도
                              </button>
                            </td>
                          </tr>
                          <tr className="tr_height">
                            <td style={{ width: "200px" }}>
                              <span className="td_margin">잔고</span>
                              <span className="td_won_font">
                                {String(ownedAsset.shareCount).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}
                                주
                              </span>
                            </td>
                            <td style={{ "min-width": "200px" }}>
                              <span className="td_margin">손익</span>
                              <span className="td_won_font">
                                {String(ownedAsset.profitLoss).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}{" "}
                                원
                              </span>
                            </td>
                          </tr>
                          <tr className="tr_height">
                            <td style={{ "min-width": "200px" }}>
                              <span className="td_margin_2">평가 금액</span>
                              <span className="td_won_font">
                                {String(ownedAsset.evaluatedSum).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}{" "}
                                원
                              </span>
                            </td>
                            <td style={{ "min-width": "200px" }}>
                              <span className="td_margin_3">수익률</span>
                              <span className="td_won_font">
                                {ownedAsset.profitRatio} %
                              </span>
                            </td>
                          </tr>
                          <tr className="tr_height">
                            <td style={{ "min-width": "200px" }}>
                              <span className="td_margin_3">매입가</span>
                              <span className="td_won_font">
                                {String(ownedAsset.purchasePrice).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}{" "}
                                원
                              </span>
                            </td>
                            <td style={{ "min-width": "200px" }}>
                              <span className="td_margin_3">현재가</span>
                              <span className="td_won_font">
                                {String(ownedAsset.nowPrice).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}{" "}
                                원
                              </span>
                            </td>
                          </tr>
                        </div>
                      </div>
                    )
                )}
            </div>
          </td>
        </tr>
      </table>
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
    </>
  );
};

export default HoldingShares;
