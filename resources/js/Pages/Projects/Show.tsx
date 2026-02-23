import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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

interface Props {
    project: Project;
}

export default function Show({ project }: Props) {
    const { t, locale } = useLanguage();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    // Keyboard navigation
    useState(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <PublicLayout 
            title={`${project.title} - ${t('nav.projects')}`}
            headerTitle={t('projects.our_work')}
            breadcrumbs={[
                { label: t('nav.projects'), href: route('projects.index', { locale }) },
                { label: project.title }
            ]}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="max-w-6xl mx-auto mb-12">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4 capitalize">
                        {project.category.replace('_', ' ')}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{project.title}</h1>
                    
                    <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                             <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(project.date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        {project.subcategory && (
                             <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                <span>{project.subcategory}</span>
                            </div>
                        )}
                    </div>

                    {project.description && (
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p className="whitespace-pre-wrap">{project.description}</p>
                        </div>
                    )}
                </div>

                {/* Gallery Grid */}
                {project.images.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-blue-600 pl-4">{t('gallery.our_gallery')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.images.map((image, index) => (
                                <div 
                                    key={image.id}
                                    className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative shadow-sm"
                                    onClick={() => openLightbox(index)}
                                >
                                    <img 
                                        src={`/storage/${image.image_path}`} 
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                                            <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox / Modal (Reused Logic) */}
            <AnimatePresence>
                {lightboxOpen && project.images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setLightboxOpen(false)}
                    >
                         {/* Close Button */}
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
                            onClick={() => setLightboxOpen(false)}
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                         {/* Navigation Buttons */}
                         {project.images.length > 1 && (
                            <>
                                <button 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 disabled:opacity-30 hidden md:block"
                                    onClick={prevImage}
                                >
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 hidden md:block"
                                    onClick={nextImage}
                                >
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                         )}

                        {/* Image Container */}
                        <div 
                            className="relative max-w-7xl max-h-[90vh] flex flex-col items-center" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={project.images[currentImageIndex].id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                src={`/storage/${project.images[currentImageIndex].image_path}`}
                                alt={project.title}
                                className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
                            />
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mt-4 text-center text-white"
                            >
                                <h3 className="text-xl font-bold">{project.title}</h3>
                                <p className="text-slate-400 mt-1">
                                    Image {currentImageIndex + 1} of {project.images.length}
                                </p>
                            </motion.div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
