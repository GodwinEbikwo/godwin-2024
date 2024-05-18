import { useState, useEffect, useCallback, memo } from "react";
import Article from "./Article";
import GridControls from "./GridControls";
import debounce from "lodash/debounce";

const localContentArray = [
  { title: "January - 2024", bgColor: "#172838", textColor: "#c9c1b6" },
  { title: "February - 2024", bgColor: "#11c4ac", textColor: "#1f278e" },
  { title: "March - 2024", bgColor: "#25122f", textColor: "#f489ca" },
  { title: "April - 2024", bgColor: "#f4f5fa", textColor: "#4f72ab" },
  { title: "May - 2024", bgColor: "#FF6600", textColor: "#f8eadb" },
  { title: "June - 2024", bgColor: "#f8baed", textColor: "#ea0606" },
  { title: "July - 2024", bgColor: "#2b2b2b", textColor: "#dd9933" },
  { title: "August - 2024", bgColor: "#f8eadb", textColor: "#31322f" },
  { title: "Sept - 2024", bgColor: "#690075", textColor: "#edad00" },
  { title: "October - 2024", bgColor: "#ea0606", textColor: "#f8eadb" },
  { title: "November", bgColor: "#222222", textColor: "#ffb01f" },
  { title: "December", bgColor: "#222222", textColor: "#ffb01f" },
  { title: "Janurary - 2025", bgColor: "#2b2b2b", textColor: "#dd9933" },
  { title: "Febuary - 2025", bgColor: "#f8eadb", textColor: "#31322f" },
  { title: "March - 2025", bgColor: "#25122f", textColor: "#f489ca" },
  { title: "April - 2025", bgColor: "#f4f5fa", textColor: "#4f72ab" },
  { title: "May - 2025", bgColor: "#FF6600", textColor: "#f8eadb" },
  { title: "June - 2025", bgColor: "#f8baed", textColor: "#ea0606" },
];

const patterns = {
  default: [4, 2, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4],
  grid: new Array(12).fill(4),
  paper: new Array(12).fill(12),
};

function Grid() {
  const [gridStyle, setGridStyle] = useState("default");
  const [spanArray, setSpanArray] = useState([]);
  const [isLargeWindow, setIsLargeWindow] = useState(true);

  const updateSpansForWidth = useCallback((style) => {
    const pattern = patterns[style] || patterns.default;
    return localContentArray.map((_, index) => pattern[index % pattern.length]);
  }, []);

  const updateGridStyleForWindowWidth = useCallback(() => {
    if (typeof window !== "undefined") {
      let newStyle = "default";
      if (window.innerWidth < 767) {
        newStyle = "paper";
      } else if (window.innerWidth < 1280) {
        newStyle = "grid";
      }
      setIsLargeWindow(window.innerWidth >= 1280);
      setGridStyle(newStyle);
      setSpanArray(updateSpansForWidth(newStyle));
    }
  }, [updateSpansForWidth]);

  const debouncedResizeHandler = useCallback(
    debounce(() => {
      updateGridStyleForWindowWidth();
    }, 100),
    [updateGridStyleForWindowWidth]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateGridStyleForWindowWidth();
      window.addEventListener("resize", debouncedResizeHandler);

      return () => {
        debouncedResizeHandler.cancel(); // Cancel the debounce on unmount
        window.removeEventListener("resize", debouncedResizeHandler);
      };
    }
  }, [debouncedResizeHandler, updateGridStyleForWindowWidth]);

  const handleGridStyleChange = useCallback(
    (style) => {
      setGridStyle(style);
      setSpanArray(updateSpansForWidth(style));
    },
    [updateSpansForWidth]
  );

  return (
    <div className="dynamic-container">
      {isLargeWindow && (
        <GridControls
          gridStyle={gridStyle}
          handleGridStyleChange={handleGridStyleChange}
        />
      )}
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
