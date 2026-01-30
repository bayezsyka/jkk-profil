import React, { useState, useEffect, ReactNode } from 'react';
import { Head } from '@inertiajs/react';

// Layout Components
import { Navbar, Footer } from '@/Components/Layout';
import { PageHeader } from '@/Components/Common';
import { Toast } from '@/Components/UI';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ToastData {
    message: string;
    type: 'success' | 'info' | 'error';
}

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
    headerTitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    headerImage?: string;
    transparentHeader?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
    children,
    title = 'JKK - Jaya Karya Kontruksi', // Default title
    headerTitle,
    breadcrumbs = [],
    headerImage,
    transparentHeader = false
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [toast, setToast] = useState<ToastData | null>(null);

    // Handle Scroll for Navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toast Helpers
    const showToast = (message: string, type: 'success' | 'info' | 'error') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className={`min-h-screen bg-gray-50 flex flex-col ${!transparentHeader ? 'pt-[130px]' : ''}`}>
                <Navbar isScrolled={isScrolled} isTransparent={transparentHeader} onShowToast={showToast} />

                <main className="flex-grow">
                    {headerTitle && (
                        <PageHeader 
                            title={headerTitle}
                            breadcrumbs={breadcrumbs}
                            backgroundImage={headerImage}
                        />
                    )}
                    
                    {/* 
                       If we have a header, the children normally follow it. 
                       If NO header (like Home), the HeroSection usually takes care of margin/padding.
                       We should probably wrap children in a container if it's a standard page, 
                       but the user might want full width sections. 
                       Let's assume children handle their own containers, 
                       but maybe adding a default spacing if header is present is good?
                    */}
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
};

export default PublicLayout;
