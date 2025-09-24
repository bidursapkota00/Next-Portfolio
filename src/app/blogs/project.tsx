"use client";

import { useMemo, useState, useEffect } from "react";
import FilterAppBar from "./filter";
import { Filter } from "lucide-react";
import { blogs } from "@/utils/data/blogs";
import RecentBlog from "./card";

export default function Project() {
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const { allCategories } = useMemo(
    () => ({
      allCategories: Array.from(new Set(blogs.flatMap((b) => b.category))),
    }),
    []
  );

  console.log(allCategories);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      return !categoryFilter || blog.category.includes(categoryFilter);
    });
  }, [categoryFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryFilter]);

  return (
    <div className="relative">
      <FilterAppBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={allCategories}
        length={filteredBlogs.length}
      />
      <section id="work" className="section" style={{ marginTop: "20px" }}>
        <span className="section__title">My Blog</span>
        <span className="section__subtitle">Recent Blog</span>

        <div className="mt-[50px] pb-8 grid gap-5 grid-cols-1 xs500:grid-cols-2 xl1200:grid-cols-3">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            filteredBlogs.map((b) => {
              return (
                <RecentBlog
                  key={b.slug}
                  title={b.shortTitle}
                  image={b.image}
                  slug={b.slug}
                  categories={b.category}
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
