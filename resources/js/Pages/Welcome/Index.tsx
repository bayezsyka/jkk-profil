import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';
import { PageProps } from '@/types';

// Navigation Components
import { Navbar, Footer } from '@/Components/Navigation';

// Home Section Components
import {
    HeroSection,
    Services,
    LatestProjectsSection,
    PhotoGallerySection,
    LatestArticlesSection,
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
    latestArticles,
}) => {
    const [showSplash, setShowSplash] = useState(true);
    const [toast, setToast] = useState<ToastData | null>(null);

    useEffect(() => {
        const splashShown = sessionStorage.getItem('splashShown');
        if (splashShown) setShowSplash(false);
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
    };

    const showToast = (message: string, type: 'success' | 'info' | 'error') => {
        setToast({ message, type });
    };

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }

    return (
        <>
            <Navbar onShowToast={showToast} />

            <main>
                <HeroSection />
                <Services />
                <LatestProjectsSection projects={latestProjects} />
                <PhotoGallerySection images={galleryImages} />
                <LatestArticlesSection articles={latestArticles} />
            </main>

            <Footer />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

interface WelcomeProps extends PageProps {
    latestProjects: Project[];
    galleryImages: GalleryImage[];
    latestArticles: Article[];
}

export default function Welcome() {
    const { t } = useLanguage();
    const { latestProjects, galleryImages, latestArticles, app_url: rawAppUrl, company } = usePage<WelcomeProps>().props;
    
    // Normalize URL to Non-WWW for SEO consistency
    const app_url = rawAppUrl.replace('www.', '');

    return (
        <>
            <Head>
                <title>Beranda</title>
                <meta name="description" content="PT. Jaya Karya Kontruksi (JKK) - Mitra terpercaya untuk konstruksi jalan, produksi aspal hotmix (AMP), dan beton ready mix berkualitas tinggi di Kalimantan Timur." />
                <meta name="keywords" content="kontraktor jalan, konstruksi jalan, aspal hotmix, beton ready mix, AMP, Batching Plant, JKK, Jaya Karya Kontruksi, Kalimantan Timur, pembangunan jalan, supplier beton" />
                
                {/* Site Appearance */}
                <meta property="og:site_name" content="Jaya Karya Kontruksi" />
                <meta property="og:title" content="PT. Jaya Karya Kontruksi | Kontraktor Jalan & Produsen Beton Ready Mix" />
                <meta property="og:description" content="Kualitas konstruksi terbaik di Kalimantan Timur dengan aspal hotmix dan beton ready mix unggulan." />
                <meta property="og:url" content={app_url} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`${app_url}/images/hero-kontruksi.jpeg`} />
                <meta name="twitter:card" content="summary_large_image" />
                
                {/* Structured Data for Google Rich Results */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Jaya Karya Kontruksi",
                        "alternateName": "PT JKK",
                        "url": app_url,
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": `${app_url}/id/artikel?search={search_term_string}`
                            },
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "PT Jaya Karya Kontruksi",
                        "url": app_url,
                        "logo": `${app_url}/images/logo.webp`,
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": company.phone,
                            "contactType": "customer service",
                            "areaServed": "ID",
                            "availableLanguage": ["id", "en"]
                        },
                        "sameAs": [
                            "https://www.facebook.com/jayakaryakontruksi",
                            "https://www.instagram.com/jayakaryakontruksi"
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ConstructionBusiness",
                        "name": "PT Jaya Karya Kontruksi",
                        "alternateName": "JKK",
                        "description": "PT Jaya Karya Kontruksi (JKK) adalah perusahaan konstruksi terkemuka yang spesialis dalam pembangunan jalan, produksi aspal hotmix, dan penyediaan beton ready mix berkualitas SNI.",
                        "url": app_url,
                        "logo": `${app_url}/images/logo.webp`,
                        "image": `${app_url}/images/hero-kontruksi.jpeg`,
                        "@id": app_url,
                        "telephone": company.phone,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": company.address,
                            "addressLocality": "Brebes",
                            "addressRegion": "Jawa Tengah",
                            "postalCode": "52212",
                            "addressCountry": "ID"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": -6.8774,
                            "longitude": 109.0729
                        },
                        "openingHoursSpecification": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday"
                            ],
                            "opens": "08:00",
                            "closes": "17:00"
                        },
                        "sameAs": [
                            "https://www.facebook.com/jayakaryakontruksi",
                            "https://www.instagram.com/jayakaryakontruksi"
                        ]
                    })}
                </script>

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
