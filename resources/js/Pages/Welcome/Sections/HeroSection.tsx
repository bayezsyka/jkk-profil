import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const slides = [
        {
            image: '/images/hero-kontruksi.jpeg',
            titleKey: 'hero.slides.0.title',
        },
        {
            image: '/images/hero-batchingplant.webp',
            titleKey: 'hero.slides.1.title',
        },
        {
            image: '/images/hero-amp.webp',
            titleKey: 'hero.slides.2.title',
        },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(nextSlide, 6000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, nextSlide]);

    return (
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-slate-900">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={t(slide.titleKey)}
                        className="absolute inset-0 w-full h-full object-cover"
                        // @ts-ignore
                        fetchpriority={index === 0 ? 'high' : 'auto'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                </div>
            ))}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30" />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end">
                {/* Slide Title */}
                <div className="relative min-h-[120px] md:min-h-[160px]">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-x-0 bottom-0 transition-all duration-700 ease-out ${
                                currentSlide === index
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4 pointer-events-none'
                            }`}
                        >
                            <div className="max-w-3xl">
                                {/* Accent bar */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-10 md:w-14 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
                                    <div className="w-3 h-1 bg-blue-400/40 rounded-full" />
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-xl">
                                    {t(slide.titleKey)}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slide Indicators & Controls */}
                <div className="flex items-center justify-between pb-8 md:pb-10 mt-10">
                    <div className="flex items-center gap-4">
                        {/* Progress dots */}
                        <div className="flex items-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1 rounded-full transition-all duration-500 ${
                                        currentSlide === index
                                            ? 'w-10 bg-white'
                                            : 'w-4 bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1 ml-2">
                            <button
                                onClick={prevSlide}
                                className="p-2 text-white/60 hover:text-white transition-colors"
                                aria-label="Previous slide"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setIsPaused((p) => !p)}
                                className="p-2 text-white/60 hover:text-white transition-colors"
                                aria-label={isPaused ? 'Play' : 'Pause'}
                            >
                                {isPaused ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                                )}
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-2 text-white/60 hover:text-white transition-colors"
                                aria-label="Next slide"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="hidden md:flex flex-col items-center gap-2 text-white/30">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
                            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
