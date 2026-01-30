import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const slides = [
        {
            image: '/images/hero.webp',
            titleKey: 'hero.slides.0.title',
            subtitleKey: 'hero.slides.0.subtitle',
        },
        {
            image: '/images/hero.webp',
            titleKey: 'hero.slides.1.title',
            subtitleKey: 'hero.slides.1.subtitle',
        },
        {
            image: '/images/hero.webp',
            titleKey: 'hero.slides.2.title',
            subtitleKey: 'hero.slides.2.subtitle',
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
    }, [isPaused, slides.length]); // Added slides.length dependency for safety

    return (
        <section
            className="hero-section"
            style={{
                position: 'relative',
                height: '100vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center', // Vertically center
                overflow: 'hidden',
                backgroundColor: '#526086', // Fallback color
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
                    {/* Image with subtle zoom effect */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 6s ease-out',
                        }}
                    />
                    
                    {/* Gradient Overlay - Subtle black gradient for text readability */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0) 80%)',
                        }}
                    />
                </div>
            ))}

            {/* Decorative Content - Left Side */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    maxWidth: '1280px', // Standard container max-width
                    margin: '0 auto',
                    padding: '0 24px',
                }}
            >
                <div style={{ maxWidth: '650px', textAlign: 'left' }}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            style={{
                                display: currentSlide === index ? 'block' : 'none',
                                animation: currentSlide === index ? 'fadeInLeft 0.8s ease-out forwards' : 'none',
                            }}
                        >
                            <h1
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 'clamp(2.5rem, 6vw, 4rem)', // Large and bold
                                    fontWeight: 800,
                                    color: 'white',
                                    marginBottom: '24px',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.1,
                                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                {t(slide.titleKey)}
                            </h1>

                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                    fontWeight: 500,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    marginBottom: '40px',
                                    lineHeight: 1.6,
                                    maxWidth: '540px',
                                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                {t(slide.subtitleKey)}
                            </p>


                        </div>
                    ))}
                </div>
            </div>

            {/* Controls - Bottom Left Pill */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: 'max(24px, calc((100vw - 1280px) / 2 + 24px))', // Align with container padding
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s',
                    }}
                    aria-label="Previous slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Pause/Play Button */}
                <button
                    onClick={togglePause}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s',
                    }}
                    aria-label={isPaused ? "Play" : "Pause"}
                >
                    {isPaused ? (
                        /* Play Icon */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                    ) : (
                        /* Pause Icon */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    )}
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s',
                    }}
                    aria-label="Next slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <style>
                {`
                    @keyframes fadeInLeft {
                        from {
                            opacity: 0;
                            transform: translateX(-30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default HeroSection;
