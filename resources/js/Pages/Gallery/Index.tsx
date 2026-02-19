import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface ProjectImage {
    id: number;
    image_path: string;
    project_id: number;
}

interface Project {
    id: number;
    title: string;
    location: string;
    date: string;
    category: 'construction' | 'batching_plant' | 'asphalt_mixing_plant';
    subcategory: string | null;
    description: string | null;
    images: ProjectImage[];
}

interface Props {
    projects: Project[];
}

interface GalleryItem {
    id: number; // Image ID
    src: string;
    projectTitle: string;
    projectLocation: string;
    projectDate: string;
    category: string;
    originalProject: Project;
}

export default function Index({ projects }: Props) {
    const { t, locale } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Flatten images to a single array with project metadata
    const allImages: GalleryItem[] = useMemo(() => {
        return projects.flatMap(project => 
            project.images.map(image => ({
                id: image.id,
                src: `/storage/${image.image_path}`,
                projectTitle: project.title,
                projectLocation: project.location,
                projectDate: project.date,
                category: project.category,
                originalProject: project
            }))
        );
    }, [projects]);

    // Filter images based on active category
    const filteredImages = useMemo(() => {
        if (activeCategory === 'all') return allImages;
        return allImages.filter(img => img.category === activeCategory);
    }, [allImages, activeCategory]);

    // Handle opening lightbox
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    // Navigation functions
    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
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

    const categories = [
        { id: 'all', label: t('gallery.filters.all') },
        { id: 'batching_plant', label: t('gallery.filters.batching_plant') },
        { id: 'asphalt_mixing_plant', label: t('gallery.filters.asphalt_mixing_plant') },
        { id: 'construction', label: t('gallery.filters.construction') },
    ];

    return (
        <PublicLayout 
            title={`${t('gallery.title')} - JKK`}
            headerTitle={t('gallery.our_gallery')}
        >
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeCategory === cat.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((item, index) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-slate-200"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={item.src}
                                    alt={item.projectTitle}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.projectTitle}</h3>
                                    <p className="text-slate-300 text-sm">{item.projectLocation} &bull; {new Date(item.projectDate).getFullYear()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <p>{t('gallery.empty')}</p>
                    </div>
                )}
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {lightboxOpen && (
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

                        {/* Image Container */}
                        <div 
                            className="relative max-w-7xl max-h-[90vh] flex flex-col items-center" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={filteredImages[currentImageIndex].id} // Key to trigger animation on change
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                src={filteredImages[currentImageIndex].src}
                                alt={filteredImages[currentImageIndex].projectTitle}
                                className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
                            />
                            
                            {/* Caption */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mt-4 text-center text-white"
                            >
                                <h3 className="text-xl font-bold">{filteredImages[currentImageIndex].projectTitle}</h3>
                                <p className="text-slate-400 mt-1">
                                    {filteredImages[currentImageIndex].projectLocation} &bull; {new Date(filteredImages[currentImageIndex].projectDate).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </motion.div>

                            {/* Mobile Navigation (Visible only on small screens) */}
                             <div className="flex justify-between w-full md:hidden mt-4 px-4">
                                <button onClick={prevImage} className="text-white p-2 bg-white/10 rounded-full">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={nextImage} className="text-white p-2 bg-white/10 rounded-full">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
