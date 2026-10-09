'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

// Partitioned Admin Modular Components
import AdminLogin from '@/components/admin/AdminLogin';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import OutfitsTab from '@/components/admin/OutfitsTab';
import InquiriesTab from '@/components/admin/InquiriesTab';
import HeroMediaTab from '@/components/admin/HeroMediaTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import PageSeoTab from '@/components/admin/PageSeoTab';
import OutfitModal from '@/components/admin/OutfitModal';
import HeroSlideModal from '@/components/admin/HeroSlideModal';
import VideoSettingsModal from '@/components/admin/VideoSettingsModal';
import QuickReviewModal from '@/components/admin/QuickReviewModal';
import OutfitInquiriesModal from '@/components/admin/OutfitInquiriesModal';
import ReviewsTab from '@/components/admin/ReviewsTab';
import GalleryTab from '@/components/admin/GalleryTab';
import { OutfitItem, HomeReviewItem, GalleryItemType } from '@/components/admin/types';

// Partitioned Custom Hooks
import { useAdminAuth } from '@/components/admin/hooks/useAdminAuth';
import { useAdminProducts } from '@/components/admin/hooks/useAdminProducts';
import { useAdminHero } from '@/components/admin/hooks/useAdminHero';
import { useAdminInquiries, useAdminSeoAnalytics } from '@/components/admin/hooks/useAdminInquiries';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'analytics' | 'pageseo'>('products');

  // Modular Auth State & Actions
  const {
    isAuthenticated,
    setIsAuthenticated,
    isCheckingAuth,
    passwordInput,
    setPasswordInput,
    loginError,
    handleLogin,
    handleLogout,
  } = useAdminAuth();

  // Modular Products State & Actions
  const {
    products,
    loadingProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    fetchProducts,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    formData,
    setFormData,
    uploadingImage,
    imageError,
    handleAddNewProduct,
    handleEdit,
    handleDeleteProduct,
    handleImageUpload,
    handleSaveProduct,
    handleUpdateProductReviews,
  } = useAdminProducts(setIsAuthenticated);

  // Quick Review Modal State directly from Outfit Table
  const [reviewOutfit, setReviewOutfit] = useState<OutfitItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Quick Inquiries Modal State directly from Outfit Table
  const [inquiryOutfit, setInquiryOutfit] = useState<OutfitItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Modular Bookings & Leads State & Actions
  const {
    bookings,
    loadingBookings,
    fetchBookings,
    handleUpdateBookingStatus,
  } = useAdminInquiries(setIsAuthenticated);

  // Modular Hero Banners & Video State & Actions
  const {
    heroSlides,
    loadingHero,
    isHeroEnabled,
    updatingHeroEnabled,
    heroMediaMode,
    updatingMediaMode,
    isVideoModalOpen,
    setIsVideoModalOpen,
    uploadingVideo,
    videoUploadError,
    videoSettings,
    setVideoSettings,
    isHeroModalOpen,
    setIsHeroModalOpen,
    editingHeroSlide,
    heroFormData,
    setHeroFormData,
    uploadingHeroImage,
    fetchHeroSlides,
    handleToggleHeroEnabled,
    handleToggleHeroMediaMode,
    handleToggleSlideVisibility,
    handleVideoFileUpload,
    handleSaveVideoSettings,
    handleResetOrDeleteVideo,
    handleAddNewHero,
    handleEditHero,
    handleDeleteHeroSlide,
    handleHeroImageUpload,
    handleSaveHeroSlide,
  } = useAdminHero();

  // Modular SEO & Analytics State & Actions
  const {
    analyticsSettings,
    setAnalyticsSettings,
    isSavingAnalytics,
    analyticsSaveMessage,
    syncAnalyticsFromApi,
    handleSaveAnalyticsSettings,
  } = useAdminSeoAnalytics();

  // Modular Home Page Reviews State & Actions
  const [homeReviews, setHomeReviews] = useState<HomeReviewItem[]>([]);
  const [loadingHomeReviews, setLoadingHomeReviews] = useState(false);

  // Modular Gallery State & Actions
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.items) {
        setGalleryItems(data.items);
      }
    } catch (err) {
      console.error('Failed to load gallery items', err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleCreateGalleryItem = async (itemData: Partial<GalleryItemType>) => {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (res.ok && data.item) {
      setGalleryItems((prev) => [...prev, data.item]);
    } else {
      alert(data.error || 'Failed to add gallery item');
    }
  };

  const handleUpdateGalleryItem = async (itemData: GalleryItemType) => {
    const res = await fetch('/api/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (res.ok && data.item) {
      setGalleryItems((prev) =>
        prev.map((item) => (item._id === itemData._id ? data.item : item))
      );
    } else {
      alert(data.error || 'Failed to update gallery item');
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    const res = await fetch(`/api/gallery?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert('Failed to delete gallery item');
    }
  };

  const fetchHomeReviews = async () => {
    setLoadingHomeReviews(true);
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.reviews) {
        setHomeReviews(data.reviews);
      }
    } catch (err) {
      console.error('Failed to load testimonials', err);
    } finally {
      setLoadingHomeReviews(false);
    }
  };

  const handleCreateHomeReview = async (revData: Partial<HomeReviewItem>) => {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(revData),
    });
    const data = await res.json();
    if (res.ok && data.review) {
      setHomeReviews((prev) => [data.review, ...prev]);
    } else {
      alert(data.error || 'Failed to create review');
    }
  };

  const handleUpdateHomeReview = async (revData: HomeReviewItem) => {
    const res = await fetch('/api/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(revData),
    });
    const data = await res.json();
    if (res.ok && data.review) {
      setHomeReviews((prev) =>
        prev.map((r) => (r._id === revData._id ? data.review : r))
      );
    } else {
      alert(data.error || 'Failed to update review');
    }
  };

  const handleDeleteHomeReview = async (id: string) => {
    const res = await fetch(`/api/testimonials?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setHomeReviews((prev) => prev.filter((r) => r._id !== id));
    } else {
      alert('Failed to delete review');
    }
  };

  // On Login / Mount, load initial data
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchBookings();
      fetchHomeReviews();
      fetchGallery();
      fetchHeroSlides().then((data) => {
        if (data) syncAnalyticsFromApi(data);
      });
    }
  }, [isAuthenticated]);

  // Loading State while verifying session cookie
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-[#8b1828]/10 text-[#8b1828] flex items-center justify-center mb-3">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
          Verifying Admin Session...
        </p>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <AdminLogin
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        loginError={loginError}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col md:flex-row">
      {/* 🧭 LUXURY ADMIN SIDEBAR */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
        bookingsCount={bookings.length}
        heroSlidesCount={heroSlides.length}
        reviewsCount={homeReviews.length}
        galleryCount={galleryItems.length}
        handleAddNewProduct={handleAddNewProduct}
        handleLogout={handleLogout}
      />

      {/* 🖥️ MAIN ADMIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Minimal Admin Bar */}
        <AdminHeader
          activeTab={activeTab}
          onRefresh={() => {
            if (activeTab === 'products') fetchProducts();
            else if (activeTab === 'bookings') fetchBookings();
            else if (activeTab === 'reviews') fetchHomeReviews();
            else if (activeTab === 'gallery') fetchGallery();
            else {
              fetchHeroSlides().then((data) => {
                if (data) syncAnalyticsFromApi(data);
              });
            }
          }}
          onAddNewProduct={handleAddNewProduct}
          onAddNewHero={handleAddNewHero}
        />

        {/* Workspace Body */}
        <div className="p-6">
          {/* TAB 1: PRODUCTS INVENTORY */}
          {activeTab === 'products' && (
            <OutfitsTab
              products={products}
              filteredProducts={filteredProducts}
              loadingProducts={loadingProducts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleEdit={handleEdit}
              handleDeleteProduct={handleDeleteProduct}
              onOpenReviews={(p) => {
                setReviewOutfit(p);
                setIsReviewModalOpen(true);
              }}
              onOpenInquiries={(p) => {
                setInquiryOutfit(p);
                setIsInquiryModalOpen(true);
              }}
              bookings={bookings}
            />
          )}

          {/* TAB 2: INQUIRIES & LEADS */}
          {activeTab === 'bookings' && (
            <InquiriesTab
              bookings={bookings}
              loadingBookings={loadingBookings}
              fetchBookings={fetchBookings}
              handleUpdateBookingStatus={handleUpdateBookingStatus}
            />
          )}

          {/* TAB 3: HERO BANNERS & MEDIA SLIDES */}
          {activeTab === 'hero' && (
            <HeroMediaTab
              isHeroEnabled={isHeroEnabled}
              updatingHeroEnabled={updatingHeroEnabled}
              heroMediaMode={heroMediaMode}
              updatingMediaMode={updatingMediaMode}
              heroSlides={heroSlides}
              loadingHero={loadingHero}
              videoSettings={videoSettings}
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
              handleToggleHeroEnabled={handleToggleHeroEnabled}
              handleToggleHeroMediaMode={handleToggleHeroMediaMode}
              handleToggleSlideVisibility={handleToggleSlideVisibility}
              handleAddNewHero={handleAddNewHero}
              handleEditHero={handleEditHero}
              handleDeleteHeroSlide={handleDeleteHeroSlide}
            />
          )}

          {/* TAB 4: HOME PAGE REVIEWS & STORIES */}
          {activeTab === 'reviews' && (
            <ReviewsTab
              reviews={homeReviews}
              loadingReviews={loadingHomeReviews}
              onRefreshReviews={fetchHomeReviews}
              onCreateReview={handleCreateHomeReview}
              onUpdateReview={handleUpdateHomeReview}
              onDeleteReview={handleDeleteHomeReview}
            />
          )}

          {/* TAB 5: PHOTO GALLERY & REAL BRIDE SHOWCASE */}
          {activeTab === 'gallery' && (
            <GalleryTab
              galleryItems={galleryItems}
              loadingGallery={loadingGallery}
              onRefreshGallery={fetchGallery}
              onCreateGalleryItem={handleCreateGalleryItem}
              onUpdateGalleryItem={handleUpdateGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
              products={products}
            />
          )}

          {/* TAB 5: PER-PAGE SEO (TITLES & METAS) */}
          {activeTab === 'pageseo' && (
            <PageSeoTab
              analyticsSettings={analyticsSettings}
              setAnalyticsSettings={setAnalyticsSettings}
              handleSaveAnalyticsSettings={handleSaveAnalyticsSettings}
              isSaving={isSavingAnalytics}
              saveMessage={analyticsSaveMessage}
              products={products}
            />
          )}

          {/* TAB 5: SEO, GA4 & META PIXEL */}
          {activeTab === 'analytics' && (
            <AnalyticsTab
              analyticsSettings={analyticsSettings}
              setAnalyticsSettings={setAnalyticsSettings}
              handleSaveAnalyticsSettings={handleSaveAnalyticsSettings}
              isSaving={isSavingAnalytics}
              saveMessage={analyticsSaveMessage}
            />
          )}
        </div>
      </main>

      {/* MODAL: EDIT VIDEO & TEXT SETTINGS */}
      <VideoSettingsModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSettings={videoSettings}
        setVideoSettings={setVideoSettings}
        uploadingVideo={uploadingVideo}
        videoUploadError={videoUploadError}
        handleVideoFileUpload={handleVideoFileUpload}
        handleSaveVideoSettings={handleSaveVideoSettings}
        handleResetOrDeleteVideo={handleResetOrDeleteVideo}
      />

      {/* MODAL: ADD / EDIT OUTFIT */}
      <OutfitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        uploadingImage={uploadingImage}
        imageError={imageError}
        handleImageUpload={handleImageUpload}
        handleSaveProduct={handleSaveProduct}
      />

      {/* MODAL: ADD / EDIT HERO SLIDE */}
      <HeroSlideModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        editingHeroSlide={editingHeroSlide}
        heroFormData={heroFormData}
        setHeroFormData={setHeroFormData}
        uploadingImage={uploadingHeroImage}
        handleHeroImageUpload={handleHeroImageUpload}
        handleSaveHeroSlide={handleSaveHeroSlide}
      />

      {/* MODAL: QUICK REVIEWS DIRECTLY FROM OUTFITS TABLE */}
      <QuickReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={
          products.find((p) => p._id === reviewOutfit?._id || p.id === reviewOutfit?.id) ||
          reviewOutfit
        }
        onUpdateProductReviews={handleUpdateProductReviews}
      />

      {/* MODAL: QUICK INQUIRIES DIRECTLY FROM OUTFITS TABLE */}
      <OutfitInquiriesModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        product={inquiryOutfit}
        inquiries={
          inquiryOutfit
            ? bookings.filter(
                (b) =>
                  b.productTitle &&
                  (b.productTitle.toLowerCase() === inquiryOutfit.title.toLowerCase() ||
                    inquiryOutfit.title.toLowerCase().includes(b.productTitle.toLowerCase()) ||
                    b.productTitle.toLowerCase().includes(inquiryOutfit.title.toLowerCase()))
              )
            : []
        }
        onUpdateBookingStatus={handleUpdateBookingStatus}
      />
    </div>
  );
}
