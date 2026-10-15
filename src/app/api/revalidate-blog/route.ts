import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import connectDB from "@/utils/db";
import Blog from "@/models/Blog";

export interface RevalidateBlogRequest {
  slug: string;
}

export interface RevalidateBlogSuccessResponse {
  revalidated: true;
  path: string;
  tag: string;
  message?: string;
}

export interface RevalidateBlogErrorResponse {
  error: string;
  validSlugs?: string[];
}

export type RevalidateBlogResponse =
  | RevalidateBlogSuccessResponse
  | RevalidateBlogErrorResponse;

async function getValidSlugs(): Promise<string[]> {
  await connectDB();
  const blogs = await Blog.find({}, { slug: 1, divisionSlug: 1 }).lean();

  const validSlugs: string[] = [];
  blogs.forEach((b) => {
    if (b.divisionSlug) {
      validSlugs.push(`${b.slug}/${b.divisionSlug}`);
    }
    validSlugs.push(`${b.slug}`);
  });

  return Array.from(new Set(validSlugs));
}

export async function GET() {
  try {
    const validSlugs = await getValidSlugs();
    return NextResponse.json({ validSlugs });
  } catch (error) {
    console.error("Failed to fetch valid slugs:", error);
    return NextResponse.json(
      { error: "Failed to fetch valid slugs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const validSlugs = await getValidSlugs();

    const body = await req.json().catch(() => ({}));
    const slug = body?.slug;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required", validSlugs },
        { status: 400 }
      );
    }

    if (typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug must be string", validSlugs },
        { status: 400 }
      );
    }

    if (slug === "all") {
      revalidatePath("/blogs");
      revalidateTag("blog");
      validSlugs.forEach((s) => {
        revalidatePath(`/blogs/${s}`);
        revalidateTag(s);
      });

      return NextResponse.json({
        revalidated: true,
        path: "/blogs (and all blog posts)",
        tag: "blog (and all slug tags)",
        message: `Successfully revalidated all ${validSlugs.length} blog slugs`,
      });
    }

    if (!validSlugs.includes(slug)) {
      return NextResponse.json(
        { error: "Invalid slug", validSlugs },
        { status: 400 }
      );
    }

    revalidatePath(`/blogs/${slug}`);
    revalidatePath("/blogs");
    revalidateTag(slug);
    revalidateTag("blog");

    return NextResponse.json({
      revalidated: true,
      path: `/blogs/${slug}`,
      tag: slug,
    });
  } catch (error) {
    console.error("Failed to revalidate:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

