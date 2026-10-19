import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

// Customer review photos arrive as base64 data URLs; store them as files, not inside the product document
async function saveReviewImage(dataUrl: string): Promise<string> {
  const match = dataUrl.match(/^data:image\/(png|jpe?g|webp|gif|heic|heif);base64,(.+)$/i);
  if (!match) {
    throw new Error('Invalid review photo format');
  }

  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length > MAX_IMAGE_BYTES) {
    throw new Error('Photo size is too large (max 8MB)');
  }

  // 1️⃣ IF CLOUDINARY IS CONFIGURED -> Upload to Cloudinary CDN
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'ghar_shagna_da/reviews', resource_type: 'image' },
          (error: unknown, result: unknown) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });
    return (uploadResponse as { secure_url: string }).secure_url;
  }

  // 2️⃣ IF CLOUDINARY NOT CONFIGURED -> Save locally to public/uploads/
  const extension = match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase();
  const uniqueFileName = `review-${Date.now()}.${extension}`;
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, uniqueFileName), buffer);
  return `/uploads/${uniqueFileName}`;
}

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export async function POST(req: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'MongoDB connection is not configured' }, { status: 503 });
    }

    const body = await req.json();
    const slug = clean(body.slug, 200);
    const author = clean(body.review?.author, 60);
    const comment = clean(body.review?.comment, 1500);

    if (!slug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }
    if (!author || !comment) {
      return NextResponse.json({ error: 'Please enter your name and review feedback.' }, { status: 400 });
    }

    const rating = Math.min(5, Math.max(1, Math.round(Number(body.review?.rating) || 5)));
    const rawImage = typeof body.review?.image === 'string' ? body.review.image : '';
    const image = rawImage.startsWith('data:') ? await saveReviewImage(rawImage) : '';

    const review = {
      author,
      city: clean(body.review?.city, 60) || 'Punjab',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      rating,
      comment,
      image,
      tag: 'Verified Bride',
      // Hidden from the website until an admin approves it
      approved: false,
    };

    const updated = await Product.findOneAndUpdate(
      { slug },
      { $push: { reviews: { $each: [review], $position: 0 } } },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Review submit error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit review' }, { status: 500 });
  }
}
