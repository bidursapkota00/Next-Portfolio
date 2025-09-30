import React from "react";
import { notFound } from "next/navigation";
import ReadmeReader from "@/components/blog/readme-reader";
import Sidebar from "@/components/sidebar/sidebar";
import { blogs } from "@/utils/data/blogs";
import ToggleFullScreen from "./toggle-full-screen";
import { Link as LinkIcon } from "lucide-react";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    blog: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { blog: string };
}) {
  const blog = blogs.find((b) => b.slug === params.blog);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} – Blog by Bidur Sapkota`,
    description: `${blog.description}`,
  };
}

interface BlogDetailPageProps {
  params: {
    blog: string;
  };
}

export default async function Blog({ params }: BlogDetailPageProps) {
  const slug = params.blog;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  try {
    const response = await fetch(`${blog.baseUrl}/${blog.url}`);
    if (!response.ok) {
      notFound();
    }
    const markdown = await response.text();
    const [heading, rest] = splitHeadingAndRest(markdown);

    return (
      <>
        <ToggleFullScreen />
        <Sidebar />
        <h1 className="m-5 text-5xl font-bold mb-4 border-b pb-2 break-words">
          {heading}
        </h1>
        <a
          href={blog.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex mr-5 items-center justify-end gap-2 text-blue-600 hover:text-blue-800 underline"
        >
          <LinkIcon className="w-4 h-4" />
          Github Link
        </a>
        <ReadmeReader baseUrl={blog.baseUrl} markdown={rest || ""} />
        {/* <OtherBlogs slug={slug} /> */}
      </>
    );
  } catch (err) {
    notFound();
  }
}

function splitHeadingAndRest(str: string) {
  const firstNewlineIndex = str.indexOf("\n"); // find the first newline
  let firstLine, rest;

  if (firstNewlineIndex === -1) {
    // no newline at all
    firstLine = str;
    rest = "";
  } else {
    firstLine = str.slice(0, firstNewlineIndex);
    rest = str.slice(firstNewlineIndex + 1);
  }

  if (firstLine.startsWith("# ")) {
    return [firstLine.split("# ")[1].trim(), rest.trim()];
  }
  return [null, str.trim()];
}

function OtherBlogs({ slug }: { slug: string }) {
  return (
    <div className="mb-8 mt-[80px] pt-12 border-t border-gray-400">
      <h2 className="text-4xl font-semibold text-gray-900 mb-6">Other Blogs</h2>
      <div className="mt-[50px] pb-8 grid gap-5 grid-cols-1 xs500:grid-cols-2 xl1200:grid-cols-3">
        {blogs
          .filter((b) => b.slug !== slug)
          .slice(0, 3)
          .map((relatedBlog, index) => (
            <h1 key={relatedBlog.slug}>{relatedBlog.title}</h1>
          ))}
      </div>
    </div>
  );
}
