'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Bell, CheckCheck, Trash2, X, Inbox, FileText, BellRing, BellOff } from 'lucide-react';
import { isPushSupported, isSubscribed, subscribeToPush, unsubscribeFromPush } from '@/lib/pushClient';

interface AdminNotificationItem {
  _id: string;
  type: 'lead' | 'blog';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

interface AdminNotificationBellProps {
  // Opens the leads tab when a new-lead notification is clicked
  onOpenLeads: () => void;
}

const POLL_MS = 30_000;

function timeAgo(date: string) {
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AdminNotificationBell({ onOpenLeads }: AdminNotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AdminNotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [pushState, setPushState] = useState<'unsupported' | 'off' | 'on' | 'busy'>('off');
  const [pushError, setPushError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications || []);
      setUnread(data.unread || 0);
    } catch {
      // Offline; keep what we have
    }
  }, []);

  // Poll so new leads show up without refreshing the admin panel
  useEffect(() => {
    const first = setTimeout(load, 0);
    const timer = setInterval(load, POLL_MS);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [load]);

  useEffect(() => {
    if (!isPushSupported()) {
      setTimeout(() => setPushState('unsupported'), 0);
      return;
    }
    isSubscribed('admin').then((on) => setPushState(on ? 'on' : 'off'));
  }, []);

  const send = async (method: 'PATCH' | 'DELETE', body?: object, query = '') => {
    await fetch(`/api/notifications${query}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    load();
  };

  const markRead = (id: string) => {
    setItems((list) => list.map((n) => (n._id === id ? { ...n, read: true } : n)));
    setUnread((u) => Math.max(0, u - 1));
    send('PATCH', { id });
  };

  const markAllRead = () => {
    setItems((list) => list.map((n) => ({ ...n, read: true })));
    setUnread(0);
    send('PATCH', { all: true });
  };

  const remove = (id: string) => {
    setItems((list) => list.filter((n) => n._id !== id));
    send('DELETE', undefined, `?id=${id}`);
  };

  const clearAll = () => {
    setItems([]);
    setUnread(0);
    send('DELETE');
  };

  const openItem = (n: AdminNotificationItem) => {
    if (!n.read) markRead(n._id);
    setOpen(false);
    if (n.type === 'lead') onOpenLeads();
    else if (n.link) window.open(n.link, '_blank', 'noopener');
  };

  const togglePush = async () => {
    setPushError('');
    const wasOn = pushState === 'on';
    setPushState('busy');
    try {
      if (wasOn) {
        await unsubscribeFromPush('admin');
        setPushState('off');
      } else {
        const ok = await subscribeToPush('admin');
        setPushState(ok ? 'on' : 'off');
        if (!ok) setPushError('Notifications are blocked. Allow them in your browser settings for this site.');
      }
    } catch (err) {
      setPushState(wasOn ? 'on' : 'off');
      setPushError((err as Error).message);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Notifications"
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
        className="p-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer relative"
      >
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#8b1828] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-sm">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed left-3 right-3 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200/90 z-50 overflow-hidden">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold tracking-wide">Notifications</span>
              {unread > 0 && (
                <span className="text-[10px] bg-rose-500/30 text-rose-200 font-semibold px-2 py-0.5 rounded-full border border-rose-400/30">
                  {unread} new
                </span>
              )}
            </div>
            {items.length > 0 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={markAllRead}
                  disabled={unread === 0}
                  title="Mark all as read"
                  className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Read all
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  title="Clear all notifications"
                  className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs space-y-2">
                <Inbox className="w-6 h-6 mx-auto text-stone-300" />
                <p>You&apos;re all caught up</p>
              </div>
            ) : (
              items.map((n) => {
                const Icon = n.type === 'lead' ? Bell : FileText;
                return (
                  <div
                    key={n._id}
                    className={`group flex items-start gap-3 p-3 transition-colors ${
                      n.read ? 'bg-white hover:bg-stone-50' : 'bg-rose-50/60 hover:bg-rose-50'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        n.type === 'lead' ? 'bg-[#8b1828]/10 text-[#8b1828]' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <button type="button" onClick={() => openItem(n)} className="flex-1 min-w-0 text-left cursor-pointer">
                      <p className={`text-xs truncate ${n.read ? 'text-stone-700' : 'font-bold text-stone-900'}`}>{n.title}</p>
                      <p className="text-[11px] text-stone-500 truncate">{n.message}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{timeAgo(n.createdAt)}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(n._id)}
                      title="Remove"
                      aria-label="Remove notification"
                      className="p-1 rounded-md text-stone-300 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer: device push alerts + link to leads */}
          <div className="p-2.5 bg-stone-50 border-t border-stone-100 space-y-2">
            {pushState !== 'unsupported' && (
              <button
                type="button"
                onClick={togglePush}
                disabled={pushState === 'busy'}
                className={`w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold py-1.5 rounded-lg border transition-colors cursor-pointer disabled:opacity-50 ${
                  pushState === 'on'
                    ? 'border-stone-200 text-stone-600 hover:bg-white'
                    : 'border-[#8b1828]/30 text-[#8b1828] bg-white hover:bg-rose-50'
                }`}
              >
                {pushState === 'on' ? <BellOff className="w-3.5 h-3.5" /> : <BellRing className="w-3.5 h-3.5" />}
                {pushState === 'on' ? 'Turn off alerts on this device' : 'Get new-lead alerts on this device'}
              </button>
            )}
            {pushError && <p className="text-[10px] text-red-600 text-center">{pushError}</p>}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenLeads();
              }}
              className="w-full text-xs font-bold text-[#8b1828] hover:underline cursor-pointer"
            >
              View All Customer Leads →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
