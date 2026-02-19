import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

const Services: React.FC = () => {
    const { t, locale } = useLanguage();

    // Define services data
    const services = [
        {
            id: 'batching',
            title: t('services.batching.title'),
            href: `/${locale}/services/batching-plant`
        },
        {
            id: 'construction',
            title: t('services.contractor.title'),
            href: `/${locale}/services/construction`
        },
        {
            id: 'asphalt',
            title: t('services.asphalt.title'),
            href: `/${locale}/services/asphalt-mixing-plant`
        }
    ];

    return (
        <section className="relative w-full h-[80vh] overflow-hidden">
            {/* Background Image with Dominant Blue Overlay */}
            <div className="absolute inset-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/services-bg.webp')" }}
                />
                {/* Heavy Blue Overlay to match the reference style */}
                <div className="absolute inset-0 bg-primary/90 mix-blend-multiply transition-colors duration-500" />
                <div className="absolute inset-0 bg-primary/80" /> {/* Fallback/Extra layer for solid blue look */}
            </div>

            <div className="relative z-10 w-full h-full flex flex-col pt-16 pb-8 md:pt-24 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Services Grid - 3 Columns with vertical dividers on desktop, horizontal on mobile */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 md:divide-white/30 items-center justify-center">
                    {services.map((service) => (
                        <Link 
                            key={service.id}
                            href={service.href}
                            className={`group h-full flex flex-col justify-center items-center p-6 relative transition-all duration-500 ${
                                service.id === 'construction' 
                                    ? 'bg-white/5' // Distinct background for Construction by default
                                    : ''
                            }`}
                        >
                            <h3 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white/90 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 tracking-tight text-center drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
                                {service.title}
                            </h3>
                        </Link>
                    ))}
                </div>

                {/* Footer Link */}
                <div className="text-center mt-auto pt-8">
                    <Link 
                        href={`/${locale}/projek`}
                        className="inline-flex items-center text-white/80 hover:text-white text-sm md:text-base font-medium tracking-wider uppercase transition-colors group"
                    >
                        <span>{t('common.viewAll')} {t('nav.projects')}</span>
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;