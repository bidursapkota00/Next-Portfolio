import React from "react";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";

import "./about.css";

export default function About() {
  return (
    <section id="about" className="section">
      <span className="section__title">about me</span>
      <h2 className="section__subtitle">who am i?</h2>
      <p className="about_description">
        <strong>Hi there! I&apos;m Bidur Sapkota, </strong>a passionate Next.js
        web developer based in Kathmandu, Nepal. With years of experience in
        building modern, performant, and user-friendly web applications, I
        specialize in leveraging the power of Next.js to create seamless and
        engaging digital experiences.
      </p>
      <div className="about__skills">
        <div className="about__box">
          <FaAssistiveListeningSystems size={30} />
          <h3>web development</h3>
        </div>
        <div className="about__box">
          <FaGlobe size={30} />
          <h3>web design</h3>
        </div>
        <div className="about__box">
          <FaDatabase size={30} />
          <h3>Software</h3>
        </div>
        <div className="about__box">
          <FaMobile size={30} />
          <h3>application</h3>
        </div>
      </div>

      <div className="about__happy">
        <h2>I am happy to know you that 30+ projects done sucessfully!</h2>
        <button>hire me</button>
      </div>
    </section>
  );
}
