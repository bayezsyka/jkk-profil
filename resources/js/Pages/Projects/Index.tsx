import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
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
    subcategory: string | null;
    description: string | null;
    images: ProjectImage[];
}

interface Pagination {
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    data: Project[];
}

interface Props {
    projects: Pagination;
}

export default function Index({ projects }: Props) {
    const { t } = useLanguage();
    return (
        <PublicLayout 
            title={`${t('projects.list')} - JKK`}
            headerTitle={t('projects.list')}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.data.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative"
                        >
                            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                                {project.images.length > 0 ? (
                                    <img 
                                        src={`/storage/${project.images[0].image_path}`} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-20">
                                    {t(`gallery.filters.${project.category}`) !== `gallery.filters.${project.category}` 
                                        ? t(`gallery.filters.${project.category}`) 
                                        : project.category.replace('_', ' ')}
                                </div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(project.date).getFullYear()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {project.location}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                                    <Link href={route('projects.show', project.id)} className="hover:text-blue-600 transition-colors after:absolute after:inset-0 after:z-10">
                                        {project.title}
                                    </Link>
                                </h3>
                                
                                {project.description && (
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                        {project.description}
                                    </p>
                                )}
                                
                                <Link 
                                    href={route('projects.show', project.id)}
                                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors gap-2 group relative z-20"
                                >
                                    {t('common.viewDetail')}
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {projects.total > projects.data.length && (
                    <div className="mt-12 flex justify-center gap-2">
                        {projects.prev_page_url && (
                            <Link 
                                href={projects.prev_page_url} 
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {t('common.previous')}
                            </Link>
                        )}
                        {projects.next_page_url && (
                            <Link 
                                href={projects.next_page_url} 
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {t('common.next')}
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
