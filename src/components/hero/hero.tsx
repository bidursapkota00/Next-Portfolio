import React from "react";
import { IoIosMail } from "react-icons/io";

import "./hero.css";
import Image from "next/image";

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

      <Image
        className="absolute right-0 bottom-0 w-[70%] h-[100svh] z-0 object-cover"
        src="/images/bg.jpg"
        alt="Background Image"
        width={1000}
        height={1500}
      />
    </section>
  );
}
