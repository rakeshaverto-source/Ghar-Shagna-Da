'use client';

import React, { useState } from 'react';
import { AnalyticsSettings, PageSeoItem, OutfitItem } from './types';
import { Save, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';
import PageSeoSelector from './page-seo/PageSeoSelector';
import PageSeoForm from './page-seo/PageSeoForm';

interface PageSeoTabProps {
  analyticsSettings: AnalyticsSettings;
  setAnalyticsSettings: React.Dispatch<React.SetStateAction<AnalyticsSettings>>;
  handleSaveAnalyticsSettings: (e: React.FormEvent) => Promise<void>;
  isSaving: boolean;
  saveMessage?: string;
  products?: OutfitItem[];
}

const PRESET_PAGES = [
  { path: '/', label: 'Home Page (/)' },
  { path: '/catalog', label: 'Outfits Catalog (/catalog)' },
  { path: '/how-rental-works', label: 'How Rental Works (/how-rental-works)' },
  { path: '/contact', label: 'Contact Us (/contact)' },
  { path: '/category/bridal-lehengas', label: 'Bridal Lehengas (/category/bridal-lehengas)' },
  { path: '/category/sherwanis', label: 'Sherwanis (/category/sherwanis)' },
  { path: '/category/wedding-dresses', label: 'Wedding Dresses (/category/wedding-dresses)' },
  { path: '/category/festive-shararas', label: 'Festive Shararas (/category/festive-shararas)' },
  { path: '/category/designer-sarees', label: 'Designer Sarees (/category/designer-sarees)' },
  { path: '/category/anarkali-suits', label: 'Anarkali Suits (/category/anarkali-suits)' },
];

export default function PageSeoTab({
  analyticsSettings,
  setAnalyticsSettings,
  handleSaveAnalyticsSettings,
  isSaving,
  saveMessage,
  products = [],
}: PageSeoTabProps) {
  const [selectedPagePath, setSelectedPagePath] = useState<string>('/');
  const [productSearch, setProductSearch] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [productPage, setProductPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Current page SEO list
  const pageList = analyticsSettings.pageSeoList || [];

  // Helper to get or default item for current path
  const currentPageSeo: PageSeoItem = pageList.find(
    (p) => (p.pagePath.replace(/\/$/, '') || '/') === (selectedPagePath.replace(/\/$/, '') || '/')
  ) || {
    pagePath: selectedPagePath,
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonical: '',
    noIndex: false,
  };

  // Find page or product label
  const presetMatch = PRESET_PAGES.find((p) => p.path === selectedPagePath);
  const matchedProduct = products.find(
    (p) => `/product/${p.slug}` === selectedPagePath || p.slug === selectedPagePath.replace('/product/', '')
  );

  let selectedLabel = `Custom Page (${selectedPagePath})`;
  if (presetMatch) {
    selectedLabel = presetMatch.label;
  } else if (matchedProduct) {
    selectedLabel = `Outfit: ${matchedProduct.title} (/product/${matchedProduct.slug})`;
  }

  // Update current page field in pageSeoList
  const handleUpdatePageField = (field: keyof PageSeoItem, value: any) => {
    setAnalyticsSettings((prev) => {
      const currentList = prev.pageSeoList ? [...prev.pageSeoList] : [];
      const normalizedPath = selectedPagePath.replace(/\/$/, '') || '/';
      const existingIdx = currentList.findIndex(
        (p) => (p.pagePath.replace(/\/$/, '') || '/') === normalizedPath
      );

      if (existingIdx >= 0) {
        currentList[existingIdx] = {
          ...currentList[existingIdx],
          [field]: value,
        };
      } else {
        currentList.push({
          pagePath: normalizedPath,
          title: '',
          description: '',
          keywords: '',
          ogImage: '',
          canonical: '',
          noIndex: false,
          [field]: value,
        });
      }

      return {
        ...prev,
        pageSeoList: currentList,
      };
    });
  };

  // Add custom path
  const handleAddCustomPath = () => {
    const custom = prompt('Enter page path (e.g. /product/my-lehenga or /offers):');
    if (!custom) return;
    const cleanPath = (custom.startsWith('/') ? custom : `/${custom}`).trim();
    setSelectedPagePath(cleanPath);

    setAnalyticsSettings((prev) => {
      const currentList = prev.pageSeoList ? [...prev.pageSeoList] : [];
      if (!currentList.some((p) => p.pagePath === cleanPath)) {
        currentList.push({
          pagePath: cleanPath,
          title: '',
          description: '',
          keywords: '',
          ogImage: '',
          canonical: '',
          noIndex: false,
        });
      }
      return { ...prev, pageSeoList: currentList };
    });
  };

  // Reset/Remove custom SEO for current page
  const handleRemovePageSeo = () => {
    if (!confirm(`Reset custom SEO for ${selectedPagePath}? Default SEO will be used.`)) return;
    setAnalyticsSettings((prev) => ({
      ...prev,
      pageSeoList: (prev.pageSeoList || []).filter(
        (p) => (p.pagePath.replace(/\/$/, '') || '/') !== (selectedPagePath.replace(/\/$/, '') || '/')
      ),
    }));
  };

  // Live preview computations
  const currentTitle =
    currentPageSeo.title ||
    (matchedProduct
      ? `${matchedProduct.title} on Rent (${matchedProduct.price}) | ${SITE_CONFIG.name}`
      : selectedPagePath === '/'
      ? `${SITE_CONFIG.name} | Luxury Bridal Lehengas & Sherwanis on Rent`
      : `${SITE_CONFIG.name} Rentals`);

  const currentDesc =
    currentPageSeo.description ||
    (matchedProduct
      ? matchedProduct.description?.slice(0, 160) ||
        `Rent handcrafted ${matchedProduct.title}. Luxury wedding outfits on rent with custom alterations in Punjab.`
      : 'Rent handcrafted designer bridal lehengas, royal groom sherwanis, and wedding outfits with custom alterations in Punjab.');

  const displayCanonical =
    currentPageSeo.canonical ||
    `${SITE_CONFIG.domain}${selectedPagePath === '/' ? '' : selectedPagePath}`;

  const cleanDisplayUrl = displayCanonical
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');

  const titleLen = currentPageSeo.title?.length || 0;
  const descLen = currentPageSeo.description?.length || 0;

  // Filter and paginate products
  const allCategories = ['all', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      productSearch.trim() === '' ||
      prod.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.slug.toLowerCase().includes(productSearch.toLowerCase()) ||
      (prod.category && prod.category.toLowerCase().includes(productSearch.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === 'all' || prod.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentPageSafe = Math.min(productPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPageSafe - 1) * itemsPerPage,
    currentPageSafe * itemsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* 🧭 SELECT PAGE OR PRODUCT TO EDIT SEO */}
      <PageSeoSelector
        selectedPagePath={selectedPagePath}
        setSelectedPagePath={setSelectedPagePath}
        presetPages={PRESET_PAGES}
        products={products}
        pageList={pageList}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        productPage={productPage}
        setProductPage={setProductPage}
        filteredProducts={filteredProducts}
        paginatedProducts={paginatedProducts}
        totalPages={totalPages}
        currentPageSafe={currentPageSafe}
        allCategories={allCategories}
        onAddCustomPath={handleAddCustomPath}
      />

      {/* Success notification banner */}
      {saveMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-900 text-sm font-medium shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* 🚀 SEO CONFIGURATION & PREVIEW FORM */}
      <form onSubmit={handleSaveAnalyticsSettings} className="space-y-5">
        <PageSeoForm
          selectedLabel={selectedLabel}
          selectedPagePath={selectedPagePath}
          currentPageSeo={currentPageSeo}
          currentTitle={currentTitle}
          currentDesc={currentDesc}
          displayCanonical={displayCanonical}
          cleanDisplayUrl={cleanDisplayUrl}
          titleLen={titleLen}
          descLen={descLen}
          onUpdateField={handleUpdatePageField}
          onRemovePageSeo={handleRemovePageSeo}
        />

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="text-xs text-stone-500 flex items-center gap-2">
            <span>Changes will be saved to <code className="bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded text-[#8b1828] font-bold font-mono text-[11px]">MongoDB Atlas</code> and indexed by Googlebot.</span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8b1828] hover:bg-[#721320] disabled:bg-stone-300 text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-[#8b1828]/20 active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4 text-white" />
            <span>
              {isSaving
                ? 'Saving...'
                : `Save SEO for ${selectedLabel.split(' (')[0]}`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
