import React from "react";
import { NOTICE } from "../content.js";

export default function NoticeModal({ onClose }) {
  return (
    <div className="modal-bg">
      <div className="modal-card">
        <div className="brand-logo-icon" style={{ width: 60, height: 60, margin: "0 auto 20px", fontSize: "1.8rem" }}>
          <i className="fa-solid fa-bullhorn"></i>
        </div>
        <h2 style={{ color: "#00f7ff", fontSize: "1.6rem", fontWeight: 700, marginBottom: 10 }}>{NOTICE.title}</h2>
        <p style={{ color: "#8b9bb4", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 25 }}>
          🚀 {NOTICE.message}
        </p>
        <button className="unlock-btn" onClick={onClose}>Continue to Portal</button>
      </div>
    </div>
  );
}
