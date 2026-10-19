'use client';

import React, { useState } from 'react';
import { OutfitItem, ProductReviewItem } from './types';
import QuickReviewHeader from './quick-review/QuickReviewHeader';
import QuickReviewForm from './quick-review/QuickReviewForm';
import QuickReviewList from './quick-review/QuickReviewList';

interface QuickReviewModalProps {
  product: OutfitItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProductReviews: (productId: string, updatedReviews: ProductReviewItem[]) => Promise<void>;
}

export default function QuickReviewModal({
  product,
  isOpen,
  onClose,
  onUpdateProductReviews,
}: QuickReviewModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('Verified Bride');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const currentReviews = product.reviews || [];

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      alert('Please enter bride/customer name and review message.');
      return;
    }

    const newReview: ProductReviewItem = {
      author: author.trim(),
      city: city.trim() || 'Punjab',
      date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      rating,
      comment: comment.trim(),
      image: image.trim() || undefined,
      tag,
    };

    const updated = [newReview, ...currentReviews];
    setIsSubmitting(true);
    try {
      await onUpdateProductReviews(product._id || product.id, updated);
      setAuthor('');
      setCity('');
      setComment('');
      setImage('');
      setRating(5);
      setShowAddForm(false);
    } catch {
      alert('Failed to save review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (index: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    const updated = currentReviews.filter((_, i) => i !== index);
    setIsSubmitting(true);
    try {
      await onUpdateProductReviews(product._id || product.id, updated);
    } catch {
      alert('Failed to delete review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveReview = async (index: number) => {
    const updated = currentReviews.map((r, i) => (i === index ? { ...r, approved: true } : r));
    setIsSubmitting(true);
    try {
      await onUpdateProductReviews(product._id || product.id, updated);
    } catch {
      alert('Failed to approve review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-2xl w-full shadow-2xl relative my-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modular Header */}
        <QuickReviewHeader
          product={product}
          reviewsCount={currentReviews.length}
          showAddForm={showAddForm}
          onToggleAddForm={() => setShowAddForm(!showAddForm)}
          onClose={onClose}
        />

        {/* Modular Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {showAddForm && (
            <QuickReviewForm
              author={author}
              setAuthor={setAuthor}
              city={city}
              setCity={setCity}
              rating={rating}
              setRating={setRating}
              tag={tag}
              setTag={setTag}
              image={image}
              setImage={setImage}
              comment={comment}
              setComment={setComment}
              isSubmitting={isSubmitting}
              onSubmit={handleAddReview}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          <QuickReviewList
            reviews={currentReviews}
            isSubmitting={isSubmitting}
            onDeleteReview={handleDeleteReview}
            onApproveReview={handleApproveReview}
          />
        </div>
      </div>
    </div>
  );
}
