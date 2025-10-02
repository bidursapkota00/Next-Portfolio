import React from "react";
import "./sidebar.css";
import Hamburger from "./hamburger";
import Image from "next/image";
import Links from "./links";
import CloseOnClickOutside from "./close-on-click-outside";

export default function Sidebar() {
  return (
    <>
      <CloseOnClickOutside />
      <div id="sidebar__overlay"></div>
      <nav className="sidebar" id="sidebar">
        <Hamburger />
        <div className="sidebar__content">
          <div>
            <Image
              className="sidebar__image"
              src="/images/profile3.png"
              alt="Profile Image"
              width={160}
              height={160}
            />
            <h2 className="sidebar__name">bidur sapkota</h2>
            <h3 className="sidebar__job">
              developer <span className="sidebar__country">in nepal</span>
            </h3>
          </div>

          <Links />
        </div>
      </nav>
    </>
  );
}
