"use client";
import React, { useState } from "react";

export default function Hamburger() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div
      className={`sidebar__hamburger ${
        showSideBar ? "sidebar__hamburger__translate" : ""
      }`}
      id="hamburger"
      onClick={() => setShowSideBar(!showSideBar)}
    >
      <div className="sidebar__hamburger__lines">
        <div className="sidebar__hamburger__line"></div>
        <div className="sidebar__hamburger__line"></div>
        <div className="sidebar__hamburger__line"></div>
      </div>
    </div>
  );
}
