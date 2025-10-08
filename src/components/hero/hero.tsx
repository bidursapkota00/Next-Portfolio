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

      <div className="hero__description hero__description2">
        <h2 className="hero__edu">
          Lecturer | Full Stack Developer | React | Node | TypeScript
        </h2>
        <a href="#contact" className="hero__btn">
          contact me <IoIosMail size={20} />
        </a>
      </div>

      <div className="absolute right-0 bottom-0 w-[80%] h-[100svh] z-0 hero__img">
        <Image
          className="object-cover"
          src="/images/bg.jpg"
          alt="Bidur Sapkota Cover Photo"
          title="Bidur Sapkota - Developer"
          fill
        />
      </div>
    </section>
  );
}
