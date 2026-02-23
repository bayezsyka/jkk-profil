import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

// Navigation Components
import { Navbar, Footer } from '@/Components/Navigation';

// Home Section Components
import { 
    HeroSection, 
    Services, 
    LatestProjectsSection, 
    PhotoGallerySection, 
    LatestArticlesSection 
} from './Sections';

// UI Components
import { SplashScreen, Toast } from '@/Components/UI';

interface ToastData {
    message: string;
    type: 'success' | 'info' | 'error';
}

interface ProjectImage {
    id: number;
    image_path: string;
}

interface Project {
    id: number;
    title: string;
    location: string;
    date: string;
    category: string;
    description?: string;
    images: ProjectImage[];
}

interface GalleryImage {
    id: number;
    image_path: string;
    project_title: string;
}

interface Category {
    id: number;
    name: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string | null;
    published_at: string;
    views: number;
    category: Category | null;
}

interface WelcomePageProps {
    latestProjects: Project[];
    galleryImages: GalleryImage[];
    latestArticles: Article[];
}

const WelcomeContent: React.FC<WelcomePageProps> = ({ 
    latestProjects, 
    galleryImages, 
    latestArticles 
}) => {
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
                {/* 1. Hero Section */}
                <HeroSection />
                
                {/* 2. 3 Proyek Terakhir */}
                <LatestProjectsSection projects={latestProjects} />
                
                {/* 3. Layanan Kami */}
                <Services/>
                
                {/* 4. Galeri Foto Slideshow Random */}
                <PhotoGallerySection images={galleryImages} />
                
                {/* 5. Artikel Terbaru */}
                <LatestArticlesSection articles={latestArticles} />
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
    const { t } = useLanguage();
    const props = usePage().props as unknown as { 
        latestProjects: Project[]; 
        galleryImages: GalleryImage[]; 
        latestArticles: Article[] 
    };
    const { latestProjects, galleryImages, latestArticles } = props;

    return (
        <>
            <Head>
                <title>JKK - PT. Jaya Karya Kontruksi</title>
                <meta name="description" content={t('hero.subtitle')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preload" as="image" href="/images/hero-kontruksi.jpeg" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="jkk-website">
                <WelcomeContent 
                    latestProjects={latestProjects || []}
                    galleryImages={galleryImages || []}
                    latestArticles={latestArticles || []}
                />
            </div>
        </>
    );
}


