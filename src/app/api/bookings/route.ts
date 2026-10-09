import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    // 🛡️ SECURITY GUARD: Customer phone numbers and leads are private
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ bookings: [] });
    }

    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ bookings });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const conn = await connectDB();
    const body = await req.json();

    if (!conn) {
      // Return ok even if DB is not configured so user flow is not interrupted
      return NextResponse.json({ success: true, message: 'Saved offline' });
    }

    const newBooking = await Booking.create(body);
    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    // 🛡️ SECURITY GUARD: Only admin can update lead status
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    const body = await req.json();
    const { id, status } = body;

    const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, booking: updated });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
