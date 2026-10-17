import React, { useState, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PAGES } from "../content.js";
import Card from "../components/Card.jsx";
import Tile from "../components/Tile.jsx";
import SearchBar from "../components/SearchBar.jsx";
import PromoOverlay from "../components/PromoOverlay.jsx";
import PasswordGate from "../components/PasswordGate.jsx";

const promoKey = (id) => `promo-seen-${id}`;
const wasSeen = (id) => { try { return sessionStorage.getItem(promoKey(id)) === "1"; } catch { return false; } };
const markSeen = (id) => { try { sessionStorage.setItem(promoKey(id), "1"); } catch { /* ignore */ } };

// One template for every sub-page in src/content/pages.json.
export default function Page() {
  const { pageId } = useParams();
  const page = PAGES[pageId];

  const [activeTabId, setActiveTabId] = useState(null);
  const [unlocked, setUnlocked] = useState({});
  const [query, setQuery] = useState("");
  const [promoOpen, setPromoOpen] = useState(() => !!PAGES[pageId]?.promo && !wasSeen(pageId));

  const tab = page?.tabs.find((t) => t.id === activeTabId) || page?.tabs[0];
  const locked = !!tab?.password && !unlocked[tab.id];

  const items = useMemo(() => {
    const q = query.toLowerCase();
    return (tab?.items || []).filter(
      (i) => i.title.toLowerCase().includes(q) || (i.desc || "").toLowerCase().includes(q)
    );
  }, [tab, query]);

  if (!page) return <Navigate to="/" replace />;

  const tiles = page.layout === "tiles";
  const switchTab = (id) => { setActiveTabId(id); setQuery(""); };
  const closePromo = () => { markSeen(pageId); setPromoOpen(false); };

  const body = (
    <>
      {page.tabs.length > 1 && (
        <div className="tabs">
          {page.tabs.map((t) => (
            <button key={t.id} className={`tab-btn ${t.id === tab.id ? "active" : ""}`} onClick={() => switchTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {locked ? (
        <PasswordGate password={tab.password} onUnlock={() => setUnlocked({ ...unlocked, [tab.id]: true })} />
      ) : (
        <>
          <SearchBar value={query} onChange={setQuery} placeholder={tiles ? "Search game..." : `Search ${page.title.toLowerCase()}...`} tiles={tiles} />
          {items.length > 0 ? (
            <div className={tiles ? "button-grid" : "card-grid"}>
              {items.map((i) => (tiles ? <Tile key={i.title} item={i} /> : <Card key={i.title} item={i} />))}
            </div>
          ) : (
            <p className="empty-state">{tab.items.length ? "Nothing matches your search." : "Nothing here yet."}</p>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="dash-layout">
      {promoOpen && <PromoOverlay promo={page.promo} onClose={closePromo} />}

      <div className="page-header">
        <Link to="/" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </Link>
        {!tiles && (
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700 }}>{page.title}</h1>
            {page.subtitle && <p style={{ color: "#8b9bb4", fontSize: "0.9rem" }}>{page.subtitle}</p>}
          </div>
        )}
      </div>

      {tiles ? (
        <div className="game-container">
          <h2 className="game-title">{page.title}</h2>
          {body}
        </div>
      ) : body}
    </div>
  );
}
