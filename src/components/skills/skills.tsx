import React from "react";
import "./skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <span className="section__title">my speciality</span>
      <span className="section__subtitle">my skills</span>
      <div className="skill__box">
        <div className="skill">
          <span>HTML5</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "80%", background: "#ec5453", color: "#ec5453" }}
            >
              <span>80%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>CSS3</span>
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
          <span>Next.js, React.js and JavaScript</span>
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
          <span>React Native</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "80%", background: "#2fa499", color: "#2fa499" }}
            >
              <span>80%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>Python, Fastapi, Django</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "75%", background: "#4054b2", color: "#4054b2" }}
            >
              <span>75%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>Node Js</span>
          <div className="skill__percent__box">
            <div className="skill__percent" style={{ width: "80%" }}>
              <span>80%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>SQL</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "90%", background: "#ec5453", color: "#ec5453" }}
            >
              <span>90%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>JAVA</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "75%", background: "#f9bf3f", color: "#f9bf3f" }}
            >
              <span>75%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>Flutter & Dart</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "70%", background: "#a84cb8", color: "#a84cb8" }}
            >
              <span>70%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>Data Structure and Algorithm</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "80%", background: "#2fa499", color: "#2fa499" }}
            >
              <span>80%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>System Design</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "65%", background: "#4054b2", color: "#4054b2" }}
            >
              <span>65%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>SEO</span>
          <div className="skill__percent__box">
            <div className="skill__percent" style={{ width: "45%" }}>
              <span>45%</span>
            </div>
          </div>
        </div>
        <div className="skill">
          <span>Photoshop</span>
          <div className="skill__percent__box">
            <div
              className="skill__percent"
              style={{ width: "40%", background: "#ec5453", color: "#ec5453" }}
            >
              <span>40%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
