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
          <h3>Dallotech pvt. ltd.</h3>
          <p>
            Develop full stack websites with Nextjs
            <br />
            Worked on projects like Pdf generation, Webflow, Landing Pages,
            Online job Application
            <br />
            GSAP Animations, FullStack Development
            <br />
            Convert figma design to code
            <br />
            API Integration
          </p>
          <div>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
        <div className="exp__box">
          <h2>
            Lecturer <span>2023-Now</span>
          </h2>
          <h3>Asian College of Higher Studies</h3>
          <p>
            Preparing and delivering lectures, tutorials, workshops, and
            seminars.
            <br />
            Collaborating with other academics to improve teaching methods and
            knowledge base.
            <br />
            Setting and grading assignments, tests, and exams.
            <br />
            Supervising students on their projects.
            <br />
            Providing support to students and other colleagues.
            <br />
            Staying current by reading widely and producing published work in
            the field.
          </p>
          <div style={{ background: "#ec5453" }}>
            <FaPenToSquare size={18} color="#ffffff" />
          </div>
        </div>
      </div>
    </section>
  );
}
