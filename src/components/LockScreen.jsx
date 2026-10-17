import React, { useState } from "react";
import { SITE_PASSWORD } from "../content.js";

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) onUnlock();
    else setError(true);
  };

  return (
    <div className="lock-screen-container">
      <div className="terminal-card">
        <div className="terminal-header">
          <div className="terminal-dot" style={{ background: "#ff5252" }}></div>
          <div className="terminal-dot" style={{ background: "#ffd700" }}></div>
          <div className="terminal-dot" style={{ background: "#69f0ae" }}></div>
        </div>

        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>Restricted Portal</h2>
        <p style={{ color: "#8b9bb4", fontSize: "0.88rem", marginBottom: 25 }}>Enter passkey to authenticate session</p>

        <form onSubmit={handleSubmit}>
          <div className="cyber-input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="cyber-field"
              placeholder="Enter security key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              aria-label={showPassword ? "Hide passkey" : "Show passkey"}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>

          {error && <p style={{ color: "#ff5252", fontSize: "0.85rem", marginBottom: 15 }}>Invalid security code. Try again.</p>}

          <button type="submit" className="unlock-btn">Authenticate Session</button>
        </form>
      </div>
    </div>
  );
}
