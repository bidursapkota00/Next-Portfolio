import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import { Metadata } from "next";
import BlogList from "./blog-list";
import connectDB from "@/utils/db";
import BlogModel from "@/models/Blog";
import { IBlogs } from "@/utils/data/blogs";
import { AlertCircle, RotateCcw } from "lucide-react";

export function generateMetadata(): Metadata {
  return {
    title:
      "Programming & Tech Blogs by Bidur Sapkota | Learn React, Next.js, NestJS, TypeScript, JavaScript, Git, TailwindCSS, Design Patterns, System Design & More",
    description:
      "Explore complete programming guides and tutorials by Bidur Sapkota on modern full-stack development. Learn React, Next.js, NestJS, TypeScript, JavaScript, Git, TailwindCSS, HTML, CSS, Markdown, Design Patterns, System Design, DSA and more with step-by-step practical examples.",
  };
}

export default async function Blogs() {
  let blogs: IBlogs[] | null = null;
  let isDbError = false;

  try {
    await connectDB();
    const dbBlogs = await BlogModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
    blogs = JSON.parse(JSON.stringify(dbBlogs));
  } catch (error) {
    console.error("Database connection error in /blogs:", error);
    isDbError = true;
  }

  if (isDbError || blogs === null) {
    return (
      <>
        <Sidebar />
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center p-8 bg-white rounded-xl shadow-sm border border-red-200">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Server Error
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Unable to reach the database server. Please try again later.
            </p>
            <a
              href="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Retry
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <BlogList initialBlogs={blogs} />
    </>
  );
}


