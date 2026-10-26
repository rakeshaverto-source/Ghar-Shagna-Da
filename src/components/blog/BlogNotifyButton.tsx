'use client';

import React, { useEffect, useState } from 'react';
import { BellRing, BellOff, Check } from 'lucide-react';
import { isPushSupported, isSubscribed, subscribeToPush, unsubscribeFromPush } from '@/lib/pushClient';

// Lets visitors opt in to a browser notification whenever a new blog post is published
// variant="card" wraps the button in a prompt box (used under blog articles)
export default function BlogNotifyButton({ variant = 'button' }: { variant?: 'button' | 'card' }) {
  const [state, setState] = useState<'hidden' | 'off' | 'on' | 'busy' | 'blocked'>('hidden');

  useEffect(() => {
    if (!isPushSupported()) return;
    if (Notification.permission === 'denied') {
      setTimeout(() => setState('blocked'), 0);
      return;
    }
    isSubscribed('visitor').then((on) => setState(on ? 'on' : 'off'));
  }, []);

  if (state === 'hidden') return null;

  const toggle = async () => {
    const wasOn = state === 'on';
    setState('busy');
    try {
      if (wasOn) {
        await unsubscribeFromPush('visitor');
        setState('off');
      } else {
        setState((await subscribeToPush('visitor')) ? 'on' : 'blocked');
      }
    } catch {
      setState(wasOn ? 'on' : 'off');
    }
  };

  if (state === 'blocked') {
    return (
      <p className="text-[11px] text-stone-500">
        Notifications are blocked in your browser. Allow them for this site to get new article alerts.
      </p>
    );
  }

  const on = state === 'on';
  const button = (
    <button
      type="button"
      onClick={toggle}
      disabled={state === 'busy'}
      title={on ? 'Stop new article notifications' : 'Get a notification when we publish a new article'}
      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer disabled:opacity-60 ${
        on
          ? 'bg-white text-stone-700 border-[#EBE3D7] hover:border-stone-400'
          : 'bg-[#8b1828] text-white border-[#8b1828] hover:bg-[#721320] shadow-md shadow-[#8b1828]/20'
      } ${variant === 'card' ? 'shrink-0' : ''}`}
    >
      {on ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 group-hover:hidden" />
          <BellOff className="w-3.5 h-3.5 hidden group-hover:block" />
          <span className="group-hover:hidden">Subscribed to New Articles</span>
          <span className="hidden group-hover:inline">Unsubscribe</span>
        </>
      ) : (
        <>
          <BellRing className="w-3.5 h-3.5" />
          <span>{state === 'busy' ? 'Please wait…' : 'Notify Me of New Articles'}</span>
        </>
      )}
    </button>
  );

  if (variant !== 'card') return button;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 mb-8 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D7]">
      <p className="text-sm text-stone-700">
        <span className="font-bold text-stone-900">Enjoyed this guide?</span> Get notified when we publish the next one.
      </p>
      {button}
    </div>
  );
}
