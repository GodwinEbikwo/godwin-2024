import { memo, useCallback } from "react";

const StyleButton = memo(({ style, isActive, onClick }) => (
  <button
    className={`btn ${isActive ? "btn-active" : ""}`}
    onClick={onClick}
    aria-label={`Change grid style to ${style}`}
  >
    {style.charAt(0).toUpperCase() +
      style
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim()}
  </button>
));

const GridControls = memo(({ gridStyle, handleGridStyleChange }) => {
  const handleClick = useCallback(
    (style) => {
      handleGridStyleChange(style);
    },
    [handleGridStyleChange]
  );

  return (
    <div className="grid-controls">
      {["default", "grid", "paper"].map((style) => (
        <StyleButton
          key={style}
          style={style}
          isActive={gridStyle === style}
          onClick={() => handleClick(style)}
        />
      ))}
    </div>
  );
});

export default GridControls;
