import React from "react";

// Full-screen promo shown once per visit to a page (set "promo" in pages.json).
export default function PromoOverlay({ promo, onClose }) {
  return (
    <div className="promo-overlay" role="dialog" aria-modal="true" aria-label={promo.title}>
      <button className="promo-close" onClick={onClose} aria-label="Close">×</button>
      <h2 className="promo-title">{promo.title}</h2>
      {promo.image && <img className="promo-img" src={promo.image} alt="" />}
      {promo.text && <p className="promo-text">{promo.text}</p>}
      {promo.url && (
        <a className="promo-link" href={promo.url} target="_blank" rel="noreferrer">
          {promo.buttonText || "Check it out"}
        </a>
      )}
    </div>
  );
}
