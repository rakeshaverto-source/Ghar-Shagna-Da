import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import TestimonialReview from '@/models/TestimonialReview';
import { verifyAdminSession } from '@/lib/auth';

const DEFAULT_HOMEPAGE_TESTIMONIALS = [
  {
    author: 'Sreelekshmi',
    city: 'Amritsar',
    date: '6/19/2026',
    rating: 5,
    comment: 'As good as in the picture! Handcrafted embroidery and rich crimson velvet dupatta was stunning. Truly made my Anand Karaj memorable.',
    tag: 'Verified Bride',
    productTitle: 'Royal Heritage Crimson Velvet Lehenga',
    image: '/hero-bride.jpg',
    isFeatured: true,
    order: 1,
  },
  {
    author: 'Mansi Sharma',
    city: 'Ludhiana',
    date: '5/12/2026',
    rating: 5,
    comment: 'Very pretty lehenga! Trial fitting was good. The blouse fit really well after slight sleeve adjustment. Got lots of compliments!',
    tag: 'Verified Bride',
    productTitle: 'Gulabi Noor Pastel Rose Organza Lehenga',
    image: '/creative-bridal.jpg',
    isFeatured: true,
    order: 2,
  },
  {
    author: 'Sujoy & Harleen',
    city: 'Chandigarh',
    date: '4/28/2026',
    rating: 5,
    comment: 'Excellent royal outfit. Fabric and zardozi look like pure couture. Very hygienic packaging and arrived right on time.',
    tag: 'Verified Couple',
    productTitle: 'Champagne Stardust Reception Trail Gown',
    image: '/hero-gown.jpg',
    isFeatured: true,
    order: 3,
  },
  {
    author: 'Swati Verma',
    city: 'Delhi',
    date: '4/15/2026',
    rating: 5,
    comment: 'Pretty outfit! Dry cleaning and hygiene was 10/10. Saved so much money renting instead of buying an expensive designer piece.',
    tag: 'Verified Bride',
    productTitle: 'Gulabi Noor Pastel Rose Organza Lehenga',
    image: '/hero-lehenga.jpg',
    isFeatured: true,
    order: 4,
  },
  {
    author: 'Ragesree Kaur',
    city: 'Jalandhar',
    date: '3/20/2026',
    rating: 5,
    comment: 'The craftsmanship is so royal! Master ji ne blouse exact mere body shape te alter kar dita. Highly recommend Ghar Shagna Da 💕',
    tag: 'Verified Bride',
    productTitle: 'Royal Heritage Crimson Velvet Lehenga',
    image: '/mobile-bridal.jpg',
    isFeatured: true,
    order: 5,
  },
  {
    author: 'Jaspreet B.',
    city: 'Patiala',
    date: '2/18/2026',
    rating: 5,
    comment: 'Can-can flare is big and twirl photographs looked magical in natural sunlight. Loved the colour combination and dupatta.',
    tag: 'Verified Client',
    productTitle: 'Royal Heritage Crimson Velvet Lehenga',
    image: '/Categery/Bridesmaid.png',
    isFeatured: true,
    order: 6,
  },
  {
    author: 'Navneet Sandhu',
    city: 'Bathinda',
    date: '2/04/2026',
    rating: 5,
    comment: 'Fitting was completely custom! Even without visiting store, measurements were taken via WhatsApp video call. Timely doorstep delivery.',
    tag: 'Verified Bride',
    productTitle: 'Firozi Twirl Floor-Length Royal Anarkali',
    isFeatured: true,
    order: 7,
  },
  {
    author: 'Simran & Aman',
    city: 'Mohali',
    date: '1/10/2026',
    rating: 5,
    comment: 'Rented matching bride & groom outfits. Security deposit was refunded on time after returning the dresses. Overall a smooth experience!',
    tag: 'Verified Couple',
    productTitle: 'Maharaja Ivory Chikankari Groom Sherwani',
    image: '/creative-groom.jpg',
    isFeatured: true,
    order: 8,
  },
];

// GET: Fetch reviews for Home Page & Admin
export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ reviews: DEFAULT_HOMEPAGE_TESTIMONIALS, source: 'fallback' });
    }

    const count = await TestimonialReview.countDocuments();
    if (count === 0) {
      // Seed default authentic reviews into MongoDB
      await TestimonialReview.insertMany(DEFAULT_HOMEPAGE_TESTIMONIALS);
    }

    const reviews = await TestimonialReview.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ reviews, source: 'database' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message, reviews: DEFAULT_HOMEPAGE_TESTIMONIALS }, { status: 500 });
  }
}

// POST: Admin creates a new Review
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    const body = await req.json();
    if (!body.author || !body.comment) {
      return NextResponse.json({ error: 'Author and review message are required' }, { status: 400 });
    }

    const review = await TestimonialReview.create({
      author: body.author.trim(),
      city: body.city?.trim() || 'Punjab',
      date: body.date?.trim() || new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      rating: Number(body.rating) || 5,
      comment: body.comment.trim(),
      image: body.image?.trim() || '',
      tag: body.tag || 'Verified Bride',
      productTitle: body.productTitle?.trim() || '',
      isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to create review' }, { status: 500 });
  }
}

// PUT: Admin updates an existing Review
export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Review ID (_id) is required' }, { status: 400 });
    }

    const updated = await TestimonialReview.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to update review' }, { status: 500 });
  }
}

// DELETE: Admin removes a review
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
    }

    const deleted = await TestimonialReview.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to delete review' }, { status: 500 });
  }
}
