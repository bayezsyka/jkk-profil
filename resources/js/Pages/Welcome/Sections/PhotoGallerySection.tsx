import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    const { t } = useLanguage();
    const [shuffledImages, setShuffledImages] = useState<GalleryImage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Shuffle array function
    const shuffleArray = useCallback((array: GalleryImage[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    // Initialize shuffled images
    useEffect(() => {
        if (images && images.length > 0) {
            setShuffledImages(shuffleArray(images));
        }
    }, [images, shuffleArray]);

    // Auto-play slideshow
    useEffect(() => {
        if (shuffledImages.length > 0 && !isPaused && !selectedImage) {
            intervalRef.current = setInterval(() => {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
                    setIsTransitioning(false);
                }, 500);
            }, 4000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [shuffledImages.length, isPaused, selectedImage]);

    const goToNext = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const goToPrev = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev - 1 + shuffledImages.length) % shuffledImages.length);
                setIsTransitioning(false);
            }, 300);
        }
    };

    if (!shuffledImages || shuffledImages.length === 0) {
        return null;
    }

    // Get visible images for the carousel (current + neighbors)
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
        <section className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase backdrop-blur-sm">
                        {t('gallery.title')}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {t('gallery.our_gallery')}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('gallery.description')}
                    </p>
                </div>

                {/* Main Carousel */}
                <div 
                    className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Images Container */}
                    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
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
                                        transform: `
                                            translateX(${offset * 280}px) 
                                            scale(${1 - absOffset * 0.15}) 
                                            rotateY(${offset * -15}deg)
                                        `,
                                        opacity: 1 - absOffset * 0.3,
                                        filter: isCenter ? 'none' : 'brightness(0.7)',
                                    }}
                                    onClick={() => isCenter && setSelectedImage(image)}
                                >
                                    <div className={`relative overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 ${
                                        isCenter ? 'shadow-primary/30 hover:shadow-primary/50' : ''
                                    }`}>
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={image.project_title}
                                            className="w-[280px] md:w-[400px] lg:w-[500px] h-[200px] md:h-[300px] lg:h-[380px] object-cover"
                                        />
                                        {isCenter && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6">
                                                <div className="text-center">
                                                    <p className="text-white font-semibold text-lg md:text-xl drop-shadow-lg">
                                                        {image.project_title}
                                                    </p>
                                                    <p className="text-white/70 text-sm mt-1">
                                                        {t('gallery.click_to_view')}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 md:left-8 z-40 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
                        aria-label="Previous image"
                    >
                        <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 md:right-8 z-40 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
                        aria-label="Next image"
                    >
                        <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {shuffledImages.slice(0, Math.min(10, shuffledImages.length)).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentIndex % Math.min(10, shuffledImages.length)
                                    ? 'bg-primary w-8'
                                    : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                    {shuffledImages.length > 10 && (
                        <span className="text-white/50 text-sm ml-2">
                            +{shuffledImages.length - 10} {t('gallery.more')}
                        </span>
                    )}
                </div>

                {/* Image Counter */}
                <div className="text-center mt-4">
                    <span className="text-white/50 text-sm">
                        {currentIndex + 1} / {shuffledImages.length}
                    </span>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div 
                        className="max-w-5xl max-h-[90vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={`/storage/${selectedImage.image_path}`}
                            alt={selectedImage.project_title}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                        <p className="text-white text-center mt-4 text-lg font-medium">
                            {selectedImage.project_title}
                        </p>
                    </div>
                </div>
            )}

            <style>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default PhotoGallerySection;
