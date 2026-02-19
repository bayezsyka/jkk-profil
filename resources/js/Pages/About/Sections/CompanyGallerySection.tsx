import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface GalleryPhoto {
    id: number;
    image_path: string;
}

const CompanyGallerySection: React.FC<{ id: string; data?: GalleryPhoto[] }> = ({ id, data: photos }) => {
    const { t } = useLanguage();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (!photos || photos.length === 0) return null;

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % photos.length);
        }
    };

    const goPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
        }
    };

    return (
        <section id={id} className="scroll-mt-32">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">
                        {t('about.company_gallery.title')}
                    </h2>
                    <div className="w-20 h-1 bg-[#1e3a5f] mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Photo Grid - Masonry-like */}
                <div className="columns-1 sm:columns-2 gap-6 space-y-6">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            className="break-inside-avoid group cursor-pointer"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                <img
                                    src={`/storage/${photo.image_path}`}
                                    alt=""
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/20 transition-all duration-500 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl">
                                            <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors z-10"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white/80 text-sm font-bold">
                        {lightboxIndex + 1} / {photos.length}
                    </div>

                    {/* Previous */}
                    {photos.length > 1 && (
                        <button
                            onClick={goPrev}
                            className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors z-10"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Image */}
                    <img
                        src={`/storage/${photos[lightboxIndex].image_path}`}
                        alt=""
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Next */}
                    {photos.length > 1 && (
                        <button
                            onClick={goNext}
                            className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors z-10"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default CompanyGallerySection;
