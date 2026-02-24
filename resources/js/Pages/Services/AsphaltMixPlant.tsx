import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { Head } from '@inertiajs/react';
import ServicePageHeader from '@/Components/ServicePageHeader';
import AsphaltCalculator from '@/Components/Calculators/AsphaltCalculator';

import { Project } from '@/Components/ProjectCard';
import ProjectCard from '@/Components/ProjectCard';

interface AsphaltPrice {
    id: number;
    name: string;
    price_loco: number;
    price_tergelar: number;
    unit: string;
    description: string | null;
}

interface Props {
    projects: Project[];
    asphaltPrices: AsphaltPrice[];
}

export default function AsphaltMixPlant({ projects, asphaltPrices }: Props) {
    const { t } = useLanguage();
    
    const latestProjects = projects.slice(0, 4);

    return (
        <>
            <Head>
                <title>{`${t('services.asphalt.title')} - Jaya Karya Kontruksi`}</title>
                <meta name="description" content="Layanan Asphalt Mix Plant (AMP) di Brebes. Menyediakan berbagai tipe aspal hotmix berkualitas tinggi untuk proyek pengaspalan jalan Anda." />
                <meta name="keywords" content="asphalt mix plant, aspal hotmix, harga aspal hotmix, jual aspal, pengaspalan jalan, kontraktor aspal, JKK AMP" />
            </Head>
            <PublicLayout 
                title={t('services.asphalt.title')}
                hidePageHeader
            >
            <ServicePageHeader
                title={t('services.asphalt.title')}
                subtitle={t('services.asphalt.desc')}
                breadcrumbs={[
                    { label: t('nav.services'), href: `#` },
                    { label: t('services.asphalt.title') },
                ]}
                backgroundImage="/images/hero-amp.webp"
                projects={projects}
            />

            {/* Latest Projects Section */}
            {projects.length > 0 && (
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                                    {t('services.asphalt.title')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                    {t('projects.latest_projects')}
                                </h2>
                            </div>
                            <div className="text-left md:text-right">
                                <a href={route('projects.index')} className="group inline-flex items-center justify-center px-6 py-2 border-2 border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                    {t('common.viewAll')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {latestProjects.map((project) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    showCategory={false}
                                    showDescription={false}
                                    compact={true}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Terms & Conditions Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header - Konsisten dengan section lain */}
                    <div className="max-w-2xl mb-12">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                            {t('services.asphalt.terms.title')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                            {t('services.asphalt.terms.subtitle')}
                        </h2>
                        <p className="text-slate-600 text-lg">
                            {t('services.asphalt.terms.short_info')}
                        </p>
                    </div>

                    {/* Terms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <div 
                                key={index}
                                className="bg-slate-50 border border-slate-200 rounded-lg p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-base mb-2">
                                            {t(`services.asphalt.terms.items.${index}.title`)}
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            {t(`services.asphalt.terms.items.${index}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Note */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                        <p className="text-slate-700 mb-4">
                            {t('services.asphalt.terms.full_terms_note')}
                        </p>
                        <a 
                            href="#calculator" 
                            className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                        >
                            {t('services.asphalt.terms.view_calculator')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {asphaltPrices.length > 0 && (
                <div id="calculator">
                    <AsphaltCalculator asphaltPrices={asphaltPrices} />
                </div>
            )}
        </PublicLayout>
        </>
    );
}

