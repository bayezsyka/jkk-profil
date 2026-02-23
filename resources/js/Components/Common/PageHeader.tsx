import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
    heightClass?: string;
    imageOpacity?: number;
    imageMixBlendMode?: 'overlay' | 'normal' | 'multiply' | 'screen' | 'soft-light';
    overlayOpacity?: number;
    textPosition?: 'center' | 'top' | 'bottom';
    hasBottomContent?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    breadcrumbs, 
    backgroundImage = '/images/header-bg.webp',
    heightClass = "h-[250px] md:h-[300px]",
    imageOpacity = 0.2,
    imageMixBlendMode = 'overlay',
    overlayOpacity = 1,
    textPosition = 'center',
    hasBottomContent = false
}) => {
    const { locale, t } = useLanguage();

    // Determine alignment based on textPosition
    const getAlignmentClass = () => {
        switch (textPosition) {
            case 'top':
                return 'items-start pt-32 md:pt-48';
            case 'bottom':
                if (hasBottomContent) {
                    // Has gallery: pas di atas foto
                    // Mobile: pb-[32vh], Desktop: pb-[48vh]
                    return 'items-end pb-[32vh] md:pb-[48vh]';
                } else {
                    // No gallery: mentok bawah (di atas icon scroll)
                    return 'items-end pb-24 md:pb-24';
                }
            default:
                return 'items-center';
        }
    };

    // Unified title formatting
    const getTitleClass = () => {
        if (textPosition === 'bottom') {
            // Mobile: text-3xl, Desktop: text-6xl
            return 'text-3xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight';
        }
        return 'text-3xl md:text-4xl font-bold text-white tracking-tight';
    };

    const isFullScreen = heightClass.includes('h-screen') || heightClass.includes('min-h-screen');

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div 
            className={`relative w-full ${heightClass} flex ${getAlignmentClass()}`}
            style={{
                background: `linear-gradient(90deg, #1e3a8a 0%, #172554 100%)`,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={backgroundImage} 
                    alt={`Background Header ${title} - PT Jaya Karya Kontruksi`} 
                    className="w-full h-full object-cover"
                    style={{
                        opacity: imageOpacity,
                        mixBlendMode: imageMixBlendMode
                    }}
                    // @ts-ignore
                    fetchpriority="high"
                />
            </div>
            
            {/* Gradient Overlay for Text Readability */}
            <div 
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.8) 50%, rgba(30, 58, 138, 0.4) 100%)',
                    opacity: overlayOpacity
                }}
            />

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-300 mb-2 md:mb-4">
                    <Link href={`/${locale}`} className="hover:text-white transition-colors">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-3 h-3 md:w-4 md:h-4"
                        >
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                    </Link>
                    
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className="text-gray-400">/</span>
                            {item.href ? (
                                <Link 
                                    href={item.href} 
                                    className="hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-white font-medium">
                                    {item.label}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                {/* Title */}
                <h1 className={getTitleClass()}>
                    {title}
                </h1>
            </div>

            {/* Scroll Down Button for Full Screen Headers */}
            {isFullScreen && (
                <div className="absolute bottom-16 md:bottom-8 left-0 right-0 z-40 flex justify-center animate-bounce">
                    <button 
                        onClick={handleScrollDown}
                        className="text-white hover:text-gray-200 transition-colors focus:outline-none"
                        aria-label={t('common.scrollDown')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
