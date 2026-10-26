import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import mongoose from "mongoose";
import connectDB from "@/utils/db";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

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
        filter: {
          _id: mongoose.Types.ObjectId.isValid(id)
            ? new mongoose.Types.ObjectId(id)
            : id,
        },
        update: { $set: { order: index } },
      },
    }));

    // Use direct collection to bypass any stale Mongoose schema cache in long-running dev servers
    const result = await Blog.collection.bulkWrite(bulkOps as any);

    try {
      revalidatePath("/blogs");
      revalidatePath("/");
      revalidatePath("/admin/blogs");
      revalidateTag("blog");
    } catch (revalError) {
      console.error("Revalidation error during reorder:", revalError);
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
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
