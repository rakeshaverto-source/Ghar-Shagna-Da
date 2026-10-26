import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AdminNotification from '@/models/AdminNotification';
import { verifyAdminSession } from '@/lib/auth';

// Admin bell notifications. Reading or clearing them never changes leads or blogs.

const isObjectId = (id: unknown): id is string => typeof id === 'string' && /^[0-9a-f]{24}$/i.test(id);

async function guard() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }
  if (!(await connectDB())) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
  }
  return null;
}

// GET: latest 50 notifications plus the unread count
export async function GET() {
  try {
    const denied = await guard();
    if (denied) return denied;

    const [notifications, unread] = await Promise.all([
      AdminNotification.find().sort({ createdAt: -1 }).limit(50).lean(),
      AdminNotification.countDocuments({ read: false }),
    ]);
    return NextResponse.json({ notifications, unread });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// PATCH { id } marks one as read; { all: true } marks every notification as read
export async function PATCH(req: Request) {
  try {
    const denied = await guard();
    if (denied) return denied;

    const { id, all } = await req.json();
    if (all) {
      await AdminNotification.updateMany({ read: false }, { $set: { read: true } });
    } else {
      if (!isObjectId(id)) return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
      await AdminNotification.updateOne({ _id: id }, { $set: { read: true } });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// DELETE ?id=... removes one; without an id it clears them all
export async function DELETE(req: Request) {
  try {
    const denied = await guard();
    if (denied) return denied;

    const id = new URL(req.url).searchParams.get('id');
    if (id) {
      if (!isObjectId(id)) return NextResponse.json({ error: 'Invalid notification ID' }, { status: 400 });
      await AdminNotification.deleteOne({ _id: id });
    } else {
      await AdminNotification.deleteMany({});
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
