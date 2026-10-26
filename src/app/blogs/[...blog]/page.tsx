import React from "react";
import { notFound } from "next/navigation";
import ReadmeReader from "@/components/blog/readme-reader";
import Sidebar from "@/components/sidebar/sidebar";
import connectDB from "@/utils/db";
import BlogModel from "@/models/Blog";
import ToggleFullScreen from "./toggle-full-screen";
import { Link as LinkIcon } from "lucide-react";
import Card from "../card";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    await connectDB();
    const blogs = await BlogModel.find({}, { slug: 1, divisionSlug: 1 }).lean();
    const params: { blog: string[] }[] = [];

    blogs.forEach((b) => {
      if (b.divisionSlug) {
        params.push({ blog: [b.slug, b.divisionSlug] });
      }
      params.push({ blog: [b.slug] });
    });

    return Array.from(new Map(params.map((p) => [p.blog.join("/"), p])).values());
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { blog: string[] };
}) {
  try {
    const segments = params.blog;
    const [slug, divisionSlug] = segments;

    await connectDB();
    let blog;

    if (divisionSlug) {
      blog = await BlogModel.findOne({
        slug,
        divisionSlug,
      }).lean();
    } else {
      blog = await BlogModel.findOne({ slug }).lean();
    }

    if (!blog) {
      return {
        title: "Blog Not Found",
      };
    }

    if (!divisionSlug && blog.divisionSlug) {
      return {
        title: `${blog.categoryTitle} – Blog by Bidur Sapkota`,
        description: blog.categoryDescription,
      };
    }

    return {
      title: `${blog.title} – Blogs by Bidur Sapkota`,
      description: blog.description,
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Blog Not Found",
    };
  }
}

interface BlogDetailPageProps {
  params: {
    blog: string[];
  };
}

export default async function Blog({ params }: BlogDetailPageProps) {
  const [slug, divisionSlug] = params.blog;

  await connectDB();
  const blogOrBlogs = await BlogModel.find({ slug }).lean();

  if (!blogOrBlogs.length) {
    notFound();
  }

  let blog = blogOrBlogs[0];

  if (!divisionSlug && blog.divisionSlug) {
    return (
      <>
        <Sidebar />
        <div className="relative">
          <section id="work" className="section" style={{ marginTop: "20px" }}>
            <span className="section__title">My Blog</span>
            <span className="section__subtitle">{blog.categorySubTitle}</span>

            <div className="mt-[50px] pb-8 grid gap-5 grid-cols-1 xs500:grid-cols-2 xl1200:grid-cols-3">
              {blogOrBlogs.map((b) => (
                <Card
                  key={`${b.slug}-${b.divisionSlug}`}
                  title={b.shortTitle}
                  pageTitle={b.title}
                  image={b.image}
                  slug={`${b.slug}/${b.divisionSlug}`}
                  categories={b.divisionCategory || []}
                />
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }

  if (divisionSlug) {
    const matchedBlog = blogOrBlogs.find(
      (b) => b.divisionSlug === divisionSlug
    );
    if (!matchedBlog) {
      notFound();
    }
    blog = matchedBlog;
  }

  try {
    const cacheTags = divisionSlug
      ? ["blog", blog.slug, `${blog.slug}/${divisionSlug}`]
      : ["blog", blog.slug];

    const response = await fetch(`${blog.baseUrl}/${blog.url}`, {
      next: {
        tags: cacheTags,
      },
    });

    if (!response.ok) {
      notFound();
    }

    const markdown = await response.text();
    const [heading, rest] = splitHeadingAndRest(markdown);

    return (
      <>
        <style>
          {`
            footer {
              margin-top: 50px;
            }
          `}
        </style>

        <ToggleFullScreen />
        <Sidebar />

        <div className="markdown-body px-5 pt-5">
          <h1 className="text-[2em] font-semibold my-[.67em] pb-[.3em] border-b border-[#d1d9e0b3] break-words">
            {heading}
          </h1>

          <div className="flex justify-end mb-4">
            <a
              href={blog.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline text-lg"
            >
              <LinkIcon className="w-4 h-4" />
              Github Link
            </a>
          </div>
        </div>

        <ReadmeReader baseUrl={blog.baseUrl} markdown={rest || ""} />
      </>
    );
  } catch (err) {
    notFound();
  }
}

function splitHeadingAndRest(str: string) {
  const firstNewlineIndex = str.indexOf("\n");
  let firstLine, rest;

  if (firstNewlineIndex === -1) {
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
