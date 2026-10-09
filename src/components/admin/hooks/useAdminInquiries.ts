import { useState } from 'react';
import { BookingLead, AnalyticsSettings } from '../types';

export function useAdminInquiries(setIsAuthenticated: (val: boolean) => void) {
  const [bookings, setBookings] = useState<BookingLead[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus as BookingLead['status'] } : b))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return {
    bookings,
    loadingBookings,
    fetchBookings,
    handleUpdateBookingStatus,
  };
}

export function useAdminSeoAnalytics() {
  const [analyticsSettings, setAnalyticsSettings] = useState<AnalyticsSettings>({
    googleSearchConsoleToken: '',
    googleAnalyticsId: '',
    metaPixelId: '',
    customSchemaJson: '',
    pageSeoList: [],
  });
  const [isSavingAnalytics, setIsSavingAnalytics] = useState(false);
  const [analyticsSaveMessage, setAnalyticsSaveMessage] = useState('');

  const syncAnalyticsFromApi = (data: any) => {
    if (!data) return;
    setAnalyticsSettings({
      googleSearchConsoleToken: data.googleSearchConsoleToken || '',
      googleAnalyticsId: data.googleAnalyticsId || '',
      metaPixelId: data.metaPixelId || '',
      customSchemaJson: data.customSchemaJson || '',
      pageSeoList: data.pageSeoList || [],
    });
  };

  const handleSaveAnalyticsSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAnalytics(true);
    setAnalyticsSaveMessage('');
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          googleSearchConsoleToken: analyticsSettings.googleSearchConsoleToken,
          googleAnalyticsId: analyticsSettings.googleAnalyticsId,
          metaPixelId: analyticsSettings.metaPixelId,
          customSchemaJson: analyticsSettings.customSchemaJson,
          pageSeoList: analyticsSettings.pageSeoList,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAnalyticsSaveMessage('Settings & Per-Page SEO updated successfully!');
        setTimeout(() => setAnalyticsSaveMessage(''), 5000);
      } else {
        alert(data.error || 'Failed to update tracking settings');
      }
    } catch {
      alert('Network error updating tracking settings');
    } finally {
      setIsSavingAnalytics(false);
    }
  };

  return {
    analyticsSettings,
    setAnalyticsSettings,
    isSavingAnalytics,
    analyticsSaveMessage,
    syncAnalyticsFromApi,
    handleSaveAnalyticsSettings,
  };
}
