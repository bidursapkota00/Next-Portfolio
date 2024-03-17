import React from "react";
import "./sidebar.css";
import Hamburger from "./hamburger";
import Image from "next/image";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <Hamburger />

      <div className="sidebar__content">
        <Image
          className="sidebar__image"
          src="/images/about2.jpg"
          alt="Profile Image"
          width={200}
          height={200}
        />
        <h2 className="sidebar__name">bidur sapkota</h2>
        <h3 className="sidebar__job">
          developer <span className="sidebar__country">in nepal</span>
        </h3>

        <ul className="sidebar__list">
          <a href="#hero" className="sidebar__list__item">
            Home
          </a>
          <a href="#about" className="sidebar__list__item">
            About
          </a>
          <a href="#skills" className="sidebar__list__item">
            skills
          </a>
          <a href="#experience" className="sidebar__list__item">
            experience
          </a>
          <a href="#contact" className="sidebar__list__item">
            contact
          </a>
        </ul>

        <p className="sidebar__copyright">
          &copy; Copyright &copy; 2024 All rights reserved | This template is
          made with &#x2764; by <span>Bidur</span>
        </p>
      </div>
    </nav>
  );
}
