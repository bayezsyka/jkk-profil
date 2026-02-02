import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

// Navigation Components
import { Navbar, Footer } from '@/Components/Navigation';

// Home Section Components
import { HeroSection, Services} from './Sections';

// UI Components
import { SplashScreen, Toast } from '@/Components/UI';

interface ToastData {
    message: string;
    type: 'success' | 'info' | 'error';
}

const WelcomeContent: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [toast, setToast] = useState<ToastData | null>(null);

    useEffect(() => {
        // Check if showSplash was already shown this session
        const splashShown = sessionStorage.getItem('splashShown');
        if (splashShown) {
            setShowSplash(false);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // setTopBarVisible(scrollY < 50); // Removed as we handle it via Navbar positioning
            setIsScrolled(scrollY > 44); // Threshold matching TopBar height
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
    };

    const showToast = (message: string, type: 'success' | 'info' | 'error') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }

    return (
        <>
            {/* TopBar is now integrated into Navbar */}
            
            {/* Navbar handles fixed positioning and transparency internally */}
            <Navbar 
                onShowToast={showToast}
            />
            
            <main>
                <HeroSection />
                <Services/>
                {/* <AboutSection /> */}
                {/* StatsSection removed as it does not exist */}
            </main>
            
            <Footer />
            
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </>
    );
};

export default function Welcome() {
    return (
        <>
            <Head>
                <title>JKK - Jaya Karya Kontruksi</title>
                <meta name="description" content="Website Resmi JKK - Jaya Karya Kontruksi. Membangun Masa Depan Indonesia dengan konstruksi berkualitas tinggi." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preload" as="image" href="/images/hero.webp" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="jkk-website">
                <WelcomeContent />
            </div>
        </>
    );
}

