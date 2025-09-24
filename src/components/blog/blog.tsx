import React from "react";

import "./blog.css";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { threeBlogs } from "@/utils/data/blogs";
import RecentBlog from "@/app/blogs/card";

export default function Blog() {
  return (
    <section id="blog" className="section">
      <span className="section__title">My Blog</span>
      <span className="section__subtitle">Recent Blog</span>

      <div className="project__container">
        {threeBlogs.map((b, i) => {
          return (
            <RecentBlog
              key={i}
              title={b.shortTitle}
              image={b.image}
              slug={b.slug}
              categories={b.category}
            />
          );
        })}
      </div>

      <Link
        href="/blogs"
        className="mt-10 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 group"
      >
        <span>See All Blogs</span>
        <ExternalLink
          size={20}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      </Link>
    </section>
  );
}
