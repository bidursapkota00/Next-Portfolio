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
        <strong>Hi I&apos;m Bidur Sapkota</strong>
        On her way she met a copy. The copy warned the Little Blind Text, that
        where it came from it would have been rewritten a thousand times and
        everything that was left from its origin would be the word and the
        Little Blind Text should turn around and return to its own, safe
        country.
      </p>
      <p className="about_description">
        Even the all-powerful Pointing has no control about the blind texts it
        is an almost unorthographic life One day however a small line of blind
        text by the name of Lorem Ipsum decided to leave for the far World of
        Grammar.
      </p>
      <div className="about__skills">
        <div className="about__box">
          <FaAssistiveListeningSystems size={30} />
          <h3>Graphic design</h3>
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
