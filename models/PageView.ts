import mongoose, { Schema, Document } from "mongoose";

export interface IPageView extends Document {
  path: string;
  postId?: string;
  userAgent?: string;
  ip?: string;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>({
  path:      { type: String, required: true },
  postId:    { type: String },
  userAgent: { type: String },
  ip:        { type: String },
}, { timestamps: true });

export default mongoose.models.PageView || mongoose.model<IPageView>("PageView", PageViewSchema);
