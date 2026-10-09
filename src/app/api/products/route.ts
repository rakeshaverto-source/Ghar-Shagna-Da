import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { INITIAL_PRODUCTS } from '@/data/products';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      // Fallback if Mongo URI not provided yet
      return NextResponse.json({ products: INITIAL_PRODUCTS, source: 'local' });
    }

    const count = await Product.countDocuments();
    if (count === 0) {
      // Seed initial products if DB is empty
      await Product.insertMany(INITIAL_PRODUCTS);
    }

    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ products, source: 'database' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message, products: INITIAL_PRODUCTS }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 🛡️ SECURITY GUARD: Only authenticated admin can add products
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json(
        { error: 'MongoDB connection is not configured in .env.local' },
        { status: 503 }
      );
    }

    const body = await req.json();

    if (!body.title || !body.price) {
      return NextResponse.json({ error: 'Title and Price are required' }, { status: 400 });
    }

    // Auto-generate slug and id if not provided
    const baseSlug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = body.id || `outfit-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newProduct = await Product.create({
      ...body,
      id,
      slug: body.slug || slug,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // 🛡️ SECURITY GUARD: Only authenticated admin can update products
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'MongoDB connection is not configured' }, { status: 503 });
    }

    const body = await req.json();
    const { _id, id, slug, ...updateData } = body;

    // Build filter matching any valid identifier
    const filterConditions: any[] = [];
    if (_id && typeof _id === 'string' && _id.length === 24) {
      filterConditions.push({ _id });
    }
    if (id) {
      filterConditions.push({ id });
    }
    if (slug) {
      filterConditions.push({ slug });
    }

    if (filterConditions.length === 0) {
      return NextResponse.json({ error: 'Missing product identifier (_id, id, or slug)' }, { status: 400 });
    }

    const updated = await Product.findOneAndUpdate(
      { $or: filterConditions },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Product not found in database' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // 🛡️ SECURITY GUARD: Only authenticated admin can delete products
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'MongoDB connection is not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    await Product.findOneAndDelete({ $or: [{ _id: id }, { id: id }] });
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
