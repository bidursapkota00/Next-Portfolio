"use client";

import { useMemo, useEffect, Suspense, useCallback } from "react";
import FilterAppBar from "./filter";
import { Filter } from "lucide-react";
import { blogs } from "@/utils/data/blogs";
import RecentBlog from "./card";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

function BlogListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get("category") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // 1. Create a helper to generate valid URLs for your Href attributes
  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  const setCategoryFilter = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const { allCategories } = useMemo(
    () => ({
      allCategories: Array.from(new Set(blogs.flatMap((b) => b.category))),
    }),
    []
  );

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      return !categoryFilter || blog.category.includes(categoryFilter);
    });
  }, [categoryFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 2. Updated handler to ensure Default is prevented efficiently
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault(); // Stop the href="#" or href jump behavior

    // Guard clause: don't navigate if out of bounds
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
    // Optional: Keep your smooth scroll preference
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to top when data changes (handled by router usually, but kept per your preference)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryFilter, currentPage]);

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
          {paginatedBlogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
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
            paginatedBlogs.map((b) => (
              <RecentBlog
                key={b.slug}
                title={b.shortTitle}
                pageTitle={b.title}
                image={b.image}
                slug={b.slug}
                categories={b.category}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    // 3. Use real URL in href
                    href={createPageURL(currentPage - 1)}
                    onClick={(e) => handlePageChange(e, currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      // 3. Use real URL in href
                      href={createPageURL(i + 1)}
                      isActive={currentPage === i + 1}
                      onClick={(e) => handlePageChange(e, i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    // 3. Use real URL in href
                    href={createPageURL(currentPage + 1)}
                    onClick={(e) => handlePageChange(e, currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </div>
  );
}

export default function BlogList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogListContent />
    </Suspense>
  );
}
