import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        location: '',
        date: '',
        category: 'construction',
        subcategory: '',
        description: '',
        images: [] as File[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.store'), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('images', Array.from(e.target.files));
        }
    };

    return (
        <AdminLayout>
            <Head title="Tambah Proyek" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Tambah Proyek Baru</h2>
                    <Link
                        href={route('admin.projects.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Kembali ke Daftar
                    </Link>
                </div>

                <form onSubmit={submit} encType="multipart/form-data">
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                            <ul className="list-disc list-inside text-red-600 text-sm">
                                {Object.entries(errors).map(([field, message]) => (
                                    <li key={field}>
                                        <span className="capitalize font-semibold">{field.replace('_', ' ')}:</span> {message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="construction">Construction</option>
                                <option value="batching_plant">Batching Plant</option>
                                <option value="asphalt_mixing_plant">Asphalt Mixing Plant</option>
                            </select>
                            {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory (Optional)</label>
                            <input
                                type="text"
                                value={data.subcategory}
                                onChange={(e) => setData('subcategory', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g. Bridge, Drainage"
                            />
                            {errors.subcategory && <div className="text-red-500 text-sm mt-1">{errors.subcategory}</div>}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                        </div>

                        {/* Images */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Images</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                accept="image/*"
                                className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
                            
                            {/* Simple Preview List */}
                            {data.images.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-500">
                                        {Array.from(data.images).map((file, idx) => (
                                            <li key={idx}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all ${
                                processing ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? 'Saving...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
