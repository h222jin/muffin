import "d3-transition";
import { select } from "d3-selection";
import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function getCallback(callback) {
  return function (word, event) {
    const isActive = callback !== "onWordMouseOut";
    const element = event.target;
    const text = select(element);
    text
      .on("click", () => {
        if (isActive) {
          window.location.assign(`/search/${word.text}`, "_blank");
        }
      })
      .transition()
      .attr("background", "white")
      .attr("text-decoration", isActive ? "underline" : "none");
  };
}

const callbacks = {
  getWordColor: (word) => (word.value > 20 ? "#F5B06C" : "#9D968F"),
  getWordTooltip: (word) =>
    `The word "${word.text}" appears ${word.value} times.`,
  onWordClick: getCallback("onWordClick"),
  onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOver: getCallback("onWordMouseOver"),
};
const WordConvas = () => {
  const options = {
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [30, 50],
    fontStyle: "normal",
    fontWeight: "bold",
    rotations: 1,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  const [word, setWord] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cloud`)
      .then((res) => {
        console.log(res.data);
        setWord(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ReactWordcloud
        callbacks={callbacks}
        words={word}
        options={options}
        size={[400, 300]}
      />
    </>
  );
};

const rootElement = document.getElementById("root");
export default WordConvas;
