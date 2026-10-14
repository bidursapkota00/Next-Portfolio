import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import connectDB from '@/utils/db';
import Blog from '@/models/Blog';

function revalidateBlogCache(slug: string, divisionSlug?: string) {
  try {
    revalidatePath('/blogs');
    revalidatePath(`/blogs/${slug}`);
    if (divisionSlug) {
      revalidatePath(`/blogs/${slug}/${divisionSlug}`);
    }
    revalidateTag('blog');
    revalidateTag(slug);
    if (divisionSlug) {
      revalidateTag(`${slug}/${divisionSlug}`);
    }
  } catch (error) {
    console.error('Revalidation error:', error);
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("API Error in GET /api/admin/blogs:", error);
    return NextResponse.json({ 
      error: 'Failed to fetch blogs', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const newBlog = await Blog.create(data);

    revalidateBlogCache(newBlog.slug, newBlog.divisionSlug);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
