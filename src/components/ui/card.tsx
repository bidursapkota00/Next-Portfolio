"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RecentWork({
  image = "/images/cover_bg_1.jpg",
  title = "WORK 01",
  category = "Website",
  techCategory = ["nextjs"],
  serviceCategory = ["full-stack"],
  slug = "slug1",
}) {
  const router = useRouter();

  return (
    <Link
      className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
      href={`/works/${slug}`}
    >
      {/* Title and Category */}
      <div className="p-4 pb-2">
        <h3 className="text-gray-900 text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{category}</p>
      </div>

      {/* Image */}
      <div className="border-t border-b border-gray-200 bg-gray-50 p-1">
        <Image
          src={image}
          alt={`${title} Image`}
          width={683}
          height={384}
          className="w-full object-fit rounded-[12px]"
        />
      </div>

      {/* Tags */}
      <div className="p-4 pt-3">
        <div className="flex flex-wrap gap-2">
          {techCategory.map((tech, index) => (
            <span
              key={`tech-${index}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 capitalize"
            >
              {tech}
            </span>
          ))}
          {serviceCategory.map((service, index) => (
            <span
              key={`service-${index}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
