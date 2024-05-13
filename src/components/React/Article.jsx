import { memo } from "react";

const Article = memo(({ item, span, index }) => (
  <article style={{ gridColumn: `span ${span}` }} className="block_item">
    <a aria-label={`Go to the ${item.title} page`} href="/">
      <h4>{item.title}</h4>
    </a>
    <div className="block_content"></div>
    <div className="dates">{index + 1}</div>
  </article>
));

export default Article;
