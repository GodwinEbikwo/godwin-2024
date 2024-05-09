import { useState, useEffect } from "react";

const contentArray = [
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

const basePattern = [4, 2, 2, 2, 2, 4, 2, 2, 2, 2, 6, 2];
const midPattern = new Array(contentArray.length).fill(4);

function Grid() {
  // State to handle the grid span based on window width
  const [spanArray, setSpanArray] = useState(
    new Array(contentArray.length).fill(1)
  );

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSpanArray(
          contentArray.map(
            (_, index) => basePattern[index % basePattern.length]
          )
        );
      } else if (width > 767 && width < 1024) {
        setSpanArray(midPattern);
      } else {
        setSpanArray(new Array(contentArray.length).fill(1));
      }
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Set initial value
    handleResize();

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="block_grid">
      {contentArray.map((item, index) => (
        <article
          key={index}
          style={{
            gridColumn: `span ${spanArray[index]}`,
          }}
          className="block_item"
        >
          <div className="content">
            <h4>{item.title}</h4>
          </div>

          <div className="dates">{index + 1}</div>
        </article>
      ))}
    </div>
  );
}

export default Grid;
