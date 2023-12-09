import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file: any = formData.get("upload");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    let uploadedImageUrl: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result: any) {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({
      uploaded: true,
      public_id: uploadedImageUrl.public_id,
      url: uploadedImageUrl.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
