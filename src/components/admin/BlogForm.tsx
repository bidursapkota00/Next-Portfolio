"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IBlogs } from "@/utils/data/blogs";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<IBlogs>>(
    initialData || {
      baseUrl: "",
      url: "",
      title: "",
      shortTitle: "",
      slug: "",
      github: "",
      description: "",
      category: [],
      image: "",
    },
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (
      name === "category" ||
      name === "divisionCategory" ||
      name === "whatsNext"
    ) {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = isEdit
        ? `/api/admin/blogs/${initialData._id}`
        : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    {
      name: "baseUrl",
      label: "Base URL *",
      type: "text",
      required: true,
      placeholder:
        "e.g., https://raw.githubusercontent.com/user/repo/refs/heads/main",
    },
    {
      name: "url",
      label: "URL (Markdown File) *",
      type: "text",
      required: true,
      placeholder: "e.g., README.md",
    },
    {
      name: "title",
      label: "Title *",
      type: "text",
      required: true,
      placeholder: "e.g., HTML and CSS Complete Guide",
    },
    {
      name: "shortTitle",
      label: "Short Title *",
      type: "text",
      required: true,
      placeholder: "e.g., HTML CSS",
    },
    {
      name: "slug",
      label: "Slug *",
      type: "text",
      required: true,
      placeholder: "e.g., html-css-complete-guide",
    },
    {
      name: "github",
      label: "GitHub URL *",
      type: "text",
      required: true,
      placeholder: "e.g., https://github.com/user/repo",
    },
    {
      name: "youtube",
      label: "YouTube URL",
      type: "text",
      placeholder: "e.g., https://youtube.com/watch?v=...",
    },
    {
      name: "categoryTitle",
      label: "Category Title",
      type: "text",
      placeholder: "e.g., Web Application Programming Complete Guide",
    },
    {
      name: "categoryDescription",
      label: "Category Description",
      type: "textarea",
      placeholder: "e.g., Learn basics of web application programming...",
    },
    {
      name: "description",
      label: "Description *",
      type: "textarea",
      required: true,
      placeholder: "e.g., Master the fundamentals of HTML",
    },
    {
      name: "category",
      label: "Categories (comma separated) *",
      type: "text",
      required: true,
      isArray: true,
      placeholder: "e.g., HTML",
    },
    {
      name: "divisionSlug",
      label: "Division Slug",
      type: "text",
      placeholder: "e.g., html-css",
    },
    {
      name: "divisionCategory",
      label: "Division Categories (comma separated)",
      type: "text",
      isArray: true,
      placeholder: "e.g., HTML, CSS, JavaScript",
    },
    {
      name: "whatsNext",
      label: "What's Next (comma separated)",
      type: "text",
      isArray: true,
      placeholder: "e.g., Related blog link1, link2",
    },
    {
      name: "categoryDisplayTitle",
      label: "Category Display Title",
      type: "text",
      placeholder: "e.g., Web App Programming",
    },
    {
      name: "categoryImage",
      label: "Category Image URL",
      type: "text",
      placeholder: "e.g., /images/category-image.webp",
    },
    {
      name: "categorySubTitle",
      label: "Category Sub Title",
      type: "text",
      placeholder: "e.g., Web Application Programming",
    },
    {
      name: "image",
      label: "Image URL *",
      type: "text",
      required: true,
      placeholder: "e.g., /images/blog-post.webp",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formFields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={(formData as any)[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={
                  field.isArray
                    ? ((formData as any)[field.name] || []).join(", ")
                    : (formData as any)[field.name] || ""
                }
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
      </div>
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="mr-3 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
        </button>
      </div>
    </form>
  );
}
