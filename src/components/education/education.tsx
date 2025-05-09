import React from "react";
import { FaPenToSquare } from "react-icons/fa6";

import "./education.css";

export default function Education() {
  return (
    <section id="education" className="section">
      <span className="section__title">education</span>
      <span className="section__subtitle">my education</span>

      <div className="edu__container">
        <div className="edu__box">
          <h2>
            SEE (A+) <span>2016</span>
          </h2>
          <h3>Hindu vidhya-peeth Nepal</h3>
          <div>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
        <div className="edu__box">
          <h2>
            +2 (A+) <span>2018</span>
          </h2>
          <h3>Advanced H.S.S</h3>
          <div style={{ background: "#ec5453" }}>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
        <div className="edu__box">
          <h2>
            BEI (77.38%) <span>2023</span>
          </h2>
          <h3>National College of Engineering</h3>
          <div style={{ background: "#f9bf3f" }}>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
      </div>
    </section>
  );
}
