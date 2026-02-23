import React, { useState, useEffect, ReactNode, PropsWithChildren } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PageHeader } from '@/Components/Common';
import Navbar from '@/Components/Navigation/Navbar';
import Footer from '@/Components/Navigation/Footer';
import Toast from '@/Components/UI/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { PageProps } from '@/types';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ToastData {
    message: string;
    type: 'success' | 'info' | 'error';
}

type PublicLayoutProps = PropsWithChildren<{
    title?: string;
    headerTitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    headerImage?: string;
    transparentHeader?: boolean;
    hidePageHeader?: boolean;
    headerHeight?: string;
    headerImageOpacity?: number;
    headerImageMixBlendMode?: 'overlay' | 'normal' | 'multiply' | 'screen' | 'soft-light';
    headerOverlayOpacity?: number;
    headerTextPosition?: 'center' | 'top' | 'bottom';
    headerHasBottomContent?: boolean;
}>;

export default function PublicLayout({
    children,
    title,
    headerTitle,
    breadcrumbs = [],
    headerImage,
    transparentHeader = false,
    hidePageHeader = false,
    headerHeight,
    headerImageOpacity,
    headerImageMixBlendMode,
    headerOverlayOpacity,
    headerTextPosition,
    headerHasBottomContent = false,
    ...rest
}: PublicLayoutProps) {
    const { t } = useLanguage();
    const { company } = usePage<PageProps>().props;

    const pageTitle = title || `${t('footer.company')} - JKK`;

    // Note: Navbar/TopBar now handle their own scroll state, 
    // but we might need scroll here for other effects if needed.
    // Keeping it simple for now and letting components be autonomous.

    // Scroll detection for sticky navbar behavior
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 44);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [toast, setToast] = useState<ToastData | null>(null);

    // Toast Helpers
    const showToast = (message: string, type: 'success' | 'info' | 'error') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    // Automatic Header Logic
    // If headerTitle is not provided, try to derive it from the page title
    const effectiveHeaderTitle = headerTitle || pageTitle.replace(/ - JKK.*| - Jaya Karya Kontruksi.*/, '');
    
    // If breadcrumbs are not provided, create a default one based on the title
    const effectiveBreadcrumbs = breadcrumbs.length > 0 
        ? breadcrumbs 
        : [{ label: effectiveHeaderTitle }];

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {headerImage && (
                    <link rel="preload" as="image" href={headerImage} />
                )}
                {!headerImage && (
                    <link rel="preload" as="image" href="/images/header-bg.webp" />
                )}

                {/* Breadcrumb Structured Data */}
                {effectiveBreadcrumbs.length > 0 && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": effectiveBreadcrumbs.map((crumb, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "name": crumb.label,
                                "item": crumb.href ? (crumb.href.startsWith('http') ? crumb.href : `https://jkk-konstruksi.com${crumb.href}`) : undefined
                            }))
                        })}
                    </script>
                )}
            </Head>

            <div className={`min-h-screen bg-gray-50 flex flex-col`}>
                {/* 
                    Header Logic:
                    - TopBar: Integrated inside Navbar.
                    - Navbar: Sticky (Normal) or Fixed/Abs (Transparent).
                */}
                
                <Navbar 
                    onShowToast={showToast}
                    forceTransparent={!!effectiveHeaderTitle || transparentHeader}
                    style={{
                        position: (effectiveHeaderTitle || transparentHeader) ? 'fixed' : 'sticky',
                        top: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        zIndex: 50
                    }}
                />

                <main className={`flex-grow ${transparentHeader ? '' : ''}`}>
                    {!hidePageHeader && effectiveHeaderTitle && (
                        <PageHeader 
                            title={effectiveHeaderTitle}
                            breadcrumbs={effectiveBreadcrumbs}
                            backgroundImage={headerImage}
                            heightClass={headerHeight}
                            imageOpacity={headerImageOpacity}
                            imageMixBlendMode={headerImageMixBlendMode}
                            overlayOpacity={headerOverlayOpacity}
                            textPosition={headerTextPosition}
                            hasBottomContent={headerHasBottomContent}
                        />
                    )}
                    
                    {children}
                </main>

                <Footer />

                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={hideToast}
                    />
                )}
            </div>
        </>
    );
}
