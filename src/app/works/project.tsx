"use client";

import { useMemo, useState } from "react";
import FilterAppBar from "./filter";
import "./project.css";
import Card from "../../components/ui/card";
import { Filter } from "lucide-react";

interface Project {
  title: string;
  for: string;
  expertise: string;
  description: string[];
  link: string;
  image: string;
  slug: string;
  techCategory: string[];
  serviceCategory: string[];
  views: number;
  likes: number;
}

const projects = [
  {
    title: "Dallotech",
    for: "Website",
    expertise: "Company Website",
    description: [
      "Fully dynamic fullStack development of a company landing page",
    ],
    link: "https://dallotech.com/",
    image: "/images/dallotech.png",
    slug: "dallotech",
    techCategory: ["nextjs"],
    serviceCategory: ["full-stack"],
    views: 142,
    likes: 23,
  },
  {
    title: "Online Job App",
    for: "Website",
    expertise: "Entire Frontend",
    description: [
      "Created overall frontend for job application website",
      "Implemented user friendly Forms for job posting and applying",
      "API integration with backend",
    ],
    link: "https://www.evereuser.co.uk/",
    image: "/images/everest.png",
    slug: "online-job-app",
    techCategory: ["nextjs"],
    serviceCategory: ["frontend"],
    views: 142,
    likes: 23,
  },
  {
    title: "Codeyalaya",
    for: "Website",
    expertise: "Online coding institute",
    description: [
      "Create video lessons and start / end code files for each lessons",
      "Students can buy and watch courses through website or mobile app",
      "Integrated payment system",
    ],
    link: "https://github.com/bidursapkota00/codeyalaya-web-frontend",
    image: "/images/dallotech.png",
    slug: "codeyalaya",
    techCategory: ["nextjs", "nodejs", "system design"],
    serviceCategory: ["full-stack"],
    views: 142,
    likes: 23,
  },
  {
    title: "Smart Water Meter",
    for: "Website | Android | IoT",
    expertise: "College Major Project",
    description: [
      "Circuit design and implementation for measuring household drinking water consumption",
      "Apk Development with integrated khalti payment gateway for clients",
      "Web Development with dashboard for water service providers",
    ],
    link: "https://github.com/bidursapkota00/Major-Project",
    image: "/images/dallotech.png",
    slug: "smart-water-meter",
    techCategory: ["nextjs", "react native"],
    serviceCategory: ["full-stack"],
    views: 142,
    likes: 23,
  },

  {
    title: "UrbanSpace",
    for: "Website",
    expertise: "Animations",
    description: [
      "Developed a landing page for a Hotel",
      "Animation with GSAP",
    ],
    link: "https://urbanspace.com.np/",
    image: "/images/dallotech.png",
    slug: "urbanspace",
    techCategory: ["nextjs"],
    serviceCategory: ["frontend"],
    views: 142,
    likes: 23,
  },
];

export default function Project() {
  const [techFilter, setTechFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("");

  const { allTechCategories, allServiceCategories } = useMemo(
    () => ({
      allTechCategories: Array.from(
        new Set(projects.flatMap((p) => p.techCategory))
      ),
      allServiceCategories: Array.from(
        new Set(projects.flatMap((p) => p.serviceCategory))
      ),
    }),
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTech =
        !techFilter || project.techCategory.includes(techFilter);
      const matchesService =
        !serviceFilter || project.serviceCategory.includes(serviceFilter);
      return matchesTech && matchesService;
    });
  }, [techFilter, serviceFilter]);

  return (
    <div className="relative">
      <FilterAppBar
        techFilter={techFilter}
        setTechFilter={setTechFilter}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        allTechCategories={allTechCategories}
        allServiceCategories={allServiceCategories}
        length={filteredProjects.length}
      />
      <section id="work" className="section" style={{ marginTop: "20px" }}>
        <span className="section__title">My Work</span>
        <span className="section__subtitle">Recent Work</span>

        <div className="project__container pb-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            filteredProjects.map((p, i) => {
              return (
                <Card
                  key={p.slug}
                  title={p.title}
                  category={p.for}
                  views={p.views}
                  likes={p.likes}
                  image={p.image}
                  slug="id1"
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
