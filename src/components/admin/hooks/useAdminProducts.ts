import { useState } from 'react';
import { OutfitItem } from '../types';

export function useAdminProducts(setIsAuthenticated: (val: boolean) => void) {
  const [products, setProducts] = useState<OutfitItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal / Form state for Add or Edit Outfit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<OutfitItem | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');

  // Form Fields
  const [formData, setFormData] = useState<Partial<OutfitItem>>({
    title: '',
    subtitle: '',
    category: 'Bridal Lehengas',
    categorySlug: 'bridal-lehengas',
    price: '₹7,999',
    originalValue: '₹95,000',
    deposit: '₹10,000',
    duration: '3 Days',
    images: ['/products/lehenga-maroon.png'],
    description: '',
    fabric: 'Pure Velvet & Silk',
    work: 'Zardozi & Tilla Hand Embroidery',
    color: 'Royal Crimson Maroon',
    occasion: 'Wedding Day, Anand Karaj, Phere',
    status: 'available',
  });

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      subtitle: 'Signature Bridal Couture',
      category: 'Bridal Lehengas',
      categorySlug: 'bridal-lehengas',
      price: '₹8,999',
      originalValue: '₹95,000',
      deposit: '₹10,000',
      duration: '3 Days',
      images: ['/products/lehenga-maroon.png'],
      description: '',
      fabric: 'Pure Velvet',
      work: 'Handcrafted Zardozi',
      color: 'Crimson Maroon',
      occasion: 'Wedding Day / Phere',
      sizes: ['Custom Sizing Available (XS - 3XL)'],
      includes: ['Heavy Designer Lehenga', 'Matching Blouse with Latkans', 'Bridal Dupatta', 'Garment Bag'],
      status: 'available',
    });
    setImageError('');
    setIsModalOpen(true);
  };

  const handleEdit = (product: OutfitItem) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setImageError('');
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
      } else {
        alert('Failed to delete outfit.');
      }
    } catch {
      alert('Error connecting to server.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setImageError('');

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const body = new FormData();
        body.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          uploadedUrls.push(data.url);
        } else {
          setImageError(data.error || 'Failed to upload one or more images.');
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []).filter(Boolean), ...uploadedUrls],
        }));
      }
    } catch {
      setImageError('Network error during upload.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Title and Price are required!');
      return;
    }

    try {
      if (editingProduct) {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editingProduct,
            ...formData,
          }),
        });

        const data = await res.json();
        if (res.ok && data.product) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data.product : p)));
          setIsModalOpen(false);
        } else {
          alert(data.error || 'Failed to update outfit.');
        }
      } else {
        const newId = `outfit-${Date.now()}`;
        const newSlug = formData
          .title!.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        const payload = {
          ...formData,
          id: newId,
          slug: newSlug,
        };

        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.product) {
          setProducts((prev) => [data.product, ...prev]);
          setIsModalOpen(false);
        } else {
          alert(data.error || 'Failed to add outfit.');
        }
      }
    } catch {
      alert('Error saving outfit.');
    }
  };

  const handleUpdateProductReviews = async (productId: string, updatedReviews: any[]) => {
    const target = products.find((p) => p._id === productId || p.id === productId);
    if (!target) return;

    const res = await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...target,
        reviews: updatedReviews,
      }),
    });

    const data = await res.json();
    if (res.ok && data.product) {
      setProducts((prev) =>
        prev.map((p) => (p._id === productId || p.id === productId ? data.product : p))
      );
    } else {
      throw new Error(data.error || 'Failed to update reviews');
    }
  };

  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.fabric && p.fabric.toLowerCase().includes(query)) ||
      (p.color && p.color.toLowerCase().includes(query)) ||
      (p.occasion && p.occasion.toLowerCase().includes(query));

    const matchesCat =
      selectedCategory === 'all' ||
      p.categorySlug === selectedCategory ||
      p.category === selectedCategory ||
      (p.occasion && p.occasion.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCat;
  });

  return {
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
  };
}
