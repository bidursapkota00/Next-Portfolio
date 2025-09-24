import React from "react";
import { notFound } from "next/navigation";
import ReadmeReader from "@/components/blog/readme-reader";
import Sidebar from "@/components/sidebar/sidebar";
import { blogs } from "@/utils/data/blogs";

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

    return (
      <>
        <Sidebar />
        <ReadmeReader baseUrl={blog.baseUrl} markdown={markdown} />
        <OtherBlogs slug={slug} />
      </>
    );
  } catch (err) {
    notFound();
  }
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
