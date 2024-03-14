import React from "react";
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
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
            magni! Culpa, quaerat eveniet excepturi fuga dolore, voluptatem
            dolorum vero esse odit earum ipsa! Odio hic id obcaecati? Nostrum,
            laboriosam odio.
          </p>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div className="exp__box">
          <h2>
            Lecturer <span>2022-Now</span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
            magni! Culpa, quaerat eveniet excepturi fuga dolore, voluptatem
            dolorum vero esse odit earum ipsa! Odio hic id obcaecati? Nostrum,
            laboriosam odio.
          </p>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
