"use client";

import { useMemo, useState, useEffect } from "react";
import FilterAppBar from "./filter";
import Card from "../../components/ui/card";
import { Filter } from "lucide-react";
import { projects } from "@/utils/data/projects";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

        <div className="mt-[50px] pb-8 grid gap-5 grid-cols-1 xs500:grid-cols-2 xl1200:grid-cols-3">
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
            filteredProjects.map((p) => {
              return (
                <Card
                  key={p.slug}
                  title={p.title}
                  category={p.for}
                  image={p.image}
                  slug={p.slug}
                  techCategory={p.techCategory}
                  serviceCategory={p.serviceCategory}
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
