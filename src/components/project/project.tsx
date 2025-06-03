import React from "react";

import "./project.css";
import Card from "../ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { threeProjects as projects } from "@/utils/data/projects";

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
              image={p.image}
              slug={p.slug}
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
