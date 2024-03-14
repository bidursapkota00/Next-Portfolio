import React from "react";
import { IoIosMail } from "react-icons/io";

import "./hero.css";

export default function Hero() {
  return (
    <section id="hero">
      <h1 className="hero__name">
        Hi!
        <br />I am Bidur
      </h1>
      <h1 className="hero__job">
        Hi!
        <br />I am Developer
      </h1>
      <div className="hero__description">
        <h2 className="hero__edu">
          Electronics, Communication & Information Engineer
        </h2>
        <a href="#contact" className="hero__btn">
          contact me <IoIosMail size={20} />
        </a>
      </div>
    </section>
  );
}
