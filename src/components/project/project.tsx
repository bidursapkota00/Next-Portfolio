import React from "react";

import "./project.css";
import Card from "./card";
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
  },
];

export default function Project() {
  return (
    <section id="work" className="section">
      <span className="section__title">My Work</span>
      <span className="section__subtitle">Recent Work</span>

      <div className="project__container">
        {projects.map((p, i) => {
          if (i > 2) return;
          return (
            <Card
              key={i}
              title={p.title}
              category={p.for}
              views={Math.ceil(Math.random() * 100 + 60)}
              likes={Math.ceil(Math.random() * 50)}
              slug="id1"
            />
          );
        })}
      </div>

      <Link
        href="/works"
        className="mt-10 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 group"
      >
        <span>See All Works</span>
        <ExternalLink
          size={20}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      </Link>
    </section>
  );
}
