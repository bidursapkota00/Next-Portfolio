import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBlogs } from '@/utils/data/blogs';

export interface IBlogDocument extends IBlogs, Document {}

const BlogSchema = new Schema<IBlogDocument>(
  {
    baseUrl: { type: String, required: true },
    url: { type: String, required: true },
    categoryTitle: { type: String },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    slug: { type: String, required: true },
    github: { type: String, required: true },
    youtube: { type: String },
    categoryDescription: { type: String },
    description: { type: String, required: true },
    category: { type: [String], required: true },
    divisionSlug: { type: String },
    divisionCategory: { type: [String] },
    whatsNext: { type: [String] },
    categoryDisplayTitle: { type: String },
    categoryImage: { type: String },
    categorySubTitle: { type: String },
    image: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from caching stale model in dev
if (process.env.NODE_ENV === 'development' && mongoose.models.Blog) {
  delete (mongoose.models as any).Blog;
}

const Blog: Model<IBlogDocument> = mongoose.models.Blog || mongoose.model<IBlogDocument>('Blog', BlogSchema);

export default Blog;
