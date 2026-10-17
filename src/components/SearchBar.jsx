import React from "react";

export default function SearchBar({ value, onChange, placeholder, tiles }) {
  if (tiles) {
    return (
      <input
        type="text"
        className="search-bar"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <div className="search-bar-wrap">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
