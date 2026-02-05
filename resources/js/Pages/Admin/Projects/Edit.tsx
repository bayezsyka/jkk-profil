import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import React from 'react';
import { MultiImageUpload } from '@/Components/UI';

interface ProjectImage {
    id: number;
    image_path: string;
}

interface Project {
    id: number;
    title: string;
    location: string;
    date: string;
    category: string;
    subcategory: string | null;
    description: string | null;
    images: ProjectImage[];
}

interface Props {
    project: Project;
}

export default function Edit({ project }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Laravel spoofing for PUT with files
        title: project.title,
        location: project.location,
        date: project.date.split('T')[0],
        category: project.category,
        subcategory: project.subcategory || '',
        description: project.description || '',
        images: [] as File[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.update', project.id), {
            forceFormData: true,
        });
    };

    const handleDeleteImage = (imageId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
            router.delete(route('admin.project-images.destroy', imageId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Edit Proyek" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Edit Proyek</h2>
                        <p className="text-slate-500 text-sm mt-1">{project.title}</p>
                    </div>
                    <Link
                        href={route('admin.projects.index')}
                        className="flex items-center text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </Link>
                </div>

                <form onSubmit={submit} encType="multipart/form-data" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Proyek</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                required
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1 font-medium">{errors.title}</div>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                required
                            />
                            {errors.location && <div className="text-red-500 text-xs mt-1 font-medium">{errors.location}</div>}
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Proyek</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                required
                            />
                            {errors.date && <div className="text-red-500 text-xs mt-1 font-medium">{errors.date}</div>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Utama</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-white"
                            >
                                <option value="construction">Construction</option>
                                <option value="batching_plant">Batching Plant</option>
                                <option value="asphalt_mixing_plant">Asphalt Mixing Plant</option>
                            </select>
                            {errors.category && <div className="text-red-500 text-xs mt-1 font-medium">{errors.category}</div>}
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Sub-Layanan (Opsional)</label>
                            <input
                                type="text"
                                value={data.subcategory}
                                onChange={(e) => setData('subcategory', e.target.value)}
                                className="w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                            />
                            {errors.subcategory && <div className="text-red-500 text-xs mt-1 font-medium">{errors.subcategory}</div>}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4"
                            />
                            {errors.description && <div className="text-red-500 text-xs mt-1 font-medium">{errors.description}</div>}
                        </div>

                        {/* Existing Images */}
                        {project.images && project.images.length > 0 && (
                             <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-4">Galeri Foto Saat Ini</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {project.images.map((img) => (
                                        <div key={img.id} className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                                            <img
                                                src={`/storage/${img.image_path}`}
                                                alt="Project"
                                                className="w-full h-32 object-cover transition-transform group-hover:scale-110"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(img.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-xl p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg"
                                                title="Hapus Gambar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add New Images */}
                        <div className="md:col-span-2">
                             <MultiImageUpload
                                label="Tambah Foto Baru"
                                onChange={(files) => setData('images', files)}
                                error={errors.images}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                         <button
                            type="submit"
                            disabled={processing}
                            className={`flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-100 hover:-translate-y-0.5 ${
                                processing ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : 'Perbarui Proyek'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
