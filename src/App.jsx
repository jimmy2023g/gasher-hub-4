import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NoticeModal from "./components/NoticeModal.jsx";
import LockScreen from "./components/LockScreen.jsx";
import Dock from "./components/Dock.jsx";
import Home from "./pages/Home.jsx";
import Page from "./pages/Page.jsx";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { pathname } = useLocation();

  // Scroll to top whenever the page changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="cyber-app">
      {showNotice && <NoticeModal onClose={() => setShowNotice(false)} />}

      {!unlocked ? (
        <LockScreen onUnlock={() => setUnlocked(true)} />
      ) : (
        <>
          <Dock
            activeCategory={activeCategory}
            onCategory={setActiveCategory}
            onLock={() => setUnlocked(false)}
          />
          <Routes>
            <Route path="/" element={<Home activeCategory={activeCategory} />} />
            <Route path="/:pageId" element={<Page />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
}
