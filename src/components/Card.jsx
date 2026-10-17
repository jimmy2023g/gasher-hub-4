import React from "react";
import { Link } from "react-router-dom";

// Renders an in-app <Link> when `route` is set, otherwise an outside link.
export default function Card({ item }) {
  const inner = (
    <>
      {item.badge && <span className="badge-pill">{item.badge}</span>}
      <div className="icon-circle" style={{ color: item.color }}>
        <i className={`fa-solid ${item.icon}`}></i>
      </div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 6 }}>{item.title}</h3>
      <p style={{ color: "#8b9bb4", fontSize: "0.82rem", lineHeight: 1.4 }}>{item.desc}</p>
    </>
  );

  if (item.route) {
    return <Link to={item.route} className="app-card">{inner}</Link>;
  }
  return <a href={item.url} target="_blank" rel="noreferrer" className="app-card">{inner}</a>;
}
