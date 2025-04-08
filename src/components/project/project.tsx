import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";

import "./project.css";

const projects = [
  {
    title: "Codeyalaya",
    expertise: "Online coding institute",
    description: [
      "Video lessons and start / end code files for each lessons",
      "Students can buy and watch courses through website or mobile app",
      "Integrated payment system",
    ],
    link: "https://codeyalaya.bidursapkota.com.np/",
  },
  {
    title: "Smart Water Meter",
    expertise: "College Major Project",
    description: [
      "Circuit design and implementation for measuring household drinking water consumption",
      "Apk Development with integrated khalti payment gateway for clients",
      "Web Development with dashboard for water service providers",
    ],
    link: "",
  },
  {
    title: "Online Job App",
    expertise: "Entire Frontend",
    description: [
      "Created overall frontend for job application website",
      "Implemented user friendly Forms for job posting and applying",
      "API integration with backend",
    ],
    link: "https://www.evereuser.co.uk/",
  },
  {
    title: "Dallotech",
    expertise: "Company Website",
    description: [
      "Fully dynamic fullStack development of a company landing page",
    ],
    link: "https://dallotech.com/",
  },
  {
    title: "UrbanSpace",
    expertise: "Animations",
    description: [
      "Developed a landing page for a Hotel",
      "Animation with GSAP",
    ],
    link: "https://urbanspace.com.np/",
  },
];

export default function Project() {
  return (
    <section id="project" className="section">
      <span className="section__title">project</span>
      <span className="section__subtitle">my project</span>

      <div className="project__container">
        {projects.map((p, i) => (
          <div className="project__box" key={i}>
            {p.link ? (
              <a href={p.link}>
                <h2>{p.title}</h2>
                <HiExternalLink size={22} color="#222" />
              </a>
            ) : (
              <h2>{p.title}</h2>
            )}
            <h3>{p.expertise}</h3>
            {p.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
            <div>
              <FaPenToSquare size={18} color="#ffffff" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
