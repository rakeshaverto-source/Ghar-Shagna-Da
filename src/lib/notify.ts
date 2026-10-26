import webpush from 'web-push';
import AdminNotification from '@/models/AdminNotification';
import PushSubscription from '@/models/PushSubscription';
import { SITE_CONFIG } from '@/data/products';

// Outgoing alerts: admin bell notifications, web push and admin email.
// Every sender swallows its own errors so a failed alert never breaks the request that triggered it.

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const pushConfigured = Boolean(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);

if (pushConfigured) {
  webpush.setVapidDetails(`mailto:${SITE_CONFIG.email}`, VAPID_PUBLIC_KEY!, VAPID_PRIVATE_KEY!);
}

export interface PushPayload {
  title: string;
  body: string;
  url: string;
  image?: string;
}

export async function createAdminNotification(data: {
  type: 'lead' | 'blog';
  title: string;
  message: string;
  link?: string;
}) {
  try {
    await AdminNotification.create(data);
  } catch (err) {
    console.error('Failed to create admin notification:', err);
  }
}

export async function sendPush(audience: 'admin' | 'visitor', payload: PushPayload) {
  if (!pushConfigured) return;
  try {
    const subs = await PushSubscription.find({ audience }).lean();
    const body = JSON.stringify(payload);
    await Promise.allSettled(
      subs.map(async (sub) => {
        try {
          await webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, body);
        } catch (err) {
          // 404/410: the browser unsubscribed or the subscription expired
          const status = (err as { statusCode?: number }).statusCode;
          if (status === 404 || status === 410) {
            await PushSubscription.deleteOne({ _id: sub._id });
          } else {
            console.error('Push send failed:', status, (err as Error).message);
          }
        }
      })
    );
  } catch (err) {
    console.error('Failed to send push notifications:', err);
  }
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Sends through Resend (https://resend.com). Without RESEND_API_KEY this does nothing.
export async function sendAdminEmail(subject: string, rows: [string, string][]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFY_EMAIL || SITE_CONFIG.email;
  if (!apiKey || !to) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px">
      <h2 style="color:#8b1828;margin:0 0 12px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 10px;border:1px solid #eee;color:#666;width:150px">${escapeHtml(k)}</td><td style="padding:6px 10px;border:1px solid #eee"><b>${escapeHtml(v)}</b></td></tr>`
          )
          .join('')}
      </table>
      <p style="margin-top:16px"><a href="${SITE_CONFIG.domain}/admin" style="color:#8b1828">Open Admin Panel</a></p>
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Resend's shared sender works without verifying a domain (only to your own Resend account email)
        from: process.env.RESEND_FROM_EMAIL || 'Ghar Shagna Da <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) console.error('Admin email failed:', res.status, await res.text());
  } catch (err) {
    console.error('Admin email failed:', err);
  }
}

// Everything that should happen when a customer sends an inquiry
export async function notifyNewLead(lead: {
  customerName: string;
  phone: string;
  productTitle: string;
  eventDate?: string;
  city?: string;
  rentalDuration?: string;
  notes?: string;
}) {
  const title = `New inquiry from ${lead.customerName}`;
  const message = `${lead.productTitle}${lead.eventDate ? ` • Event: ${lead.eventDate}` : ''}`;

  await Promise.allSettled([
    createAdminNotification({ type: 'lead', title, message, link: '/admin?tab=bookings' }),
    sendPush('admin', { title, body: `${message} • ${lead.phone}`, url: '/admin?tab=bookings' }),
    sendAdminEmail(title, [
      ['Customer', lead.customerName],
      ['Phone', lead.phone],
      ['Outfit', lead.productTitle],
      ['Event Date', lead.eventDate || 'Not specified'],
      ['Rental Duration', lead.rentalDuration || ''],
      ['City', lead.city || ''],
      ['Notes', lead.notes || 'None'],
    ]),
  ]);
}

// Everything that should happen when a blog post goes live
export async function notifyBlogPublished(post: { title: string; slug: string; excerpt?: string; coverImage?: string }) {
  const url = `/blog/${post.slug}`;
  const image = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : `${SITE_CONFIG.domain}${post.coverImage}`
    : undefined;

  await Promise.allSettled([
    createAdminNotification({ type: 'blog', title: 'Blog published', message: post.title, link: url }),
    sendPush('visitor', {
      title: 'New on the Ghar Shagna Da Blog',
      body: post.title,
      url,
      image,
    }),
  ]);
}
