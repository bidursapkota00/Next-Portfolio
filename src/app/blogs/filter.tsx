import { Filter, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface FilterAppBarProps {
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  categories: string[];
  length: number;
}

const FilterAppBar = ({
  categoryFilter,
  setCategoryFilter,
  categories,
  length,
}: FilterAppBarProps) => {
  const clearFilters = () => {
    setCategoryFilter("");
  };

  const hasActiveFilters = Boolean(categoryFilter);
  return (
    <>
      {/* Filter AppBar */}
      <div className="bg-white shadow-sm border-b sticky top-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 pb-4 pt-12 flex-wrap gap-y-2 m768:pt-4">
            <Filter className="h-5 w-5 text-gray-400 shrink-0" />
            <span className="text-sm font-medium text-gray-700">
              Filter Blogs:
            </span>

            {/* Tech Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All</option>
              {categories.map((tech) => (
                <option key={tech} value={tech}>
                  {tech.charAt(0).toUpperCase() + tech.slice(1)}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="bg-blue-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Active filters: </span>
              {categoryFilter && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {categoryFilter}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Results Count */}
      <div className="text-sm text-gray-500 py-2 px-8 text-end">
        {length} blog
        {length !== 1 ? "s" : ""} found
      </div>
    </>
  );
};

export default FilterAppBar;
