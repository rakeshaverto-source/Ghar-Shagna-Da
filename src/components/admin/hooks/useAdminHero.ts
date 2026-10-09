import { useState } from 'react';
import { HeroSlideItem, VideoSettings } from '../types';

export function useAdminHero() {
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>([]);
  const [loadingHero, setLoadingHero] = useState(false);
  const [isHeroEnabled, setIsHeroEnabled] = useState<boolean>(true);
  const [updatingHeroEnabled, setUpdatingHeroEnabled] = useState(false);
  const [heroMediaMode, setHeroMediaMode] = useState<'video' | 'image'>('video');
  const [updatingMediaMode, setUpdatingMediaMode] = useState(false);

  // Video Settings
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState('');
  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    videoUrl: '/luxury_lehengas.mp4',
    videoHeadingPrefix: 'SHAGNA DI',
    videoHeadingHighlight: 'Raat',
    videoTagline: 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
    videoSubtagline: 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
    videoCtaText: 'Explore Bridal Rentals',
    videoCtaLink: '/category/bridal-lehengas',
  });

  // Hero Slide Modal
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlideItem | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [heroFormData, setHeroFormData] = useState<Partial<HeroSlideItem>>({
    slideId: '',
    desktopImage: '/creative-bridal.jpg',
    mobileImage: '/mobile-bridal.jpg',
    subtitle: 'CRAFTED TO CELEBRATE',
    headingPrefix: 'SHAGNA DI',
    headingHighlight: 'Raat',
    tagline: 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
    subtagline: 'Bridal Lehengas on Rent',
    ctaText: 'Explore Rentals',
    ctaLink: '/catalog',
    theme: 'warm',
    order: 1,
  });

  const fetchHeroSlides = async () => {
    setLoadingHero(true);
    try {
      const res = await fetch('/api/hero');
      const data = await res.json();
      if (data.slides) {
        setHeroSlides(data.slides);
      }
      if (data.isHeroEnabled !== undefined) {
        setIsHeroEnabled(Boolean(data.isHeroEnabled));
      }
      if (data.heroMediaMode) {
        setHeroMediaMode(data.heroMediaMode);
      }
      setVideoSettings({
        videoUrl: data.videoUrl || '/luxury_lehengas.mp4',
        videoHeadingPrefix: data.videoHeadingPrefix || 'SHAGNA DI',
        videoHeadingHighlight: data.videoHeadingHighlight || 'Raat',
        videoTagline: data.videoTagline || 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
        videoSubtagline: data.videoSubtagline || 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
        videoCtaText: data.videoCtaText || 'Explore Bridal Rentals',
        videoCtaLink: data.videoCtaLink || '/category/bridal-lehengas',
      });
      return data;
    } catch (err) {
      console.error('Failed to load hero slides', err);
      return null;
    } finally {
      setLoadingHero(false);
    }
  };

  const handleToggleHeroEnabled = async (enabled: boolean) => {
    if (updatingHeroEnabled) return;
    setUpdatingHeroEnabled(true);
    setIsHeroEnabled(enabled);
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          isHeroEnabled: enabled,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setIsHeroEnabled(!enabled);
        alert('Failed to update Hero section status.');
      }
    } catch {
      setIsHeroEnabled(!enabled);
      alert('Error updating Hero section status.');
    } finally {
      setUpdatingHeroEnabled(false);
    }
  };

  const handleToggleHeroMediaMode = async (newMode: 'video' | 'image') => {
    if (newMode === heroMediaMode || updatingMediaMode) return;
    setUpdatingMediaMode(true);
    setHeroMediaMode(newMode);
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          heroMediaMode: newMode,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setHeroMediaMode(heroMediaMode);
        alert('Failed to update Hero display mode.');
      }
    } catch {
      setHeroMediaMode(heroMediaMode);
      alert('Error updating Hero display mode.');
    } finally {
      setUpdatingMediaMode(false);
    }
  };

  const handleToggleSlideVisibility = async (slide: HeroSlideItem) => {
    const updatedStatus = slide.isVisible === false ? true : false;
    setHeroSlides((prev) =>
      prev.map((s) => (s.slideId === slide.slideId ? { ...s, isVisible: updatedStatus } : s))
    );
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...slide,
          isVisible: updatedStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setHeroSlides((prev) =>
          prev.map((s) => (s.slideId === slide.slideId ? { ...s, isVisible: slide.isVisible } : s))
        );
        alert('Failed to update slide visibility.');
      }
    } catch {
      setHeroSlides((prev) =>
        prev.map((s) => (s.slideId === slide.slideId ? { ...s, isVisible: slide.isVisible } : s))
      );
      alert('Error updating slide visibility.');
    }
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    setVideoUploadError('');

    try {
      const body = new FormData();
      body.append('file', file);
      body.append('resource_type', 'video');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setVideoSettings((prev) => ({ ...prev, videoUrl: data.url }));
      } else {
        setVideoUploadError(data.error || 'Failed to upload video');
      }
    } catch {
      setVideoUploadError('Network error uploading video file');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSaveVideoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          ...videoSettings,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsVideoModalOpen(false);
        fetchHeroSlides();
      } else {
        alert(data.error || 'Failed to save video settings');
      }
    } catch {
      alert('Error updating video settings');
    }
  };

  const handleResetOrDeleteVideo = async () => {
    if (!confirm('Are you sure you want to clear/delete this video?')) return;
    const cleared = { ...videoSettings, videoUrl: '' };
    setVideoSettings(cleared);
    try {
      await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          videoUrl: '',
        }),
      });
      fetchHeroSlides();
    } catch {
      alert('Error deleting video');
    }
  };

  const handleAddNewHero = () => {
    setEditingHeroSlide(null);
    setHeroFormData({
      slideId: `slide-${Date.now()}`,
      desktopImage: '/creative-bridal.jpg',
      mobileImage: '/mobile-bridal.jpg',
      subtitle: 'CRAFTED TO CELEBRATE',
      headingPrefix: 'SHAGNA DI',
      headingHighlight: 'Raat',
      tagline: 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
      subtagline: 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
      ctaText: 'Explore Bridal Rentals',
      ctaLink: '/category/bridal-lehengas',
      theme: 'warm',
      order: heroSlides.length + 1,
    });
    setIsHeroModalOpen(true);
  };

  const handleEditHero = (slide: HeroSlideItem) => {
    setEditingHeroSlide(slide);
    setHeroFormData({ ...slide });
    setIsHeroModalOpen(true);
  };

  const handleDeleteHeroSlide = async (id: string) => {
    if (!confirm('Are you sure you want to remove this hero banner slide?')) return;
    try {
      const res = await fetch(`/api/hero?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchHeroSlides();
      }
    } catch {
      alert('Error deleting slide');
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroImage(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (data.url) {
        if (type === 'desktop') {
          setHeroFormData((prev) => ({ ...prev, desktopImage: data.url }));
        } else {
          setHeroFormData((prev) => ({ ...prev, mobileImage: data.url }));
        }
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const handleSaveHeroSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHeroSlide) {
        const res = await fetch('/api/hero', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editingHeroSlide,
            ...heroFormData,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setIsHeroModalOpen(false);
          fetchHeroSlides();
        }
      } else {
        const res = await fetch('/api/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(heroFormData),
        });
        const data = await res.json();
        if (data.success) {
          setIsHeroModalOpen(false);
          fetchHeroSlides();
        }
      }
    } catch {
      alert('Failed to save Hero Banner');
    }
  };

  return {
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
  };
}
