import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/mongodb";
import ImageModel from "@/models/Image";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const images = await ImageModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "paulcodes-blog", resource_type: "image" },
        (err, res) => (err ? reject(err) : resolve(res as never)),
      )
      .end(buffer);
  });

  await connectDB();
  const image = await ImageModel.create({
    url: result.secure_url,
    publicId: result.public_id,
    name: file.name,
    width: result.width,
    height: result.height,
  });

  return NextResponse.json(image, { status: 201 });
}

//DELETE Route
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, publicId } = await req.json();

  await connectDB();
  await cloudinary.uploader.destroy(publicId);
  await ImageModel.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
