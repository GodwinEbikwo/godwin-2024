import { useState, useEffect, useCallback, memo } from "react";
import Article from "./Article";
import debounce from "lodash/debounce";

const localContentArray = [
  { title: "January - 2024", bgColor: "#172838", textColor: "#c9c1b6" },
  { title: "Febuary - 2024", bgColor: "#11c4ac", textColor: "#1f278e" },
  { title: "March - 2024", bgColor: "#25122f", textColor: "#f489ca" },
  { title: "April -  2024", bgColor: "#f4f5fa", textColor: "#4f72ab" },
  { title: "May - 2024", bgColor: "#f4f5fa", textColor: "#4f72ab" },
  { title: "June - 2024", bgColor: "#0a0a0a", textColor: "#f3dec2" },
  { title: "July - 2024", bgColor: "#2b2b2b", textColor: "#dd9933" },
  { title: "August - 2024", bgColor: "#f8eadb", textColor: "#31322f" },
  { title: "September - 2024", bgColor: "#690075", textColor: "#edad00" },
  { title: "October - 2024", bgColor: "#ec704e", textColor: "#25303e" },
  { title: "November", bgColor: "#222222", textColor: "#ffb01f" },
  { title: "December", bgColor: "#222222", textColor: "#ffb01f" },
];

const defaultPattern = [4, 2, 2, 2, 2, 4, 2, 2, 2, 2, 6, 2];
const twoColumnPattern = new Array(12).fill(4);
const singleColumnPattern = new Array(12).fill(12);

function Grid() {
  const [spanArray, setSpanArray] = useState([]);
  const [gridStyle, setGridStyle] = useState("default");

  const updateSpansForWidth = useCallback((width) => {
    let pattern = defaultPattern;
    if (width < 1024) pattern = new Array(localContentArray.length).fill(4);
    return localContentArray.map((_, index) => pattern[index % pattern.length]);
  }, []);

  const handleResize = useCallback(() => {
    debounce(() => {
      setSpanArray(updateSpansForWidth(window.innerWidth));
    }, 100)();
  }, [updateSpansForWidth]);

  useEffect(() => {
    const calculatePattern = () => {
      switch (gridStyle) {
        case "twoColumn":
          return twoColumnPattern;
        case "single":
          return singleColumnPattern;
        default:
          return defaultPattern;
      }
    };

    const pattern = calculatePattern();
    setSpanArray(
      localContentArray.map((_, index) => pattern[index % pattern.length])
    );
  }, [gridStyle]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set spans

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel the debounce on unmount to clean up
    };
  }, [handleResize]);

  const handleGridStyleChange = useCallback((style) => {
    setGridStyle(style);
  }, []);

  return (
    <div className="dynamic-container">
      <div className="grid-controls">
        <button
          className={`btn ${gridStyle === "default" ? "btn-active" : ""}`}
          onClick={() => handleGridStyleChange("default")}
        >
          Calendar Grid
        </button>
        <button
          className={`btn ${gridStyle === "twoColumn" ? "btn-active" : ""}`}
          onClick={() => handleGridStyleChange("twoColumn")}
        >
          Paper Columns
        </button>
        <button
          className={`btn ${gridStyle === "single" ? "btn-active" : ""}`}
          onClick={() => handleGridStyleChange("single")}
        >
          Single File
        </button>
      </div>
      <div className="block_grid">
        {localContentArray.map((item, index) => (
          <Article
            key={item.title}
            item={item}
            span={spanArray[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
