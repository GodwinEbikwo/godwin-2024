import { memo } from "react";
import "./styles/Article.css";

const calculateLighterColor = (bgColor) => {
  if (!/^#[0-9A-F]{6}$/i.test(bgColor)) {
    console.error("Invalid hex color: ", bgColor);
    return bgColor; // return original or a default color
  }
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const lightenFactor = 1.25;

  const lighterR = Math.min(Math.round(r * lightenFactor), 255);
  const lighterG = Math.min(Math.round(g * lightenFactor), 255);
  const lighterB = Math.min(Math.round(b * lightenFactor), 255);
  return `rgb(${lighterR}, ${lighterG}, ${lighterB})`;
};

const Article = memo(({ item, span }) => {
  return (
    <article
      style={{
        color: item.textColor,
        gridColumn: `span ${span}`,
        backgroundColor: item.bgColor,
      }}
      className="block_item"
    >
      <a
        href="/blog"
        style={{ outline: "none" }}
        aria-label={`Read more about ${item.title}`}
        onFocus={(e) => (e.target.style.outline = "auto")}
      >
        <h4>{item.title}</h4>
      </a>

      <a href="/blog" className="block__preview">
        <img
          src="https://cca-annex.net/wp-content/uploads/2022/06/000032.jpg"
          alt={item.title}
          className="block__image"
        />
        <div
          className="block__overlay"
          style={{ backgroundColor: item.bgColor }}
        ></div>
      </a>
    </article>
  );
});

export default Article;
