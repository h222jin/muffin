import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const CandleChart = (props) => {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/stocks/candle/${props.match.params.symbol}`)
      .then((response) => {
        let tmpList = [];
        response.data.map((candle, i) => {
          tmpList[i] = {
            x: candle.x,
            y: [candle.y[2], candle.y[0], candle.y[1], candle.y[3]],
          };
        });
        setSeries([{ data: tmpList }]);
      })
      .catch((error) => {
        console.log(`CandleChart useEffect catch python`);
      });
  }, []);

  const [options] = useState({
    chart: {
      type: "candlestick",
      height: 350,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#ed6663",
          downward: "#43658b",
        },
      },
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </div>
    </>
  );
};

export default CandleChart;
