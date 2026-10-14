import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Blog from "@/models/Blog";
import { blogs } from "@/utils/data/blogs";

export async function POST() {
  try {
    await connectDB();
    await Blog.deleteMany({});
    const savedBlogs = await Blog.insertMany(blogs);
    return NextResponse.json(
      { message: "Blogs seeded successfully", count: savedBlogs.length },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error seeding blogs:", error);
    return NextResponse.json(
      { error: "Failed to seed blogs" },
      { status: 500 },
    );
  }
}
