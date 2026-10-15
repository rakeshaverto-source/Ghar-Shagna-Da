'use client';

import React, { useState } from 'react';
import { BlogPostItem } from '@/components/admin/types';
import { FileText, Plus, Search, Edit, Trash2, ExternalLink, Eye, EyeOff, Star, Clock, BookOpen } from 'lucide-react';
import BlogModal from '@/components/admin/BlogModal';

interface BlogsTabProps {
  blogs: BlogPostItem[];
  loadingBlogs: boolean;
  onRefresh: () => void;
  setIsAuthenticated: (val: boolean) => void;
}

export default function BlogsTab({
  blogs,
  loadingBlogs,
  onRefresh,
  setIsAuthenticated,
}: BlogsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = Array.from(new Set(blogs.map((b) => b.category || 'General'))).filter(Boolean);

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'all' || b.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogPostItem) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the blog post: "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        onRefresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete blog');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting blog');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublished = async (blog: BlogPostItem) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blog.id || blog._id,
          isPublished: !blog.isPublished,
        }),
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (blog: BlogPostItem) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blog.id || blog._id,
          isFeatured: !blog.isFeatured,
        }),
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8b1828]" />
            Wedding Stories & Bridal Articles ({blogs.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage bridal styling guides, groom wear advice, and wedding tips for SEO and organic traffic.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8b1828] hover:bg-[#70121f] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, excerpt or tag..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 focus:border-[#8b1828]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Grid / List */}
      {loadingBlogs ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
          <div className="animate-spin w-8 h-8 border-3 border-[#8b1828] border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-xs text-stone-500">Loading wedding blog articles...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-6">
          <FileText className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-stone-800">No blog articles found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
            {searchQuery
              ? 'No articles match your search query or filter.'
              : 'Create your first wedding styling or lehenga rental guide to boost your Google rank!'}
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-[#8b1828] text-white px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Article</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id || blog._id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-video bg-stone-100 overflow-hidden group">
                <img
                  src={blog.coverImage || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {blog.category || 'General'}
                  </span>
                  {blog.isFeatured && (
                    <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-stone-900" /> Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublished(blog)}
                    title={blog.isPublished ? 'Published (Click to hide)' : 'Draft (Click to publish)'}
                    className={`p-1.5 rounded-full shadow-sm text-xs backdrop-blur-md transition-colors ${blog.isPublished
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-900'
                      }`}
                  >
                    {blog.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blog.readTime || '3 min read'}
                    </span>
                    <span>•</span>
                    <span>{blog.author || 'Ghar Shagna Da'}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm line-clamp-2 mb-2 leading-snug hover:text-[#8b1828] transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed mb-4">
                    {blog.excerpt || blog.content.substring(0, 120)}...
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {blog.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 text-stone-600 text-[10px] px-2 py-0.5 rounded-md font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-[#8b1828] transition-colors"
                  >
                    <span>View Public</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFeatured(blog)}
                      title="Toggle Featured on Homepage"
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${blog.isFeatured
                          ? 'border-amber-300 bg-amber-50 text-amber-700'
                          : 'border-stone-200 text-stone-400 hover:text-stone-700'
                        }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${blog.isFeatured ? 'fill-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleOpenEdit(blog)}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                      title="Edit Article"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id || blog._id!, blog.title)}
                      disabled={deletingId === (blog.id || blog._id)}
                      className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <BlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          blog={editingBlog}
          onSuccess={() => {
            setIsModalOpen(false);
            onRefresh();
          }}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </div>
  );
}
