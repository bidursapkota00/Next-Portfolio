import { Filter, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface FilterAppBarProps {
  techFilter: string;
  setTechFilter: Dispatch<SetStateAction<string>>;
  serviceFilter: string;
  setServiceFilter: Dispatch<SetStateAction<string>>;
  allTechCategories: string[];
  allServiceCategories: string[];
  length: number;
}

const FilterAppBar = ({
  techFilter,
  setTechFilter,
  serviceFilter,
  setServiceFilter,
  allTechCategories,
  allServiceCategories,
  length,
}: FilterAppBarProps) => {
  const clearFilters = () => {
    setTechFilter("");
    setServiceFilter("");
  };

  const hasActiveFilters = techFilter || serviceFilter;
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-30">
        {/* Filter AppBar */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 py-4 flex-wrap gap-y-2">
              <Filter className="h-5 w-5 text-gray-400 shrink-0" />
              <span className="text-sm font-medium text-gray-700">
                Filter Projects:
              </span>

              {/* Tech Category Filter */}
              <select
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Technologies</option>
                {allTechCategories.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech.charAt(0).toUpperCase() + tech.slice(1)}
                  </option>
                ))}
              </select>

              {/* Service Category Filter */}
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Services</option>
                {allServiceCategories.map((service) => (
                  <option key={service} value={service}>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
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
                <span className="text-gray-600">Active filters:</span>
                {techFilter && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Tech: {techFilter}
                  </span>
                )}
                {serviceFilter && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Service: {serviceFilter}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Results Count */}
      <div className="text-sm text-gray-500 py-2 px-8 text-end">
        {length} project
        {length !== 1 ? "s" : ""} found
      </div>
    </>
  );
};

export default FilterAppBar;
