import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  readTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  excerpt:     { type: String, required: true },
  content:     { type: String, required: true },
  coverImage:  { type: String },
  tags:        [{ type: String }],
  published:   { type: Boolean, default: false },
  publishedAt: { type: Date },
  readTime:    { type: Number, default: 1 },
  views:       { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
