"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RecentBlog({
  image = "/images/cover_bg_1.jpg",
  title = "WORK 01",
  pageTitle = "",
  category = "Website",
  categories = ["nextjs"],
  slug = "slug1",
}) {
  const router = useRouter();

  return (
    <Link
      className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
      href={`/blogs/${slug}`}
    >
      {/* Title and Category */}
      <div className="p-4 pb-2">
        <h3 className="text-gray-900 text-xl font-semibold mb-1">{title}</h3>
      </div>

      {/* Image */}
      <div className="border-t border-b border-gray-200 bg-gray-50 p-1">
        <Image
          src={image}
          alt={`${title} Image`}
          title={`${pageTitle} – Blog by Bidur Sapkota`}
          width={683}
          height={384}
          className="w-full object-fit rounded-[12px]"
        />
      </div>

      {/* Tags */}
      <div className="p-4 pt-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((tech, index) => (
            <span
              key={`tech-${index}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 capitalize"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
