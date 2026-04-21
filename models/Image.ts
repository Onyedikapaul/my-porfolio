import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  url: string;
  publicId: string;
  name: string;
  width: number;
  height: number;
  createdAt: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    name: { type: String, required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Image ||
  mongoose.model<IImage>("Image", ImageSchema);
