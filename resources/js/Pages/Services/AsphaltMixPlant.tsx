import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import ServiceGallery from '@/Components/ServiceGallery';

import { Project } from '@/Components/ProjectCard';
import ProjectCard from '@/Components/ProjectCard';

interface Props {
    projects: Project[];
}

export default function AsphaltMixPlant({ projects }: Props) {
    const { t } = useLanguage();
    
    const latestProjects = projects.slice(0, 4);

    return (
        <PublicLayout 
            title={`${t('services.asphalt.title')} - JKK`}
            headerTitle={t('services.asphalt.title')}
        >
            <ServiceGallery projects={projects} />

            {/* Latest Projects Section */}
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
        </PublicLayout>
    );
}
