"use client";

import React from "react";
import { Eye, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RecentWork({
  image = "/images/cover_bg_1.jpg",
  title = "WORK 01",
  category = "Website",
  views = 100,
  likes = 49,
  slug = "slug1",
}) {
  const router = useRouter();

  return (
    <div
      className="group relative w-full max-w-sm overflow-hidden rounded-lg cursor-pointer"
      onClick={() => router.push(`/projects/${slug}`)}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={`${title} Image`}
        width={683}
        height={384}
        className="min-h-[160px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 transition-all duration-300 ease-in-out bg-transparent group-hover:bg-blue-500/90" />

      <div className="absolute top-0 left-0 flex flex-col justify-between p-6">
        {/* Top Content */}
        <div className="transition-all duration-300 ease-in-out opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{category}</p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-0 left-0 p-6 flex items-center gap-4 transition-all duration-300 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1 flex items-center gap-2">
            <Eye size={14} className="text-white" />
            <span className="text-white text-sm font-medium">{views}</span>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1 flex items-center gap-2">
            <Heart size={14} className="text-white" />
            <span className="text-white text-sm font-medium">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
