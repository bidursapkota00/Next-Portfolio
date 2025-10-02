"use client";

import { useEffect } from "react";

export default function CloseOnClickOutside() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const target = event.target as HTMLElement;

      if (sidebar && !sidebar.contains(target)) {
        const hamburger = document.getElementById("hamburger");
        hamburger?.classList.remove("sidebar__hamburger__translate");

        const overlay = document.getElementById("sidebar__overlay");
        overlay?.classList.remove("sidebar__overlay__block");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
