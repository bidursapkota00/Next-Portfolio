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
        <strong>Hi there! I&apos;m Bidur Sapkota, </strong>Electronics,
        Communication and Information Engineering graduate with strong expertise
        in web and app development, embedded systems, and fullstack solutions.
        Currently working as a Lecturer at Asian College of Higher Studies, with
        a solid foundation in academic instruction and student mentorship.
        Previously served as a Web Developer at Dallotech, delivering dynamic,
        responsive websites using Next.js, GSAP, and API integrations.
        Demonstrated prociency in building impactful projects such as a Smart
        Water Meter with payment integration and a Job Application platform.
        Backed by diverse training in FastAPI, Next.js, MySQL, and Flutter, and
        recognized for excellence with a first-place award at the Yatra 4.0
        Hardware Model Exhibition. Passionate about IoT, ethical hacking, and
        continuously exploring cutting-edge tech to solve real-world problems.
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
          <h3>
            Data Analysis
            <br />& Machine Learning
          </h3>
        </div>
        <div className="about__box">
          <FaMobile size={30} />
          <h3>mobile application</h3>
        </div>
      </div>

      <div className="about__happy">
        <h2>I am happy to know you that 30+ projects done sucessfully!</h2>
        <a href="#contact" className="about__hire_me">
          hire me
        </a>
      </div>
    </section>
  );
}
