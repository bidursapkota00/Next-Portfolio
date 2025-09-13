import ReadmeReader from "@/components/blog/readme-reader";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function Blog() {
  return (
    <>
      <Sidebar />
      <ReadmeReader url="https://raw.githubusercontent.com/bidursapkota00/Design-Patterns/refs/heads/main/README.md" />
    </>
  );
}
