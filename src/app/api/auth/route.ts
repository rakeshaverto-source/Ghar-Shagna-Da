import { NextResponse } from 'next/server';
import { generateAdminToken, verifyAdminSession, TOKEN_NAME } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Verify current session
export async function GET() {
  const isValid = await verifyAdminSession();
  if (isValid) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// Login
export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid master password' }, { status: 401 });
    }

    const token = generateAdminToken();
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: TOKEN_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(TOKEN_NAME);
  return response;
}
