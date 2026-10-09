import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GalleryItem from '@/models/GalleryItem';
import { verifyAdminSession } from '@/lib/auth';


// GET: Fetch all gallery items (optional category filter)
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featuredOnly = searchParams.get('featured') === 'true';

    const query: Record<string, any> = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (featuredOnly) {
      query.isFeatured = true;
    }

    const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      items,
      count: items.length,
    });
  } catch (error: any) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

// POST: Add new gallery photo (admin only)
export async function POST(request: Request) {
  try {
    const isAuth = await verifyAdminSession();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Title and Image URL are required' },
        { status: 400 }
      );
    }

    const highestOrder = await GalleryItem.findOne().sort({ order: -1 }).select('order');
    const nextOrder = (highestOrder?.order || 0) + 1;

    const newItem = await GalleryItem.create({
      title: body.title,
      altText: body.altText || body.title || '',
      category: body.category || 'Bridal Lehengas',
      imageUrl: body.imageUrl,
      thumbnailUrl: body.thumbnailUrl || body.imageUrl,
      caption: body.caption || '',
      productSlug: body.productSlug || '',
      brideName: body.brideName || '',
      location: body.location || 'Punjab',
      isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
      order: body.order !== undefined ? Number(body.order) : nextOrder,
    });

    return NextResponse.json({
      success: true,
      item: newItem,
      message: 'Gallery item added successfully',
    });
  } catch (error: any) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}

// PUT: Update existing gallery photo (admin only)
export async function PUT(request: Request) {
  try {
    const isAuth = await verifyAdminSession();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    if (!body._id) {
      return NextResponse.json({ success: false, error: 'Item ID is required' }, { status: 400 });
    }

    const updatedItem = await GalleryItem.findByIdAndUpdate(
      body._id,
      {
        title: body.title,
        altText: body.altText !== undefined ? body.altText : body.title,
        category: body.category,
        imageUrl: body.imageUrl,
        thumbnailUrl: body.thumbnailUrl || body.imageUrl,
        caption: body.caption,
        productSlug: body.productSlug,
        brideName: body.brideName,
        location: body.location,
        isFeatured: body.isFeatured,
        order: Number(body.order || 0),
      },
      { returnDocument: 'after' }
    );

    if (!updatedItem) {
      return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      item: updatedItem,
      message: 'Gallery item updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

// DELETE: Remove gallery photo (admin only)
export async function DELETE(request: Request) {
  try {
    const isAuth = await verifyAdminSession();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Item ID is required' }, { status: 400 });
    }

    const deleted = await GalleryItem.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
