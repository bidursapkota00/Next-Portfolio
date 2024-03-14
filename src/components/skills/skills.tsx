import React from "react";
import "./skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <span className="section__title">my speciality</span>
      <span className="section__subtitle">my skills</span>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
        tempora molestias placeat atque, repellat nihil! Iusto sequi earum autem
        libero ullam! Natus est recusandae corporis maiores, nostrum totam illum
        at.
      </p>
      <div className="skill__box">
        <div className="skill">
          <span>Photoshop</span>
          <div className="skill__percent__box">
            <div className="skill__percent">
              <span>75%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>React Js</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "60%", background: "#ec5453", color: "#ec5453" }}
            >
              <span>60%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>HTML5</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "85%", background: "#f9bf3f", color: "#f9bf3f" }}
            >
              <span>85%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>CSS3</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "90%", background: "#a84cb8", color: "#a84cb8" }}
            >
              <span>90%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>Next Js</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "70%", background: "#2fa499", color: "#2fa499" }}
            >
              <span>70%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>SEO</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "80%", background: "#4054b2", color: "#4054b2" }}
            >
              <span>80%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
