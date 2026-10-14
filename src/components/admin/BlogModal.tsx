'use client';

import React, { useState, useEffect } from 'react';
import { BlogPostItem } from '@/components/admin/types';
import { X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPostItem | null;
  onSuccess: () => void;
  setIsAuthenticated: (val: boolean) => void;
}

export default function BlogModal({
  isOpen,
  onClose,
  blog,
  onSuccess,
  setIsAuthenticated,
}: BlogModalProps) {
  const isEditing = Boolean(blog);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Bridal Fashion',
    author: 'Ghar Shagna Da Styling Team',
    authorRole: 'Bridal Stylist',
    readTime: '4 min read',
    tagsInput: 'Bridal Lehenga, Wedding Wear, Punjab',
    metaTitle: '',
    metaDescription: '',
    isPublished: true,
    isFeatured: false,
  });

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const STANDARD_CATEGORIES = ['Bridal Fashion', 'Groom Wear', 'NRI Brides', 'Wedding Tips', 'Celebrity & Trends'];

  useEffect(() => {
    if (blog) {
      const isCustom = Boolean(blog.category && !STANDARD_CATEGORIES.includes(blog.category));
      setIsCustomCategory(isCustom);
      setCustomCategory(isCustom ? blog.category : '');

      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        coverImage: blog.coverImage || '',
        category: blog.category || 'Bridal Fashion',
        author: blog.author || 'Ghar Shagna Da Styling Team',
        authorRole: blog.authorRole || 'Bridal Stylist',
        readTime: blog.readTime || '4 min read',
        tagsInput: blog.tags ? blog.tags.join(', ') : '',
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        isPublished: blog.isPublished ?? true,
        isFeatured: blog.isFeatured ?? false,
      });
    } else {
      setIsCustomCategory(false);
      setCustomCategory('');
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
        category: 'Bridal Fashion',
        author: 'Ghar Shagna Da Styling Team',
        authorRole: 'Bridal Stylist',
        readTime: '4 min read',
        tagsInput: 'Bridal Lehenga, Wedding Wear, Punjab',
        metaTitle: '',
        metaDescription: '',
        isPublished: true,
        isFeatured: false,
      });
    }
    setErrorMsg('');
  }, [blog, isOpen]);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const autoSlug = !isEditing
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
        : prev.slug;
      return {
        ...prev,
        title: val,
        slug: autoSlug,
      };
    });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      const result = await res.json();
      if (result.url) {
        setFormData((prev) => ({ ...prev, coverImage: result.url }));
      } else {
        setErrorMsg(result.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Image upload network failure');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, forceDraft?: boolean) => {
    if (e) e.preventDefault();
    if (!formData.title || !formData.content) {
      setErrorMsg('Title and Content are required');
      return;
    }

    if (isCustomCategory && !customCategory.trim()) {
      setErrorMsg('Please enter a name for the new category');
      return;
    }

    const finalCategory = isCustomCategory ? customCategory.trim() : formData.category;

    setSaving(true);
    setErrorMsg('');

    const tags = formData.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const isPub = forceDraft !== undefined ? !forceDraft : formData.isPublished;

    const payload = {
      ...formData,
      category: finalCategory,
      isPublished: isPub,
      tags,
      ...(isEditing ? { id: blog?.id || blog?._id } : {}),
    };

    try {
      const res = await fetch('/api/blogs', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to save blog post');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error saving blog');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const previewTitle = formData.metaTitle.trim() || formData.title || 'Wedding Rental Guide';
  const previewDesc =
    formData.metaDescription.trim() ||
    formData.excerpt ||
    formData.content.substring(0, 150) ||
    'Read our luxury wedding wear guide on Ghar Shagna Da.';
  const previewSlug = formData.slug || 'wedding-guide';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl border border-stone-200 my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#8b1828]/10 text-[#8b1828] flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                {isEditing ? 'Edit Wedding Article' : 'Create New Wedding Guide'}
              </h3>
              <p className="text-[11px] text-stone-500">
                2-in-1 Editor: Write article content on the left & fine-tune Google SEO on the right.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - 2 Columns */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 📝 PART 1: LEFT SIDE - BLOG ARTICLE CONTENT (7 COLS) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8b1828]" />
                  Part 1: Blog Article Content
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Main Story & Media</span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Royal Groom Sherwanis: How to Match with Your Bride in Style"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 focus:border-[#8b1828] font-medium"
                />
              </div>

              {/* Category & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={
                      ['Bridal Fashion', 'Groom Wear', 'NRI Brides', 'Wedding Tips', 'Celebrity & Trends'].includes(formData.category)
                        ? formData.category
                        : 'Other'
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        setIsCustomCategory(true);
                        setCustomCategory(
                          !['Bridal Fashion', 'Groom Wear', 'NRI Brides', 'Wedding Tips', 'Celebrity & Trends'].includes(formData.category)
                            ? formData.category
                            : ''
                        );
                      } else {
                        setIsCustomCategory(false);
                        setFormData({ ...formData, category: val });
                      }
                    }}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                  >
                    <option value="Bridal Fashion">Bridal Fashion</option>
                    <option value="Groom Wear">Groom Wear</option>
                    <option value="NRI Brides">NRI Brides</option>
                    <option value="Wedding Tips">Wedding Tips</option>
                    <option value="Celebrity & Trends">Celebrity & Trends</option>
                    <option value="Other">+ Other (Create New Category)</option>
                  </select>

                  {isCustomCategory && (
                    <div className="mt-1.5 animate-in fade-in duration-200">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomCategory(val);
                          setFormData({ ...formData, category: val });
                        }}
                        placeholder="Enter new category name..."
                        className="w-full px-3 py-2 bg-rose-50/50 border border-rose-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 font-medium"
                        autoFocus
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                    Article URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="groom-sherwani-matching-tips"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                  />
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                  Cover Image URL or Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://... or upload local image"
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 font-mono"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFileChange}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {formData.coverImage && (
                  <div className="mt-2 relative h-24 w-40 rounded-xl overflow-hidden border border-stone-200 shadow-xs">
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                  Summary / Excerpt (Lead Intro)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief introductory summary shown on blog cards..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 leading-relaxed"
                />
              </div>

              {/* Article Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Article Body * (Markdown Supported)
                  </label>
                  <span className="text-[10px] text-stone-400">### Heading | * Bullet</span>
                </div>
                <textarea
                  rows={9}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full blog article here... Use ### Subheadings, * Bullets, or 1. Numbered lists."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 leading-relaxed"
                />
              </div>

              {/* Author, Role & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1 uppercase tracking-wider">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1 uppercase tracking-wider">
                    Role
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1 uppercase tracking-wider">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1 uppercase tracking-wider">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="Groom Sherwani, Wedding Styling, Color Coordination"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                />
              </div>
            </div>

            {/* 🔍 PART 2: RIGHT SIDE - SEO & GOOGLE PREVIEW (5 COLS) */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EBE3D7] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E0D7C9]">
                <span className="text-xs font-bold text-[#8b1828] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Part 2: Google SEO Settings
                </span>
              </div>

              {/* Live Google Search Preview Card */}
              <div>
                <p className="text-[11px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                  Live Google Search Snippet Preview:
                </p>
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs text-left">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1">
                    <span className="font-medium text-stone-700">gharshagnada.com</span>
                    <span>›</span>
                    <span className="text-stone-400 truncate">blog › {previewSlug}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                    {previewTitle}
                  </h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {previewDesc}
                  </p>
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Custom Meta Title
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      formData.metaTitle.length > 60 ? 'text-amber-600' : 'text-stone-400'
                    }`}
                  >
                    {formData.metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="e.g. Royal Groom Sherwanis on Rent in Chandigarh | Ghar Shagna Da"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  Leave blank to auto-use the article title.
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Custom Meta Description
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      formData.metaDescription.length > 160 ? 'text-amber-600' : 'text-stone-400'
                    }`}
                  >
                    {formData.metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="e.g. Rent designer groom sherwanis, achkans, and stoles in Chandigarh. Complimentary fitting alterations included..."
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 leading-relaxed"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  Leave blank to auto-use the summary/excerpt above.
                </p>
              </div>

              {/* Visibility Settings */}
              <div className="pt-2 border-t border-[#E0D7C9] space-y-2">
                <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                  Publishing & Visibility
                </p>

                <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-[#8b1828] focus:ring-[#8b1828]"
                  />
                  <span>Publish Publicly (Indexed by Google)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>Feature on Homepage Section</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Changes reflect immediately on your live website upon saving.
            </span>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={saving || uploadingImage}
                onClick={() => handleSubmit(undefined, true)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>

              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="px-6 py-2.5 rounded-xl bg-[#8b1828] hover:bg-[#70121f] text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Saving...' : isEditing ? 'Update & Publish' : 'Publish Article & SEO'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
