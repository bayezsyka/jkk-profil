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
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    breadcrumbs, 
    backgroundImage = '/images/header-bg.png' // Default or fallback
}) => {
    const { locale } = useLanguage();

    return (
        <div 
            className="relative w-full h-[250px] md:h-[300px] flex items-center"
            style={{
                background: `linear-gradient(90deg, #1e3a8a 0%, #172554 100%)`, // Deep blue gradient base
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                    mixBlendMode: 'overlay'
                }}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div 
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.8) 50%, rgba(30, 58, 138, 0.4) 100%)'
                }}
            />

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                    <Link href={`/${locale}`} className="hover:text-white transition-colors">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-4 h-4"
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
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default PageHeader;
