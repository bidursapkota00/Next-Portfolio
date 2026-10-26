import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import connectDB from "@/utils/db";
import Blog from "@/models/Blog";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { error: "orderedIds must be a non-empty array of blog IDs" },
        { status: 400 },
      );
    }

    const bulkOps = orderedIds.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await Blog.bulkWrite(bulkOps);

    try {
      revalidatePath("/blogs");
      revalidatePath("/admin/blogs");
      revalidateTag("blog");
    } catch (revalError) {
      console.error("Revalidation error during reorder:", revalError);
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      count: orderedIds.length,
    });
  } catch (error) {
    console.error("Failed to reorder blogs:", error);
    return NextResponse.json(
      {
        error: "Failed to update blog order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
