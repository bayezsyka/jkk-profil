import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

const serviceData = [
    {
        id: 'batching',
        titleKey: 'services.batching.title',
        descKey: 'services.batching.desc',
        image: '/images/hero-batchingplant.webp',
        routePath: 'services/batching-plant',
    },
    {
        id: 'construction',
        titleKey: 'services.contractor.title',
        descKey: 'services.contractor.desc',
        image: '/images/hero-kontruksi.jpeg',
        routePath: 'services/construction',
    },
    {
        id: 'asphalt',
        titleKey: 'services.asphalt.title',
        descKey: 'services.asphalt.desc',
        image: '/images/hero-amp.webp',
        routePath: 'services/asphalt-mixing-plant',
    },
];

const Services: React.FC = () => {
    const { t, locale } = useLanguage();

    return (
        <section className="py-10 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-6 md:mb-12">
                    <p className="text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5">
                        {t('nav.services')}
                    </p>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                        {t('services.title')}
                    </h2>
                    <p className="text-slate-500 mt-1 md:mt-2 max-w-xl text-xs md:text-base">
                        {t('services.description')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                    {serviceData.map((service) => (
                        <Link
                            key={service.id}
                            href={`/${locale}/${service.routePath}`}
                            className="group relative rounded-lg md:rounded-xl overflow-hidden aspect-[16/10] md:aspect-[4/5] shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Background Image */}
                            <img
                                src={service.image}
                                alt={t(service.titleKey)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                                <h3 className="text-base md:text-xl font-bold text-white mb-0.5 md:mb-1">
                                    {t(service.titleKey)}
                                </h3>
                                <p className="text-white/60 text-xs md:text-sm line-clamp-2 hidden sm:block">
                                    {t(service.descKey)}
                                </p>
                                <span className="inline-flex items-center text-white/50 group-hover:text-white text-xs font-medium transition-colors mt-2 md:mt-3">
                                    {t('common.viewDetail')}
                                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;