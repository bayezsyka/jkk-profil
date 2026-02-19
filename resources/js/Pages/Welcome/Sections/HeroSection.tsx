import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const slides = [
        {
            image: '/images/hero-amp.webp',
            titleKey: 'hero.slides.2.title',
            position: 'bottom-right',
        },
        {
            image: '/images/hero-batchingplant.webp',
            titleKey: 'hero.slides.1.title',
            position: 'top-right',
        },
        {
            image: '/images/hero-kontruksi.jpeg',
            titleKey: 'hero.slides.0.title',
            position: 'center-right',
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsPaused(true);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsPaused(true);
    };

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    useEffect(() => {
        if (!isPaused) {
            timeoutRef.current = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
            }
        };
    }, [isPaused, slides.length]);

    return (
        <section
            className="hero-section"
            style={{
                position: 'relative',
                height: '100vh',
                minHeight: '600px',
                display: 'flex',
                overflow: 'hidden',
                backgroundColor: '#526086',
            }}
        >
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: currentSlide === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        zIndex: 0,
                    }}
                >
                    <img 
                        src={slide.image}
                        alt={t(slide.titleKey)} 
                        width="1920"
                        height="1080"
                        className="absolute inset-0 -z-10 w-full h-full object-cover"
                        // @ts-ignore
                        fetchpriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="sync"
                    />
                    
                    {/* Gradient Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0) 80%)',
                        }}
                    />
                </div>
            ))}

            {/* Content Container */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    height: '100%',
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '0 24px',
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: currentSlide === index ? 'flex' : 'none',
                            justifyContent: 'flex-end',
                            alignItems: 
                                slide.position === 'top-right' ? 'flex-start' : 
                                slide.position === 'bottom-right' ? 'flex-end' : 'center',
                            padding: 
                                slide.position === 'top-right' ? '120px 24px 0 0' : 
                                slide.position === 'bottom-right' ? '0 24px 150px 0' : '0 24px 0 0',
                            textAlign: 'right',
                            animation: currentSlide === index ? 'fadeInRight 1s ease-out forwards' : 'none',
                        }}
                    >
                        <div style={{ maxWidth: '500px' }}>
                            <h1
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                                    fontWeight: 700,
                                    color: 'white',
                                    margin: 0,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    lineHeight: 1.2,
                                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                {t(slide.titleKey)}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    right: 'max(24px, calc((100vw - 1280px) / 2 + 24px))',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <button
                    onClick={prevSlide}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', display: 'flex', opacity: 0.7 }}
                    aria-label="Previous slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    onClick={togglePause}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', display: 'flex', opacity: 0.7 }}
                    aria-label={isPaused ? "Play" : "Pause"}
                >
                    {isPaused ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                    )}
                </button>

                <button
                    onClick={nextSlide}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', display: 'flex', opacity: 0.7 }}
                    aria-label="Next slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <style>
                {`
                    @keyframes fadeInRight {
                        from { opacity: 0; transform: translateX(20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                `}
            </style>
        </section>
    );
};

export default HeroSection;
