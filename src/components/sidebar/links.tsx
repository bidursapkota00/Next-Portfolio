"use client";
import React from "react";

export default function Links() {
  const links = [
    "home",
    "about",
    "education",
    "skills",
    "experience",
    "training",
    "project",
    "accomplishment",
    "contact",
  ];
  const linkClicked = () => {
    const hamburger = document.getElementById("hamburger");
    hamburger?.classList.remove("sidebar__hamburger__translate");
  };

  return (
    <ul className="sidebar__list">
      {links.map((l) => {
        return (
          <a
            href={l === "home" ? "#hero" : "#" + l}
            className="sidebar__list__item"
            key={l}
            onClick={linkClicked}
          >
            {l}
          </a>
        );
      })}
    </ul>
  );
}
