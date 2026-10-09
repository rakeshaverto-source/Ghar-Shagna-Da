'use client';

import React from 'react';
import { Sparkles, Database } from 'lucide-react';

interface AdminLoginProps {
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  loginError: string;
  handleLogin: (e: React.FormEvent) => void;
}

export default function AdminLogin({
  passwordInput,
  setPasswordInput,
  loginError,
  handleLogin,
}: AdminLoginProps) {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4">
      <div className="bg-white border border-[#ede3d5] rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-[#8b1828] mb-4">
          <Sparkles className="w-7 h-7" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8b1828] block mb-1">
          Ghar Shagna Da
        </span>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
          Admin Management Portal
        </h1>
        <p className="text-xs text-stone-500 mb-6">
          Enter master key to manage bridal inventory, rentals, and customer queries.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Admin Password (e.g. admin123)"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8b1828] focus:bg-white text-center"
            autoFocus
          />
          {loginError && <p className="text-xs text-red-600 font-medium">{loginError}</p>}
          <button
            type="submit"
            className="w-full bg-[#8b1828] hover:bg-[#721320] text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
          >
            Unlock Dashboard
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-400">
          <Database className="w-3.5 h-3.5" />
          <span>Connected to MongoDB & Cloudinary</span>
        </div>
      </div>
    </div>
  );
}
