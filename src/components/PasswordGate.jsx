import React, { useState } from "react";

export default function PasswordGate({ password, onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value === password) onUnlock();
    else { setError(true); setValue(""); }
  };

  return (
    <form className="password-area" onSubmit={submit}>
      <p style={{ color: "rgba(255,255,255,0.7)" }}>This tab is locked. Enter the password to open it.</p>
      <input
        type="password"
        className="search-bar"
        style={{ marginBottom: 0 }}
        placeholder="Password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      {error && <p style={{ color: "#ff6b6b", fontSize: 14 }}>Wrong password. Try again.</p>}
      <button type="submit" className="btn-submit">Unlock</button>
    </form>
  );
}
