import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { blogs } from "@/utils/data/blogs";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug must be string" },
        { status: 400 }
      );
    }

    const validSlugs = blogs.map((b) => b.slug);
    if (!validSlugs.includes(slug)) {
      return NextResponse.json(
        { error: "Invalid slug", validSlugs },
        { status: 400 }
      );
    }

    revalidatePath(`/blogs/${slug}`);
    revalidateTag(slug); // <-- ADD THIS LINE

    return NextResponse.json({
      revalidated: true,
      path: `/blogs/${slug}`,
      tag: slug,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
