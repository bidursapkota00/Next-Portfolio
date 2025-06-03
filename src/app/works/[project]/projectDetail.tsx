import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch, BookOpen, GraduationCap } from "lucide-react";
import { projects, IProject } from "@/utils/data/projects";
import RecentWork from "@/components/ui/card";
import React from "react";

const ProjectDetail = ({
  project,
  children,
}: {
  project: IProject;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Project Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
          {/* Project Header */}
          <div className="p-6 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {project.title}
            </h1>
            <p className="text-gray-600 text-sm">{project.for}</p>
          </div>

          {/* Project Image */}
          <div className="border-t border-b border-gray-200 bg-gray-50 p-1">
            <Image
              src={project.image}
              alt={project.title}
              width={683}
              height={384}
              className="w-full object-fit rounded-[12px]"
            />
          </div>

          {/* Technologies and Services */}
          <div className="p-6 pt-4">
            {/* What it is */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What it is?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.expertise}
                </p>
              </div>
              {/* Technologies */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techCategory.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200 capitalize"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.serviceCategory.map((service, index) => {
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200 capitalize"
                      >
                        {service}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Project Overview
            </h2>
            <div className="space-y-4">
              {project.description.map((desc, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {project.liveWebLink && (
            <a
              href={project.liveWebLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200 border border-blue-600"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              Source Code
            </a>
          )}

          {project.courseLink && (
            <a
              href={project.courseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-md transition-all duration-200 border border-green-600"
            >
              <BookOpen className="w-4 h-4" />
              Learn to Build this Project
            </a>
          )}

          {project.techCategory.map((t) => (
            <a
              key={t}
              href={`https://codeyalaya.bidursapkota.com.np/courses/${t
                .split(" ")
                .join("-")}-basics`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 hover:shadow-md transition-all duration-200 border border-purple-600 capitalize"
            >
              <GraduationCap className="w-4 h-4" />
              Learn {t} Basics
            </a>
          ))}
        </div>

        {/* Related Projects */}
        {children}

        <Link
          href="/works"
          className="mt-10 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 group"
        >
          <span>See All Works</span>
          <ExternalLink
            size={20}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
