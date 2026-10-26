"use client";

import { useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function BlogsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blogs segment error:", error);
  }, [error]);

  return (
    <>
      <Sidebar />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-8 bg-white rounded-xl shadow-sm border border-red-200">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Server Error
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Unable to reach the database server or load blogs. Please try again later.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </div>
    </>
  );
}
