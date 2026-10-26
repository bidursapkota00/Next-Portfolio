"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBlogs } from "@/utils/data/blogs";
import {
  RotateCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Send,
  Sparkles,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";

interface BlogDocument extends IBlogs {
  _id: string;
}

interface RevalidateStatus {
  type: "success" | "error";
  message: string;
  details?: {
    path?: string;
    tag?: string;
    revalidated?: boolean;
    validSlugs?: string[];
  };
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Revalidate states
  const [showRevalidatePanel, setShowRevalidatePanel] = useState(false);
  const [revalidatingSlug, setRevalidatingSlug] = useState<string | null>(null);
  const [revalidateStatus, setRevalidateStatus] = useState<RevalidateStatus | null>(null);
  const [customSlugInput, setCustomSlugInput] = useState("");
  const [recentlyRevalidated, setRecentlyRevalidated] = useState<Record<string, boolean>>({});
  const [lastResponse, setLastResponse] = useState<any>(null);

  // Drag and drop sorting states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to fetch blogs.");
        setBlogs([]);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setErrorMsg("A network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveNewOrder = async (reorderedBlogs: BlogDocument[]) => {
    setOrderStatus("saving");
    try {
      const orderedIds = reorderedBlogs.map((b) => b._id);
      const res = await fetch("/api/admin/blogs/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      if (!res.ok) {
        throw new Error("Failed to reorder blogs");
      }

      setOrderStatus("saved");
      setTimeout(() => {
        setOrderStatus((prev) => (prev === "saved" ? "idle" : prev));
      }, 3000);
    } catch (err) {
      console.error("Order save error:", err);
      setOrderStatus("error");
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...blogs];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    setBlogs(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    saveNewOrder(reordered);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const moveRow = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blogs.length) return;

    const reordered = [...blogs];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setBlogs(reordered);
    saveNewOrder(reordered);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const getBlogTargetSlug = (blog: BlogDocument) => {
    return blog.divisionSlug ? `${blog.slug}/${blog.divisionSlug}` : blog.slug;
  };

  const handleRevalidate = async (slugToRevalidate: string) => {
    if (!slugToRevalidate.trim()) {
      setRevalidateStatus({
        type: "error",
        message: "Please enter or select a slug to revalidate.",
      });
      return;
    }

    setRevalidatingSlug(slugToRevalidate);
    setRevalidateStatus(null);
    setLastResponse(null);

    try {
      const res = await fetch("/api/revalidate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slugToRevalidate.trim() }),
      });

      const data = await res.json();
      setLastResponse({ status: res.status, ...data });

      if (!res.ok) {
        setRevalidateStatus({
          type: "error",
          message: data.error || "Failed to revalidate.",
          details: data,
        });
      } else {
        setRevalidateStatus({
          type: "success",
          message: data.message || `Cache successfully revalidated for ${data.path || slugToRevalidate}!`,
          details: data,
        });

        // Mark as recently revalidated for inline badge
        setRecentlyRevalidated((prev) => ({ ...prev, [slugToRevalidate]: true }));
        setTimeout(() => {
          setRecentlyRevalidated((prev) => {
            const next = { ...prev };
            delete next[slugToRevalidate];
            return next;
          });
        }, 4000);
      }
    } catch (error) {
      console.error("Revalidation error:", error);
      setRevalidateStatus({
        type: "error",
        message: "Network error occurred while calling /api/revalidate-blog.",
      });
    } finally {
      setRevalidatingSlug(null);
    }
  };

  const handleRevalidateBlogRow = async (blog: BlogDocument) => {
    const primarySlug = getBlogTargetSlug(blog);
    await handleRevalidate(primarySlug);

    // If there is a divisionSlug, also revalidate base slug in parallel
    if (blog.divisionSlug) {
      fetch("/api/revalidate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: blog.slug }),
      }).catch((err) => console.error("Base slug revalidation error:", err));
    }
  };

  // Compile list of available slugs from loaded blogs
  const allAvailableSlugs = Array.from(
    new Set(
      blogs.flatMap((b) =>
        b.divisionSlug ? [`${b.slug}/${b.divisionSlug}`, b.slug] : [b.slug]
      )
    )
  );

  return (
    <div className="space-y-6">
      {/* Header and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blogs Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your articles and trigger on-demand cache revalidation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRevalidatePanel(!showRevalidatePanel)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium border transition shadow-sm ${
              showRevalidatePanel
                ? "bg-purple-50 border-purple-300 text-purple-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <RotateCw
              className={`w-4 h-4 ${
                revalidatingSlug ? "animate-spin text-purple-600" : "text-gray-500"
              }`}
            />
            {showRevalidatePanel ? "Close Revalidate Tool" : "Revalidate Cache"}
          </button>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Create New Blog
          </Link>
        </div>
      </div>

      {/* Revalidate Status Banner */}
      {revalidateStatus && (
        <div
          className={`p-4 rounded-lg border flex items-start justify-between gap-3 shadow-sm ${
            revalidateStatus.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          <div className="flex items-start gap-3">
            {revalidateStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="font-semibold text-sm">{revalidateStatus.message}</p>
              {revalidateStatus.details?.path && (
                <p className="text-xs mt-1 text-emerald-700">
                  <span className="font-medium">Path:</span> {revalidateStatus.details.path}
                  {revalidateStatus.details.tag && (
                    <span className="ml-2">
                      | <span className="font-medium">Tag:</span> {revalidateStatus.details.tag}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setRevalidateStatus(null)}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dedicated Revalidation Interface Panel */}
      {showRevalidatePanel && (
        <div className="bg-white border border-purple-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                On-Demand Cache Revalidation (/api/revalidate-blog)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Send a POST request to immediately purge and rebuild static ISR pages and tags.
              </p>
            </div>
            <button
              onClick={() => handleRevalidate("all")}
              disabled={Boolean(revalidatingSlug)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50 self-start sm:self-auto shadow-sm"
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${
                  revalidatingSlug === "all" ? "animate-spin" : ""
                }`}
              />
              {revalidatingSlug === "all" ? "Revalidating All..." : "Revalidate All Blogs"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-5 space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Quick Select from Valid Slugs:
              </label>
              <select
                className="w-full text-sm border border-gray-300 rounded-md p-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={customSlugInput}
                onChange={(e) => setCustomSlugInput(e.target.value)}
              >
                <option value="">-- Select a blog slug --</option>
                {allAvailableSlugs.map((slug) => (
                  <option key={slug} value={slug}>
                    {slug}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-5 space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Or Type Custom Slug:
              </label>
              <input
                type="text"
                placeholder="e.g. tech/react or all"
                value={customSlugInput}
                onChange={(e) => setCustomSlugInput(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                onClick={() => handleRevalidate(customSlugInput)}
                disabled={Boolean(revalidatingSlug) || !customSlugInput.trim()}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-black transition disabled:opacity-50 shadow-sm"
              >
                {revalidatingSlug === customSlugInput ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </button>
            </div>
          </div>

          {lastResponse && (
            <div className="mt-3 p-3 bg-gray-900 text-gray-100 rounded-md text-xs font-mono overflow-x-auto">
              <div className="text-gray-400 mb-1 flex justify-between">
                <span>Response ({lastResponse.status || 200})</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <pre>{JSON.stringify(lastResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {/* Main Table Content */}
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading blogs...</div>
      ) : errorMsg ? (
        <div className="text-red-500 bg-red-50 p-4 rounded border border-red-200">
          Error: {errorMsg}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          {/* Reorder Status Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 bg-gray-50/80 border-b border-gray-200 gap-2 text-xs text-gray-600">
            <span className="flex items-center gap-1.5 font-medium">
              <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
              Drag rows using the handle or click arrows to customize the blog sorting order.
            </span>
            <div className="flex items-center gap-2">
              {orderStatus === "saving" && (
                <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving order...
                </span>
              )}
              {orderStatus === "saved" && (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Order saved & cache purged!
                </span>
              )}
              {orderStatus === "error" && (
                <span className="inline-flex items-center gap-1.5 text-red-700 font-medium bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  Failed to save order
                </span>
              )}
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug / Path
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog, index) => {
                const targetSlug = getBlogTargetSlug(blog);
                const isRowRevalidating = revalidatingSlug === targetSlug;
                const isRecentlyDone = recentlyRevalidated[targetSlug];
                const isBeingDragged = draggedIndex === index;
                const isDragOver = dragOverIndex === index && draggedIndex !== index;

                return (
                  <tr
                    key={blog._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`transition-all duration-150 select-none ${
                      isBeingDragged
                        ? "opacity-40 bg-blue-50/70 border-dashed border-2 border-blue-400"
                        : isDragOver
                        ? "border-t-2 border-blue-600 bg-blue-50/40"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Drag Handle & Order Ranking */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="cursor-grab active:cursor-grabbing p-1 -m-1 hover:text-gray-700 hover:bg-gray-100 rounded transition"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-gray-600 w-5 text-right">
                          {index + 1}
                        </span>
                        <div className="flex flex-col ml-1">
                          <button
                            type="button"
                            onClick={() => moveRow(index, "up")}
                            disabled={index === 0}
                            title="Move up"
                            className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveRow(index, "down")}
                            disabled={index === blogs.length - 1}
                            title="Move down"
                            className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                      {blog.shortTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                      <span className="font-mono text-xs">{blog.slug}</span>
                      {blog.divisionSlug && (
                        <span className="ml-1 text-xs font-mono bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">
                          /{blog.divisionSlug}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      {/* Live Preview Link */}
                      <a
                        href={`/blogs/${targetSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View live blog"
                        className="text-gray-400 hover:text-gray-700 inline-flex items-center"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {/* Edit Link */}
                      <Link
                        href={`/admin/blogs/${blog._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>

                      {/* Per-row Revalidate Button */}
                      <button
                        onClick={() => handleRevalidateBlogRow(blog)}
                        disabled={isRowRevalidating}
                        title={`Revalidate cache for /blogs/${targetSlug}`}
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded border transition font-medium ${
                          isRecentlyDone
                            ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                        } disabled:opacity-50`}
                      >
                        <RotateCw
                          className={`w-3 h-3 ${isRowRevalidating ? "animate-spin" : ""}`}
                        />
                        {isRecentlyDone
                          ? "Revalidated!"
                          : isRowRevalidating
                          ? "Purging..."
                          : "Revalidate"}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

