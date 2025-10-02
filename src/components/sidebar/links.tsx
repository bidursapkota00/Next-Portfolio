"use client";

import Link from "next/link";

export default function Links() {
  const links = [
    ["home", "/#hero"],
    ["about", "/#about"],
    ["education", "/#education"],
    ["skills", "/#skills"],
    ["experience", "/#experience"],
    ["work", "/works"],
    ["accomplishment", "/#accomplishment"],
    ["blog", "/blogs"],
    ["contact", "/#contact"],
  ];
  const linkClicked = () => {
    const hamburger = document.getElementById("hamburger");
    hamburger?.classList.remove("sidebar__hamburger__translate");

    const overlay = document.getElementById("sidebar__overlay");
    overlay?.classList.remove("sidebar__overlay__block");
  };

  return (
    <ul className="sidebar__list">
      {links.map((l) => {
        const isHashLink = l[1].startsWith("/#");
        return isHashLink ? (
          <a
            href={l[1]}
            className="sidebar__list__item"
            key={l[1]}
            onClick={linkClicked}
          >
            {l[0]}
          </a>
        ) : (
          <Link
            href={l[1]}
            className="sidebar__list__item"
            onClick={linkClicked}
            key={l[1]}
          >
            {l[0]}
          </Link>
        );
      })}
    </ul>
  );
}
