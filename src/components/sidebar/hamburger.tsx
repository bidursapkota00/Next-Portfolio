"use client";
import React from "react";

export default function Hamburger() {
  const hamburgerClicked = () => {
    const hamburger = document.getElementById("hamburger");
    hamburger?.classList.toggle("sidebar__hamburger__translate");

    const overlay = document.getElementById("sidebar__overlay");
    overlay?.classList.toggle("sidebar__overlay__block");
  };

  return (
    <div
      className="sidebar__hamburger"
      id="hamburger"
      onClick={hamburgerClicked}
    >
      <div className="sidebar__hamburger__lines">
        <div className="sidebar__hamburger__line"></div>
        <div className="sidebar__hamburger__line"></div>
        <div className="sidebar__hamburger__line"></div>
      </div>
    </div>
  );
}
