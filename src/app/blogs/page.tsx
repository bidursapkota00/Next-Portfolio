import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import { Metadata } from "next";
import BlogList from "./blog-list";
import connectDB from "@/utils/db";
import BlogModel from "@/models/Blog";
import { blogs as fallbackBlogs, IBlogs } from "@/utils/data/blogs";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return {
    title:
      "Programming & Tech Blogs by Bidur Sapkota | Learn React, Next.js, NestJS, TypeScript, JavaScript, Git, TailwindCSS, Design Patterns, System Design & More",
    description:
      "Explore complete programming guides and tutorials by Bidur Sapkota on modern full-stack development. Learn React, Next.js, NestJS, TypeScript, JavaScript, Git, TailwindCSS, HTML, CSS, Markdown, Design Patterns, System Design, DSA and more with step-by-step practical examples.",
  };
}

export default async function Blogs() {
  let blogs: IBlogs[] = [];

  try {
    await connectDB();
    const dbBlogs = await BlogModel.find({}).sort({ createdAt: -1 }).lean();
    if (dbBlogs && dbBlogs.length > 0) {
      blogs = JSON.parse(JSON.stringify(dbBlogs));
    } else {
      blogs = fallbackBlogs;
    }
  } catch (error) {
    console.error("Failed to fetch blogs from database, using fallback data:", error);
    blogs = fallbackBlogs;
  }

  return (
    <>
      <Sidebar />
      <BlogList initialBlogs={blogs} />
    </>
  );
}

