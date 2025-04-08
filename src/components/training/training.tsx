import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";

import "./training.css";

const trainings = [
  {
    title: "The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert",
    organization: "Udemy",
    github: "https://github.com/bidursapkota00/sql",
  },
  {
    title: "FastAPI - The Complete Course 2025 (Beginner + Advanced)",
    organization: "Udemy",
    github: "https://github.com/bidursapkota00/fastapi",
  },
  {
    title: "Build a Backend REST API with Python & Django - Advanced",
    organization: "Udemy",
    github:
      "https://github.com/bidursapkota00/Build-a-Backend-REST-API-with-Python-Django---Advanced",
  },
  {
    title: "The Ultimate Java Mastery Series",
    organization: "codewithmosh.com",
    github: "https://github.com/bidursapkota00/java-mastery",
  },
  {
    title: "Next Auth V5 - Advanced Guide",
    organization: "Youtube",
    github: "https://github.com/bidursapkota00/next-auth-v5-advanced-guide",
  },
  {
    title: "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
    organization: "Udemy",
    github: "",
  },
  {
    title: "Next JS: The Complete Developer's Guide",
    organization: "Udemy",
    github: "",
  },
  {
    title: "Flutter & Dart - The Complete Guide",
    organization: "Udemy",
    github: "",
  },
  {
    title: "Basic Python",
    organization: "Tech Axis",
    github: "",
  },
  // {
  //   title: "Machine Learning A-Z: AI, Python & R + ChatGPT Prize",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Complete Data Science,Machine Learning,DL,NLP Bootcamp",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "GitHub Actions - The Complete Guide",
  //   organization: "Udemy",
  //   github: "",
  // },
  {
    title: "Algorithms & Data Structures for Beginners",
    organization: "neetcode.io",
    github: "",
  },
  // {
  //   title: "Advanced Algorithms",
  //   organization: "neetcode.io",
  //   github: "",
  // },
  {
    title: "Full Stack Development",
    organization: "neetcode.io",
    github: "",
  },
  {
    title: "System Design for Beginners",
    organization: "neetcode.io",
    github: "",
  },
  // {
  //   title: "Docker & Kubernetes: The Practical Guide",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Python Django The Practical Guide",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Adobe Photoshop CC - Essentials Training Course",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Design Patterns in Python",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "The Ultimate Design Patterns Series",
  //   organization: "codewithmosh.com",
  //   github: "",
  // },
  // {
  //   title: "NestJS - Building Real Project API From Scratch",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "NestJs Modern ways to build APIs with Typescript and NestJs",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Become a Three.js developer",
  //   organization: "threejs-journey.com - Bruno Simon",
  //   github: "",
  // },
  // {
  //   title: "Complete Modern PHP Developer Course",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Master Laravel 10 for Beginners & Intermediate",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Linux Shell Scripting A Project-Based Approach to Learning",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Complete Generative AI Course With Langchain and Huggingface",
  //   organization: "Udemy",
  //   github: "",
  // },
  // {
  //   title: "Figma UI UX Design Essentials",
  //   organization: "Udemy",
  //   github: "",
  // },
  // devops
  // seo
  // java spring boot
  // diffusion model
];

export default function Training() {
  return (
    <section id="training" className="section">
      <span className="section__title">training</span>
      <span className="section__subtitle">my training</span>

      <div className="train__container">
        {trainings.map((t, i) => (
          <div className="train__box" key={i}>
            {t.github ? (
              <a href={t.github}>
                <h2>{t.title}</h2>
                <HiExternalLink size={22} color="#222" />
              </a>
            ) : (
              <h2>{t.title}</h2>
            )}
            <h3>{t.organization}</h3>
            <div>
              <FaPenToSquare size={18} color="#ffffff" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
