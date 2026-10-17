import React, { useState, useMemo } from "react";
import { FEATURED_BANNER, MENU_ITEMS } from "../content.js";
import Card from "../components/Card.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Home({ activeCategory }) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [query, activeCategory]);

  return (
    <div className="dash-layout">
      <div className="featured-banner">
        <div>
          <span className="banner-tag">{FEATURED_BANNER.tag}</span>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "4px 0 8px" }}>{FEATURED_BANNER.title}</h2>
          <p style={{ color: "#8b9bb4", fontSize: "0.9rem", maxWidth: 600 }}>{FEATURED_BANNER.description}</p>
        </div>
        <a href={FEATURED_BANNER.buttonUrl} target="_blank" rel="noreferrer" className="unlock-btn banner-btn">
          {FEATURED_BANNER.buttonText}
        </a>
      </div>

      <SearchBar value={query} onChange={setQuery} placeholder="Search portal apps, links, movies, or proxies..." />

      {items.length > 0 ? (
        <div className="card-grid">
          {items.map((item) => <Card key={item.title} item={item} />)}
        </div>
      ) : (
        <p className="empty-state">Nothing matches your search. Try a different word.</p>
      )}
    </div>
  );
}
