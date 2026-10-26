import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PushSubscription from '@/models/PushSubscription';
import { verifyAdminSession } from '@/lib/auth';

// Saves or removes a browser's web push subscription.
// "visitor" is open to anyone (new blog alerts); "admin" requires the admin session (new lead alerts).

function parseSubscription(sub: unknown) {
  const s = sub as { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } };
  if (
    typeof s?.endpoint !== 'string' ||
    !s.endpoint.startsWith('https://') ||
    typeof s.keys?.p256dh !== 'string' ||
    typeof s.keys?.auth !== 'string'
  ) {
    return null;
  }
  return { endpoint: s.endpoint, keys: { p256dh: s.keys.p256dh, auth: s.keys.auth } };
}

export async function POST(req: Request) {
  try {
    const { subscription, audience } = await req.json();
    if (audience !== 'admin' && audience !== 'visitor') {
      return NextResponse.json({ error: 'Invalid audience' }, { status: 400 });
    }
    if (audience === 'admin' && !(await verifyAdminSession())) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }
    const sub = parseSubscription(subscription);
    if (!sub) {
      return NextResponse.json({ error: 'Invalid push subscription' }, { status: 400 });
    }
    if (!(await connectDB())) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    await PushSubscription.updateOne(
      { endpoint: sub.endpoint, audience },
      { $set: { keys: sub.keys } },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { endpoint, audience } = await req.json();
    if (typeof endpoint !== 'string' || (audience !== 'admin' && audience !== 'visitor')) {
      return NextResponse.json({ error: 'Endpoint and audience required' }, { status: 400 });
    }
    if (!(await connectDB())) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }
    // Only the browser holding the subscription knows its endpoint, so this needs no login
    await PushSubscription.deleteOne({ endpoint, audience });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
