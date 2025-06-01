import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { colors } from "@/utils/colors";

import "./experience.css";

export default function Experience() {
  const experiences = [
    {
      jobTitle: "Web Developer",
      organization: "Dallotech pvt. ltd.",
      description: [
        "Develop full stack websites with Nextjs",
        "Worked on projects like Pdf generation, Webflow, Landing Pages, Online job Application",
        "GSAP Animations, FullStack Development",
        "Convert figma design to code",
        "API Integration",
      ],
      startDate: "Oct 2021",
      endDate: "Jun 2022",
    },
    {
      jobTitle: "Lecturer",
      organization: "Asian College of Higher Studies",
      description: [
        "Preparing and delivering lectures, tutorials, workshops, and seminars.",
        "Collaborating with other academics to improve teaching methods and knowledge base.",
        "Setting and grading assignments, tests, and exams.",
        "Supervising students on their projects.",
        "Providing support to students and other colleagues.",
        "Staying current by reading widely and producing published work in the field.",
      ],
      startDate: "May 2023",
      endDate: "Now",
    },
    {
      jobTitle: "Web Development Trainer",
      organization: "Asian College of Higher Studies",
      description: [
        "Preparing codes for HTML, CSS, Js, Ts, React, Node, Express, Database",
        "Fostering project based learning",
        "Staying current by reading widely and producing published work in the field.",
      ],
      startDate: "May 2023",
      endDate: "Now",
    },
    {
      jobTitle: "Teaching Assistant",
      organization: "National College of Engineering",
      description: [
        "Delivering lab lectures and tutorials",
        "Setting and grading assignments, tests, and exams.",
        "Providing support to students and other colleagues.",
      ],
      startDate: "May 2025",
      endDate: "Now",
    },
  ];
  return (
    <section id="experience" className="section">
      <span className="section__title">experience</span>
      <span className="section__subtitle">work experience</span>

      <div className="exp__container">
        {experiences.map((e, i) => (
          <div className="exp__box" key={i}>
            <h2>
              {e.jobTitle}{" "}
              <span>
                {e.startDate.split(" ").reverse()[0]}&nbsp;-&nbsp;
                {e.endDate.split(" ").reverse()[0]}
              </span>
            </h2>
            <h3>{e.organization}</h3>
            {e.description.map((d) => (
              <p>{d}</p>
            ))}
            <div style={{ background: colors[i % 6] }}>
              <FaPenToSquare size={18} color="#ffffff" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
