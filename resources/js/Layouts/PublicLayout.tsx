import React, { useState, useEffect, ReactNode, PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';

// Navigation Components
import { Navbar, Footer } from '@/Components/Navigation';
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

type PublicLayoutProps = PropsWithChildren<{
    title?: string;
    headerTitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    headerImage?: string;
    transparentHeader?: boolean;
}>;

export default function PublicLayout({
    children,
    title = 'JKK - Jaya Karya Kontruksi', // Default title
    headerTitle,
    breadcrumbs = [],
    headerImage,
    transparentHeader = false
}: PublicLayoutProps) {
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

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className={`min-h-screen bg-gray-50 flex flex-col`}>
                {/* 
                    Header Logic:
                    - TopBar: Integrated inside Navbar.
                    - Navbar: Sticky (Normal) or Fixed/Abs (Transparent).
                */}
                
                <Navbar 
                    onShowToast={showToast}
                    // isTransparent={transparentHeader && !isScrolled} // User removed prop 'isTransparent' from Navbar, so relied on Navbar internal logic.
                    // But if transparentHeader is TRUE, we want transparent.
                    // If Navbar doesn't support forcing transparency, we might have an issue on non-home pages.
                    // Assuming user wants Homepage behavior for now or simplified behavior.
                    style={transparentHeader ? {
                        position: isScrolled ? 'fixed' : 'absolute',
                        top: 0, // TopBar is inside Navbar now, so top starts at 0
                        left: 0,
                        right: 0,
                        width: '100%'
                    } : {
                        position: 'sticky',
                        top: 0
                    }}
                />

                <main className={`flex-grow ${transparentHeader ? '' : ''}`}>
                    {headerTitle && (
                        <PageHeader 
                            title={headerTitle}
                            breadcrumbs={breadcrumbs}
                            backgroundImage={headerImage}
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
