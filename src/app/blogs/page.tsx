import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import Project from "./project";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title:
      "Programming & Tech Blogs by Bidur Sapkota | Learn React, Next.js, NestJS, TypeScript, JavaScript, Git, TailwindCSS, Design Patterns, System Design & More",
    description:
      "Explore complete programming guides and tutorials by Bidur Sapkota on modern full-stack development. Learn React, Next.js, NestJS, TypeScript, JavaScript, Git, TailwindCSS, HTML, CSS, Markdown, Design Patterns, System Design, DSA and more with step-by-step practical examples.",
  };
}

export default function Blogs() {
  return (
    <>
      <Sidebar />
      <Project />
    </>
  );
}
