import React from "react";
import { FaPenToSquare } from "react-icons/fa6";

import "./experience.css";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <span className="section__title">experience</span>
      <span className="section__subtitle">work experience</span>

      <div className="exp__container">
        <div className="exp__box">
          <h2>
            React Developer <span>2021-2022</span>
          </h2>
          <p>Full stack development with next.js</p>
          <div>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
        <div className="exp__box">
          <h2>
            Lecturer <span>2022-Now</span>
          </h2>
          <p>
            Full time lecturer of Data structure & algorithms, Computer
            graphics.
            <br />
            Web development trainer.
            <br />
            Photoshop trainer.
          </p>
          <div style={{ background: "#ec5453" }}>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
        <div className="exp__box">
          <h2>
            Freelancer <span>2022-Now</span>
          </h2>
          <p>Build dynamic Landing pages with next.js</p>
          <div style={{ background: "#ec5453" }}>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
      </div>
    </section>
  );
}
