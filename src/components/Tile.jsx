import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image tile with the title over the bottom of the picture.
export default function Tile({ item }) {
  const [broken, setBroken] = useState(false);

  const inner = (
    <>
      {item.image && !broken ? (
        <img src={item.image} alt="" className="game-img" loading="lazy" onError={() => setBroken(true)} />
      ) : (
        <div className="game-fallback" style={{ color: item.color }}>
          <i className={`fa-solid ${item.icon}`}></i>
        </div>
      )}
      <p className="game-name">{item.title}</p>
    </>
  );

  if (item.route) return <Link to={item.route} className="game-btn">{inner}</Link>;
  return <a href={item.url} target="_blank" rel="noreferrer" className="game-btn">{inner}</a>;
}
