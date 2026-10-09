import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdminSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // 🛡️ SECURITY GUARD: Only admin can upload media
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const data = await req.formData();
    const file = data.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const resourceType = (data.get('resource_type') as 'auto' | 'image' | 'video') || 'auto';

    // 1️⃣ IF CLOUDINARY IS CONFIGURED -> Upload to Cloudinary CDN
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'ghar_shagna_da/media',
              resource_type: resourceType,
            },
            (error: unknown, result: unknown) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      return NextResponse.json({
        success: true,
        url: (uploadResponse as { secure_url: string }).secure_url,
      });
    }

    // 2️⃣ IF CLOUDINARY NOT CONFIGURED -> Save locally to public/uploads/
    const originalFileName = (file as any).name || 'upload.jpg';
    const extension = path.extname(originalFileName) || '.jpg';
    const cleanBaseName = path
      .basename(originalFileName, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const uniqueFileName = `${cleanBaseName}-${Date.now()}${extension}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, uniqueFileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 });
  }
}
