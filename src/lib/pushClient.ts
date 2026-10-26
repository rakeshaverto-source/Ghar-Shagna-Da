// Browser-side helpers for web push subscriptions (see public/sw.js and /api/push)

export type PushAudience = 'admin' | 'visitor';

export function isPushSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window &&
    Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

async function getRegistration() {
  return navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
}

// localStorage remembers which audiences this browser joined, since one browser
// subscription can be saved for both admin and visitor alerts
const storageKey = (audience: PushAudience) => `gsd_push_${audience}`;

export async function isSubscribed(audience: PushAudience) {
  if (!isPushSupported() || Notification.permission !== 'granted') return false;
  const registration = await navigator.serviceWorker.getRegistration('/');
  const sub = await registration?.pushManager.getSubscription();
  try {
    return Boolean(sub) && localStorage.getItem(storageKey(audience)) === '1';
  } catch {
    return Boolean(sub);
  }
}

// Asks for permission (if needed), subscribes and saves the subscription on the server.
// Returns false when the user blocks notifications.
export async function subscribeToPush(audience: PushAudience) {
  if (!isPushSupported()) throw new Error('Notifications are not supported in this browser.');

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  const registration = await getRegistration();
  await navigator.serviceWorker.ready;
  const subscription =
    (await registration.pushManager.getSubscription()) ||
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    }));

  const res = await fetch('/api/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription: subscription.toJSON(), audience }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Could not turn on notifications.');
  }
  try {
    localStorage.setItem(storageKey(audience), '1');
  } catch {
    // Private mode etc.; the subscription still works
  }
  return true;
}

// Stops this audience's alerts on this browser; the browser subscription itself is kept
// in case the other audience still uses it
export async function unsubscribeFromPush(audience: PushAudience) {
  const registration = await navigator.serviceWorker.getRegistration('/');
  const subscription = await registration?.pushManager.getSubscription();
  if (subscription) {
    await fetch('/api/push', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: subscription.endpoint, audience }),
    });
  }
  try {
    localStorage.removeItem(storageKey(audience));
  } catch {
    // ignore
  }
}
