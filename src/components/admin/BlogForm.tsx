"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IBlogs } from "@/utils/data/blogs";
import { Upload, X, Loader2 } from "lucide-react";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
}

function ImageUploadField({
  label,
  value,
  onChange,
  required,
  placeholder,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";
    setIsUploading(true);
    setUploadError(null);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error || "Failed to upload image to Cloudinary");
      } else {
        onChange(json.url);
      }
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setUploadError("Network error occurred during image upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Upload Button */}
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-3.5 py-2 border border-blue-600 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 transition shadow-sm disabled:opacity-50 shrink-0"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          ) : (
            <Upload className="w-4 h-4 text-blue-600" />
          )}
          {isUploading ? "Uploading to Cloudinary..." : "Upload to Cloudinary"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Text Input for URL */}
        <div className="w-full flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder || "https://res.cloudinary.com/... or paste image URL"}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {uploadError && (
        <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {uploadError}
        </p>
      )}

      {/* Image Preview */}
      {value && (
        <div className="flex items-center gap-3 pt-1">
          <div className="relative group border border-gray-200 bg-gray-50 rounded-lg p-1 max-w-xs shadow-sm overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Image Preview"
              className="h-28 w-auto max-w-xs object-cover rounded"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-600 hover:text-red-800 underline inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Remove image
          </button>
        </div>
      )}
    </div>
  );
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
      label: "Category Image",
      type: "image",
      placeholder: "Upload category image or paste URL",
    },
    {
      name: "categorySubTitle",
      label: "Category Sub Title",
      type: "text",
      placeholder: "e.g., Web Application Programming",
    },
    {
      name: "image",
      label: "Blog Image *",
      type: "image",
      required: true,
      placeholder: "Upload blog cover image or paste URL",
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
            className={
              field.type === "textarea" || field.type === "image"
                ? "md:col-span-2"
                : ""
            }
          >
            {field.type === "image" ? (
              <ImageUploadField
                label={field.label}
                value={(formData as any)[field.name] || ""}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, [field.name]: url }))
                }
                required={field.required}
                placeholder={field.placeholder}
              />
            ) : (
              <>
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
              </>
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
