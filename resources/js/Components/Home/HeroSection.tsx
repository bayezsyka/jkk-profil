import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section
            className="hero-section"
            style={{
                position: 'relative',
                height: '100vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Background Image with Fallback Gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/images/hero.webp), linear-gradient(135deg, #0B2B5A 0%, #0D3A7A 50%, #071F42 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#0B2B5A',
                }}
            />

            {/* Overlay Gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(11, 43, 90, 0.92) 0%, rgba(13, 58, 122, 0.88) 50%, rgba(5, 26, 58, 0.95) 100%)',
                }}
            />

            {/* Decorative Circles */}
            <div className="hero-bg-circle hero-bg-circle-1" />
            <div className="hero-bg-circle hero-bg-circle-2" />

            {/* Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 24px',
                    maxWidth: '900px',
                }}
            >
                <h1
                    className="hero-title"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '24px',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                    }}
                >
                    {t('hero.title')}
                </h1>

                <p
                    className="hero-subtitle"
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        color: 'rgba(255, 255, 255, 0.85)',
                        marginBottom: '48px',
                        lineHeight: 1.6,
                    }}
                >
                    {t('hero.subtitle')}
                </p>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <a
                        href="#about"
                        className="hero-btn-primary"
                        style={{
                            padding: '16px 32px',
                            backgroundColor: 'white',
                            color: '#0B2B5A',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {t('hero.cta.learn')}
                    </a>

                    <a
                        href="#contact"
                        className="hero-btn-secondary"
                        style={{
                            padding: '16px 32px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '16px',
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {t('hero.cta.contact')}
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="scroll-indicator"
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <div className="scroll-arrow">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="rgba(255,255,255,0.6)"
                        viewBox="0 0 24 24"
                        style={{ width: '24px', height: '24px' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
