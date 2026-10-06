"use client";

import { useEffect, useState } from "react";
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (!initialData) return <div>Blog not found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
      <BlogForm initialData={initialData} isEdit={true} />
    </div>
  );
}
