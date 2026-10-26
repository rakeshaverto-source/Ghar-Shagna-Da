import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { INITIAL_BLOG_POSTS } from '@/data/blogs';
import { verifyAdminSession } from '@/lib/auth';
import { matchById } from '@/lib/matchById';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const adminMode = searchParams.get('admin') === 'true';

    const conn = await connectDB();
    if (!conn) {
      if (slug) {
        const item = INITIAL_BLOG_POSTS.find((b) => b.slug === slug);
        return NextResponse.json({ post: item || null, source: 'local' });
      }
      return NextResponse.json({ posts: INITIAL_BLOG_POSTS, source: 'local' });
    }

    // Seed database if empty or sync default blogs
    const count = await BlogPost.countDocuments();
    if (count === 0) {
      await BlogPost.insertMany(INITIAL_BLOG_POSTS);
    } else {
      // Sync default images/metadata if matching initial posts
      for (const p of INITIAL_BLOG_POSTS) {
        await BlogPost.updateOne(
          { slug: p.slug, coverImage: { $ne: p.coverImage } },
          { $set: { coverImage: p.coverImage } }
        );
      }
    }

    if (slug) {
      const post = await BlogPost.findOne({ slug });
      return NextResponse.json({ post, source: 'database' });
    }

    // Filter by published status for non-admin viewers
    const filter = adminMode ? {} : { isPublished: true };
    const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 });

    return NextResponse.json({ posts, source: 'database' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message, posts: INITIAL_BLOG_POSTS }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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

    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const baseSlug = (body.slug || body.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const id = body.id || `blog-${Date.now()}`;
    const slug = body.slug ? baseSlug : `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newPost = await BlogPost.create({
      ...body,
      id,
      slug,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
    }

    const { _id, ...body } = await req.json();
    const filter = matchById('id', body.id, _id);

    if (!filter) {
      return NextResponse.json({ error: 'Blog ID is required for updating' }, { status: 400 });
    }

    const updated = await BlogPost.findOneAndUpdate(
      filter,
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    await BlogPost.findOneAndDelete(matchById('id', id)!);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
