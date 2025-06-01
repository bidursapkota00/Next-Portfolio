"use client";

import React, { useState } from "react";
import { Eye, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecentWork({
  image = "/images/cover_bg_1.jpg",
  title = "WORK 01",
  category = "Website",
  views = 100,
  likes = 49,
  slug = "slug1",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="project__card relative w-full max-w-sm aspect-square overflow-hidden rounded-lg cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/projects/${slug}`)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-300 ease-in-out ${
          isHovered ? "bg-blue-500/90" : "bg-transparent"
        }`}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Top Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{category}</p>
        </div>

        {/* Bottom Stats */}
        <div
          className={`flex items-center gap-4 transition-all duration-300 ease-in-out ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
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
    </div>
  );
}
