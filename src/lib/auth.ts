import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_SECRET = process.env.JWT_SECRET || 'gsd_production_secure_master_key_2026';
const TOKEN_NAME = 'gsd_admin_session';

/**
 * Creates an encrypted tamper-proof session token
 */
export function generateAdminToken(): string {
  const payload = {
    role: 'admin',
    timestamp: Date.now(),
  };
  const stringified = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(stringified).digest('hex');
  return Buffer.from(stringified).toString('base64') + '.' + signature;
}

/**
 * Validates the session token from cookies
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;
  try {
    const rawPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
    const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(rawPayload).digest('hex');

    if (signature !== expectedSignature) return false;

    const data = JSON.parse(rawPayload);
    // 7 days token expiration
    if (Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export { TOKEN_NAME };
