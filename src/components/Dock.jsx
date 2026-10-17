import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../content.js";

export default function Dock({ activeCategory, onCategory, onLock }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="top-dock">
      <Link to="/" className="brand-logo">
        <div className="brand-logo-icon"><i className="fa-solid fa-bolt"></i></div>
        <span>Gasher Hub</span>
      </Link>

      <div className="dock-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`dock-btn ${pathname === "/" && activeCategory === cat.id ? "active" : ""}`}
            onClick={() => { onCategory(cat.id); navigate("/"); }}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            {cat.label}
          </button>
        ))}
      </div>

      <button onClick={onLock} className="dock-btn lock-btn">
        <i className="fa-solid fa-lock"></i>
        Lock
      </button>
    </header>
  );
}
