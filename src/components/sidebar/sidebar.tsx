import React from "react";
import "./sidebar.css";
import Hamburger from "./hamburger";
import Image from "next/image";
import Links from "./links";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <Hamburger />

      <div className="sidebar__content">
        <div>
          <Image
            className="sidebar__image"
            src="/images/profile3.png"
            alt="Profile Image"
            width={500}
            height={500}
          />
          <h2 className="sidebar__name">bidur sapkota</h2>
          <h3 className="sidebar__job">
            developer <span className="sidebar__country">in nepal</span>
          </h3>
        </div>

        <Links />

        <p className="sidebar__copyright">
          &copy; Copyright &copy; 2024 All rights reserved | This template is
          made with &#x2764; by <span>Bidur</span>
        </p>
      </div>
    </nav>
  );
}
