import React from "react";

import "./project.css";
import Card from "../../components/ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Dallotech",
    for: "Website",
    expertise: "Company Website",
    description: [
      "Fully dynamic fullStack development of a company landing page",
    ],
    link: "https://dallotech.com/",
    image: "/images/dallotech.png",
  },
  {
    title: "Online Job App",
    for: "Website",
    expertise: "Entire Frontend",
    description: [
      "Created overall frontend for job application website",
      "Implemented user friendly Forms for job posting and applying",
      "API integration with backend",
    ],
    link: "https://www.evereuser.co.uk/",
    image: "/images/everest.png",
  },
  {
    title: "Codeyalaya",
    for: "Website",
    expertise: "Online coding institute",
    description: [
      "Create video lessons and start / end code files for each lessons",
      "Students can buy and watch courses through website or mobile app",
      "Integrated payment system",
    ],
    link: "https://github.com/bidursapkota00/codeyalaya-web-frontend",
    image: "/images/dallotech.png",
  },
  {
    title: "Smart Water Meter",
    for: "Website | Android | IoT",
    expertise: "College Major Project",
    description: [
      "Circuit design and implementation for measuring household drinking water consumption",
      "Apk Development with integrated khalti payment gateway for clients",
      "Web Development with dashboard for water service providers",
    ],
    link: "https://github.com/bidursapkota00/Major-Project",
    image: "/images/dallotech.png",
  },

  {
    title: "UrbanSpace",
    for: "Website",
    expertise: "Animations",
    description: [
      "Developed a landing page for a Hotel",
      "Animation with GSAP",
    ],
    link: "https://urbanspace.com.np/",
    image: "/images/dallotech.png",
  },
];

export default function Project() {
  return (
    <section id="work" className="section">
      <span className="section__title">My Work</span>
      <span className="section__subtitle">Recent Work</span>

      <div className="project__container">
        {projects.map((p, i) => {
          return (
            <Card
              key={i}
              title={p.title}
              category={p.for}
              views={Math.ceil(Math.random() * 100 + 60)}
              likes={Math.ceil(Math.random() * 50)}
              image={p.image}
              slug="id1"
            />
          );
        })}
      </div>
    </section>
  );
}
