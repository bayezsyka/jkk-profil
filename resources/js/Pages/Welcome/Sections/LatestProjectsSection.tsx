import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

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

interface LatestProjectsSectionProps {
    projects: Project[];
}

const categoryLabels: Record<string, string> = {
    batching_plant: 'Batching Plant',
    construction: 'Konstruksi',
    asphalt_mixing_plant: 'Asphalt Mixing Plant',
};

const LatestProjectsSection: React.FC<LatestProjectsSectionProps> = ({ projects }) => {
    const { t, locale } = useLanguage();

    if (!projects || projects.length === 0) return null;

    const displayProjects = projects.slice(0, 3);

    return (
        <section className="py-10 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-12">
                    <div>
                        <p className="text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5">
                            {t('projects.our_work')}
                        </p>
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                            {t('projects.latest_projects')}
                        </h2>
                        <p className="text-slate-500 mt-1 md:mt-2 max-w-xl text-xs md:text-base hidden md:block">
                            {t('projects.latest_projects_desc')}
                        </p>
                    </div>
                    <Link
                        href={`/${locale}/projek`}
                        className="mt-2 md:mt-0 inline-flex items-center text-primary font-semibold text-xs md:text-sm hover:underline group"
                    >
                        {t('common.viewAll')} {t('nav.projects')}
                        <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Projects — horizontal scroll on mobile, grid on desktop */}
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 scrollbar-hide">
                    {displayProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/${locale}/projek/${project.id}`}
                            className="group bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-[75vw] sm:w-[60vw] md:w-auto snap-start"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                {project.images?.[0] ? (
                                    <img
                                        src={`/storage/${project.images[0].image_path}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                {/* Category Badge */}
                                <span className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] md:text-xs font-medium rounded-md">
                                    {categoryLabels[project.category] || project.category}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-3 md:p-4">
                                <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-2 md:gap-3 text-slate-400 text-xs">
                                    <span className="flex items-center gap-1 truncate">
                                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="truncate">{project.location}</span>
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="flex-shrink-0">{new Date(project.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProjectsSection;
