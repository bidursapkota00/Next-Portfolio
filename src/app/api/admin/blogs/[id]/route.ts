import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import connectDB from "@/utils/db";
import Blog from "@/models/Blog";

function revalidateBlogCache(slug: string, divisionSlug?: string) {
  try {
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);
    if (divisionSlug) {
      revalidatePath(`/blogs/${slug}/${divisionSlug}`);
    }
    revalidateTag("blog");
    revalidateTag(slug);
    if (divisionSlug) {
      revalidateTag(`${slug}/${divisionSlug}`);
    }
  } catch (error) {
    console.error("Revalidation error:", error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const data = await request.json();

    const existingBlog = await Blog.findById(params.id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    revalidateBlogCache(updatedBlog.slug, updatedBlog.divisionSlug);
    if (
      existingBlog.slug !== updatedBlog.slug ||
      existingBlog.divisionSlug !== updatedBlog.divisionSlug
    ) {
      revalidateBlogCache(existingBlog.slug, existingBlog.divisionSlug);
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const deletedBlog = await Blog.findByIdAndDelete(params.id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    revalidateBlogCache(deletedBlog.slug, deletedBlog.divisionSlug);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
