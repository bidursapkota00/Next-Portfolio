import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import Project from "./project";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title:
      "Projects by Bidur Sapkota – Full-Stack Developer & Lecturer | React, Node, Next.js | Nepal",
    description:
      "Discover full-stack web and app development projects by Bidur Sapkota, featuring React, Node.js, Next.js, and other modern technologies.",
  };
}

export default function Works() {
  return (
    <>
      <Sidebar />
      <Project />
    </>
  );
}
