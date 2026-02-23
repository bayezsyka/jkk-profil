import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

interface GalleryImage {
    id: number;
    image_path: string;
    project_title: string;
}

interface PhotoGallerySectionProps {
    images: GalleryImage[];
}

const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ images }) => {
    const { t, locale } = useLanguage();
    const [shuffledImages, setShuffledImages] = useState<GalleryImage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const shuffleArray = useCallback((array: GalleryImage[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    useEffect(() => {
        if (images && images.length > 0) {
            setShuffledImages(shuffleArray(images));
        }
    }, [images, shuffleArray]);

    useEffect(() => {
        if (shuffledImages.length > 0 && !isPaused && !selectedImage) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
            }, 4000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [shuffledImages.length, isPaused, selectedImage]);

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + shuffledImages.length) % shuffledImages.length);

    if (!shuffledImages || shuffledImages.length === 0) return null;

    const getVisibleImages = () => {
        const result = [];
        const len = shuffledImages.length;
        for (let i = -2; i <= 2; i++) {
            const idx = (currentIndex + i + len) % len;
            result.push({ image: shuffledImages[idx], offset: i });
        }
        return result;
    };

    return (
        <section className="py-10 md:py-24 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-12">
                    <div>
                        <p className="text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5">
                            {t('gallery.title')}
                        </p>
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                            {t('gallery.our_gallery')}
                        </h2>
                        <p className="text-slate-400 mt-1 md:mt-2 max-w-xl text-xs md:text-base hidden md:block">
                            {t('gallery.description')}
                        </p>
                    </div>
                    <Link
                        href={`/${locale}/galeri`}
                        className="mt-2 md:mt-0 inline-flex items-center text-blue-400 font-semibold text-xs md:text-sm hover:underline group"
                    >
                        {t('common.viewAll')} {t('gallery.title')}
                        <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Carousel */}
            <div
                className="relative h-[200px] sm:h-[320px] md:h-[440px] lg:h-[480px] flex items-center justify-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
                    {getVisibleImages().map(({ image, offset }) => {
                        const isCenter = offset === 0;
                        const absOffset = Math.abs(offset);

                        return (
                            <div
                                key={`${image.id}-${offset}`}
                                className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                                    isCenter ? 'z-30' : offset === -1 || offset === 1 ? 'z-20' : 'z-10'
                                }`}
                                style={{
                                    transform: `translateX(${offset * (isMobile ? 140 : 220)}px) scale(${1 - absOffset * 0.15}) rotateY(${offset * -10}deg)`,
                                    opacity: 1 - absOffset * 0.35,
                                    filter: isCenter ? 'none' : 'brightness(0.5)',
                                }}
                                onClick={() => isCenter && setSelectedImage(image)}
                            >
                                <div className={`relative overflow-hidden rounded-lg shadow-xl ${
                                    isCenter ? 'ring-1 ring-white/20' : ''
                                }`}>
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={image.project_title}
                                        className="w-[180px] sm:w-[280px] md:w-[380px] lg:w-[460px] h-[130px] sm:h-[210px] md:h-[285px] lg:h-[320px] object-cover"
                                    />
                                    {isCenter && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3 md:p-4">
                                            <p className="text-white font-medium text-xs md:text-sm drop-shadow line-clamp-1">
                                                {image.project_title}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Nav Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute left-2 md:left-8 z-40 p-2 md:p-2.5 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors"
                    aria-label="Previous"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-2 md:right-8 z-40 p-2 md:p-2.5 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors"
                    aria-label="Next"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-50"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`/storage/${selectedImage.image_path}`}
                            alt={selectedImage.project_title}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        />
                        <p className="text-white text-center mt-3 text-sm font-medium">
                            {selectedImage.project_title}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PhotoGallerySection;
