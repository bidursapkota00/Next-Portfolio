import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";

import "./accomplishment.css";

const accomplishment = [
  {
    title: "Hardware Model Exibition (First Position) - Yatra 4.0",
    images: ["/certificate.png"],
    date: "2023",
    startDate: "20 Jan 2023",
    endDate: "21 Jan 2023",
  },
];

export default function Accomplishment() {
  return (
    <section id="accomplishment" className="section">
      <span className="section__title">accomplishment</span>
      <span className="section__subtitle">my accomplishment</span>

      <div className="accomplishment__container">
        {accomplishment.map((a, i) => (
          <div className="accomplishment__box" key={i}>
            <h2>
              {a.title} &nbsp;<span>{a.date}</span>
            </h2>
            <div>
              <FaPenToSquare size={18} color="#ffffff" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
