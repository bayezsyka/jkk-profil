import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #526086 0%, #667BA3 50%, #4A5678 100%)',
                transition: 'opacity 0.5s ease-out',
                opacity: fadeOut ? 0 : 1,
            }}
        >
            {/* Background decorations */}
            <div className="splash-bg-circle splash-bg-circle-1" />
            <div className="splash-bg-circle splash-bg-circle-2" />
            <div className="splash-bg-circle splash-bg-circle-3" />
            
            {/* Logo Circle */}
            <div className="splash-logo-container">
                <div className="splash-logo-circle">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo" 
                        className="splash-logo-img"
                        style={{ width: '80%', height: 'auto' }}
                    />
                </div>
            </div>
            
            {/* Company Name */}
            <h1 className="splash-company-name">
                Jaya Karya Kontruksi
            </h1>
            
            {/* Tagline */}
            <p className="splash-tagline">
                {t('splash.tagline')}
            </p>
            
            {/* Loading dots */}
            <div className="splash-loading-dots">
                <span className="splash-dot"></span>
                <span className="splash-dot"></span>
                <span className="splash-dot"></span>
            </div>
        </div>
    );
};

export default SplashScreen;
