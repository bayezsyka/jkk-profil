import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Category {
    id: number;
    name: string;
}

interface Article {
    id: number;
    title: string;
    category_id: number;
    status: string;
    content: string;
    excerpt: string;
    thumbnail: string;
    published_at: string | null;
    seo_title: string | null;
    seo_keywords: string | null;
}

interface Props {
    article: Article;
    categories: Category[];
}

export default function Edit({ article, categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Spoof PUT for Inertia/Laravel file upload limitations
        title: article.title,
        category_id: article.category_id,
        status: article.status,
        content: article.content,
        excerpt: article.excerpt,
        thumbnail: null as File | null,
        published_at: article.published_at ? article.published_at.substring(0, 16) : '', // Format for datetime-local
        seo_title: article.seo_title || '',
        seo_keywords: article.seo_keywords || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use post but with _method: PUT because Inertia doesn't support file uploads with put/patch out of the box correctly without this workaround usually
        post(route('admin.articles.update', article.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Article" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Article</h2>
                    <Link
                        href={route('admin.articles.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Back to List
                    </Link>
                </div>

                <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', Number(e.target.value))}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                            {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                        </div>
                    </div>

                    {/* Published At */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Published At (Optional)</label>
                        <input
                            type="datetime-local"
                            value={data.published_at}
                            onChange={(e) => setData('published_at', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.published_at && <div className="text-red-500 text-sm mt-1">{errors.published_at}</div>}
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                        {article.thumbnail && (
                            <div className="mb-2">
                                <img src={article.thumbnail} alt="Current thumbnail" className="h-32 w-auto object-cover rounded" />
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={(e) => setData('thumbnail', e.target.files ? e.target.files[0] : null)}
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.thumbnail && <div className="text-red-500 text-sm mt-1">{errors.thumbnail}</div>}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Description)</label>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        {errors.excerpt && <div className="text-red-500 text-sm mt-1">{errors.excerpt}</div>}
                    </div>

                    {/* Content (React Quill) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <div className="h-64 mb-12">
                            <ReactQuill 
                                theme="snow" 
                                value={data.content} 
                                onChange={(content) => setData('content', content)}
                                style={{ height: '200px' }}
                            />
                        </div>
                        {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                    </div>

                    {/* SEO Section */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                                <input
                                    type="text"
                                    value={data.seo_title}
                                    onChange={(e) => setData('seo_title', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Leave blank to use article title"
                                />
                                {errors.seo_title && <div className="text-red-500 text-sm mt-1">{errors.seo_title}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
                                <input
                                    type="text"
                                    value={data.seo_keywords}
                                    onChange={(e) => setData('seo_keywords', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Comma separated keywords"
                                />
                                {errors.seo_keywords && <div className="text-red-500 text-sm mt-1">{errors.seo_keywords}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all ${
                                processing ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? 'Update Article' : 'Update Article'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
