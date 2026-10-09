'use client';

import React from 'react';
import { X, UploadCloud, Save, Trash2 } from 'lucide-react';
import { VideoSettings } from './types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSettings: VideoSettings;
  setVideoSettings: React.Dispatch<React.SetStateAction<VideoSettings>>;
  uploadingVideo: boolean;
  videoUploadError: string;
  handleVideoFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveVideoSettings: (e: React.FormEvent) => void;
  handleResetOrDeleteVideo: () => void;
}

export default function VideoSettingsModal({
  isOpen,
  onClose,
  videoSettings,
  setVideoSettings,
  uploadingVideo,
  videoUploadError,
  handleVideoFileUpload,
  handleSaveVideoSettings,
  handleResetOrDeleteVideo,
}: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b1828] block">
            Hero Video Manager
          </span>
          <h2 className="text-xl font-bold text-stone-900">
            Edit Video Source & Overlay Text
          </h2>
          <p className="text-xs text-stone-500">
            Upload custom MP4 video, replace URL, delete/clear video, and customize headline text.
          </p>
        </div>

        <form onSubmit={handleSaveVideoSettings} className="space-y-4">
          {/* Video Upload & URL */}
          <div className="bg-[#FAF8F5] border border-dashed border-stone-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-stone-700">
                Hero Video Source (MP4 / WebM)
              </label>
              {videoSettings.videoUrl && (
                <button
                  type="button"
                  onClick={handleResetOrDeleteVideo}
                  className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete / Clear Video</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 bg-white border border-stone-200 hover:border-[#8b1828] text-stone-700 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors shrink-0">
                <UploadCloud className="w-4 h-4 text-[#8b1828]" />
                <span>{uploadingVideo ? 'Uploading Video...' : 'Upload Video File'}</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileUpload}
                  disabled={uploadingVideo}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                placeholder="/luxury_lehengas.mp4 or Cloudinary URL"
                value={videoSettings.videoUrl}
                onChange={(e) => setVideoSettings({ ...videoSettings, videoUrl: e.target.value })}
                className="flex-1 bg-white border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>

            {videoUploadError && (
              <p className="text-[11px] text-red-600 font-medium">{videoUploadError}</p>
            )}

            {/* Video preview mini */}
            {videoSettings.videoUrl && (
              <div className="relative aspect-[21/9] max-h-36 bg-black rounded-xl overflow-hidden border border-stone-200">
                <video
                  key={videoSettings.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={videoSettings.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  Preview Active
                </div>
              </div>
            )}
          </div>

          {/* Heading Text Customization */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Heading Prefix *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SHAGNA DI"
                value={videoSettings.videoHeadingPrefix}
                onChange={(e) => setVideoSettings({ ...videoSettings, videoHeadingPrefix: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Script Highlight (Yellow) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Raat / Dulha"
                value={videoSettings.videoHeadingHighlight}
                onChange={(e) => setVideoSettings({ ...videoSettings, videoHeadingHighlight: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Top Gold Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. TIMELESS DESIGNS. SHAHI ANDAAZ."
              value={videoSettings.videoTagline}
              onChange={(e) => setVideoSettings({ ...videoSettings, videoTagline: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Sub-tagline (Description)
            </label>
            <input
              type="text"
              placeholder="e.g. Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent."
              value={videoSettings.videoSubtagline}
              onChange={(e) => setVideoSettings({ ...videoSettings, videoSubtagline: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                placeholder="Explore Bridal Rentals"
                value={videoSettings.videoCtaText}
                onChange={(e) => setVideoSettings({ ...videoSettings, videoCtaText: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                CTA Button URL Link
              </label>
              <input
                type="text"
                placeholder="/category/bridal-lehengas"
                value={videoSettings.videoCtaLink}
                onChange={(e) => setVideoSettings({ ...videoSettings, videoCtaLink: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#8b1828] hover:bg-[#721320] text-white px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Video & Text</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
