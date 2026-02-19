import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { MultiImageUpload } from '@/Components/UI';

interface Photo {
    id: number;
    image_path: string;
    order: number;
}

export default function Index({ photos }: { photos: Photo[] }) {
    const [showUpload, setShowUpload] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        images: [] as File[],
    });

    const handleImagesChange = React.useCallback((files: File[]) => {
        setData('images', files);
    }, [setData]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.company-gallery.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setShowUpload(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus foto ini?')) {
            setDeletingId(id);
            router.delete(route('admin.company-gallery.destroy', id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Galeri Perusahaan" />

            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Galeri Perusahaan</h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Kelola foto-foto galeri perusahaan yang ditampilkan di halaman Tentang Kami
                            </p>
                        </div>
                        <button
                            onClick={() => setShowUpload(!showUpload)}
                            className={`flex items-center font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 ${
                                showUpload
                                    ? 'bg-slate-200 text-slate-600 shadow-slate-100 hover:bg-slate-300'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100'
                            }`}
                        >
                            {showUpload ? (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Batal
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah Foto
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Upload Form */}
                {showUpload && (
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 animate-in slide-in-from-top duration-300">
                        <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                            <MultiImageUpload
                                label="Upload Foto Galeri"
                                onChange={handleImagesChange}
                                error={errors.images}
                            />

                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    disabled={processing || data.images.length === 0}
                                    className={`flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-100 hover:-translate-y-0.5 ${
                                        processing || data.images.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mengupload...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Simpan Foto
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Gallery Grid */}
                {photos.length === 0 ? (
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-16 text-center">
                        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Belum ada foto</h3>
                        <p className="text-sm text-slate-500 mt-1">Klik tombol "Tambah Foto" untuk menambahkan foto ke galeri.</p>
                    </div>
                ) : (
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-800 font-bold">{photos.length}</span> foto dalam galeri
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <img
                                        src={`/storage/${photo.image_path}`}
                                        alt="Gallery"
                                        className="w-full h-full object-cover cursor-pointer"
                                        onClick={() => setLightboxPhoto(`/storage/${photo.image_path}`)}
                                    />

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                            <button
                                                onClick={() => setLightboxPhoto(`/storage/${photo.image_path}`)}
                                                className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors shadow-lg"
                                                title="Lihat foto"
                                            >
                                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(photo.id)}
                                                disabled={deletingId === photo.id}
                                                className="p-2 bg-red-500/90 backdrop-blur-sm rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                                                title="Hapus foto"
                                            >
                                                {deletingId === photo.id ? (
                                                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxPhoto && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setLightboxPhoto(null)}
                >
                    <button
                        onClick={() => setLightboxPhoto(null)}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={lightboxPhoto}
                        alt="Preview"
                        className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </AdminLayout>
    );
}
