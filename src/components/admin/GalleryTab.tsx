'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItemType, OutfitItem } from './types';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  RefreshCw,
  Upload,
  Check,
  X,
  Sparkles,
  Eye,
  MapPin,
  Heart,
} from 'lucide-react';

interface GalleryTabProps {
  galleryItems: GalleryItemType[];
  loadingGallery: boolean;
  onRefreshGallery: () => Promise<void>;
  onCreateGalleryItem: (item: Partial<GalleryItemType>) => Promise<void>;
  onUpdateGalleryItem: (item: GalleryItemType) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
  products?: OutfitItem[];
}

const GALLERY_CATEGORIES = [
  'All',
  'Bridal Lehengas',
  'Groom Sherwanis',
  'Wedding Gowns',
  'Real Brides & Grooms',
  'Haldi & Sangeet',
];

export default function GalleryTab({
  galleryItems,
  loadingGallery,
  onRefreshGallery,
  onCreateGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  products = [],
}: GalleryTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemType | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState('Bridal Lehengas');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [productSlug, setProductSlug] = useState('');
  const [brideName, setBrideName] = useState('');
  const [location, setLocation] = useState('Punjab');
  const [isFeatured, setIsFeatured] = useState(true);
  const [order, setOrder] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brideName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setAltText('');
    setCategory('Bridal Lehengas');
    setImageUrl('');
    setCaption('');
    setProductSlug('');
    setBrideName('');
    setLocation('Punjab');
    setIsFeatured(true);
    setOrder(galleryItems.length + 1);
    setUploadError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItemType) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setAltText(item.altText || item.title || '');
    setCategory(item.category || 'Bridal Lehengas');
    setImageUrl(item.imageUrl || '');
    setCaption(item.caption || '');
    setProductSlug(item.productSlug || '');
    setBrideName(item.brideName || '');
    setLocation(item.location || 'Punjab');
    setIsFeatured(item.isFeatured !== undefined ? item.isFeatured : true);
    setOrder(item.order || 1);
    setUploadError('');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      alert('Please enter a photo title and provide an image URL');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem && editingItem._id) {
        await onUpdateGalleryItem({
          ...editingItem,
          title,
          altText: altText.trim() || title,
          category,
          imageUrl,
          thumbnailUrl: imageUrl,
          caption,
          productSlug,
          brideName,
          location,
          isFeatured,
          order: Number(order) || 1,
        });
      } else {
        await onCreateGalleryItem({
          title,
          altText: altText.trim() || title,
          category,
          imageUrl,
          thumbnailUrl: imageUrl,
          caption,
          productSlug,
          brideName,
          location,
          isFeatured,
          order: Number(order) || 1,
        });
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to save gallery item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar & stats */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">Photo Gallery Management</h2>
            <span className="text-[11px] font-bold bg-[#8b1828]/10 text-[#8b1828] px-3 py-0.5 rounded-full whitespace-nowrap">
              {galleryItems.length} Photos
            </span>
          </div>
          <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
            Upload royal photoshoot images, bride wedding moments, and catalog outfits visible on{' '}
            <a href="/gallery" target="_blank" className="text-[#8b1828] font-semibold underline underline-offset-2">
              /gallery
            </a>
            .
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => onRefreshGallery()}
            disabled={loadingGallery}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingGallery ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>View Public Gallery</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#8b1828] text-white hover:bg-[#70121f] shadow-sm shadow-[#8b1828]/20 transition-all hover:scale-102 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-end gap-4">

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, bride, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-[#8b1828]"
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loadingGallery ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-stone-200">
          <RefreshCw className="w-8 h-8 text-[#8b1828] animate-spin mx-auto mb-3" />
          <p className="text-sm text-stone-600 font-medium">Loading gallery showcase...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-stone-300">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-base font-semibold text-stone-800">No photos found</p>
          <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'Try adjusting your search criteria or select another category.'
              : 'Add your first bridal photoshoot picture to showcase on the website.'}
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#8b1828] text-white hover:bg-[#70121f]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Photo Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Photo Box */}
              <div className="relative aspect-4/5 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />



                {/* Quick Action Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 rounded-xl bg-white text-stone-800 hover:bg-stone-100 shadow transition-transform hover:scale-110"
                    title="Edit Photo"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (item._id && confirm(`Are you sure you want to delete "${item.title}"?`)) {
                        onDeleteGalleryItem(item._id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow transition-transform hover:scale-110"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-stone-900 line-clamp-1 group-hover:text-[#8b1828] transition-colors">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                  <div className="flex items-center gap-1 font-medium text-stone-600">
                    <Heart className="w-3 h-3 text-[#8b1828]" />
                    <span>{item.brideName || 'Ghar Shagna Da Bride'}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-0.5 text-stone-400">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: ADD / EDIT GALLERY ITEM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl border border-stone-200 shadow-2xl overflow-hidden my-8">
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#8b1828]/10 text-[#8b1828] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">
                    {editingItem ? 'Edit Gallery Photo' : 'Add Photo to Gallery'}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Showcase wedding moments, brides, and catalog collections
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Photo Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Photo Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Heritage Crimson Velvet Lehenga"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#8b1828]"
                />
              </div>

              {/* Image Alt Tag (SEO) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Image Alt Tag (SEO) <span className="text-stone-400 font-normal">(Optional - defaults to title)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red bridal lehenga worn by bride at wedding in Punjab"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#8b1828]"
                />
              </div>



              {/* Image Upload / URL */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Image Source <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter image URL (e.g. /hero-bride.jpg or https://...)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#8b1828]"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {uploadError && <p className="text-[11px] text-rose-500 font-medium">{uploadError}</p>}

                  {/* Image Preview */}
                  {imageUrl && (
                    <div className="relative aspect-16/9 w-full max-w-sm rounded-xl overflow-hidden border border-stone-200 bg-stone-50 mt-2">
                      <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>






              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="px-5 py-2 text-xs font-bold bg-[#8b1828] text-white hover:bg-[#70121f] rounded-xl shadow-md transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{editingItem ? 'Save Changes' : 'Add to Gallery'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
