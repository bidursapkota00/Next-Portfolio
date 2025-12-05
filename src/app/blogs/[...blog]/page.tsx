import React from "react";
import { notFound } from "next/navigation";
import ReadmeReader from "@/components/blog/readme-reader";
import Sidebar from "@/components/sidebar/sidebar";
import { blogs } from "@/utils/data/blogs";
import ToggleFullScreen from "./toggle-full-screen";
import { Link as LinkIcon } from "lucide-react";
import Card from "../card";

export async function generateStaticParams() {
  const params: { blog: string[] }[] = [];

  blogs.forEach((b) => {
    if (b.divisionSlug) {
      params.push({ blog: [b.slug, b.divisionSlug] });
    }
    params.push({ blog: [b.slug] });
  });

  return Array.from(new Map(params.map((p) => [p.blog.join("/"), p])).values());
}

export async function generateMetadata({
  params,
}: {
  params: { blog: string[] };
}) {
  const segments = params.blog;
  const [slug, divisionSlug] = segments;

  let blog;

  if (divisionSlug) {
    blog = blogs.find(
      (b) => b.slug === slug && b.divisionSlug === divisionSlug
    );
  } else {
    blog = blogs.find((b) => b.slug === slug);
  }

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  if (divisionSlug) {
    return {
      title: `${blog.title} – Blogs by Bidur Sapkota`,
      description: blog.description,
    };
  }

  return {
    title: `${blog.categoryTitle} – Blog by Bidur Sapkota`,
    description: blog.categoryDescription,
  };
}

interface BlogDetailPageProps {
  params: {
    blog: string[];
  };
}

export default async function Blog({ params }: BlogDetailPageProps) {
  const [slug, divisionSlug] = params.blog;

  let blogOrBlogs;

  blogOrBlogs = blogs.filter((b) => b.slug === slug);

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
                  categories={b.divisionCategory}
                />
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }

  if (divisionSlug && blog.divisionSlug) {
    blog = blogOrBlogs.find(
      (b) => b.divisionSlug === divisionSlug
    ) as typeof blog;
    if (!blog) {
      notFound();
    }
  }

  try {
    const response = await fetch(`${blog.baseUrl}/${blog.url}`, {
      next: {
        tags: ["blog", `${blog.slug}/${divisionSlug || ""}`],
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

        <h1 className="m-5 text-[2.5rem] leading-[2.75rem] py-4 font-bold mb-4 border-b pb-2 break-words">
          {heading}
        </h1>

        <div className="flex justify-end mx-5">
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
