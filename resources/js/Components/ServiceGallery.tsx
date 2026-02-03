import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    category: string;
    subcategory: string | null;
    description: string | null;
    images: ProjectImage[];
}

interface GalleryItem {
    id: number;
    src: string;
    projectTitle: string;
    projectLocation: string;
    projectDate: string;
}

interface ServiceGalleryProps {
    projects: Project[];
}

export default function ServiceGallery({ projects }: ServiceGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages: GalleryItem[] = useMemo(() => {
        return projects.flatMap(project =>
            project.images.map(image => ({
                id: image.id,
                src: `/storage/${image.image_path}`,
                projectTitle: project.title,
                projectLocation: project.location,
                projectDate: project.date,
            }))
        );
    }, [projects]);

    if (galleryImages.length === 0) return null;

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Galeri Proyek Kami</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={item.src}
                                alt={item.projectTitle}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold text-lg">{item.projectTitle}</h3>
                                <p className="text-gray-300 text-sm">{item.projectLocation} &bull; {new Date(item.projectDate).getFullYear()}</p>
                            </div>
                        </motion.div>
                    ))}
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
                            <button 
                                className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
                                onClick={() => setLightboxOpen(false)}
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <button 
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 hidden md:block"
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

                            <div 
                                className="relative max-w-7xl max-h-[90vh] flex flex-col items-center" 
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.img
                                    key={galleryImages[currentImageIndex].id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    src={galleryImages[currentImageIndex].src}
                                    alt={galleryImages[currentImageIndex].projectTitle}
                                    className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
                                />
                                
                                <div className="mt-4 text-center text-white">
                                    <h3 className="text-xl font-bold">{galleryImages[currentImageIndex].projectTitle}</h3>
                                    <p className="text-gray-400 mt-1">
                                        {galleryImages[currentImageIndex].projectLocation} &bull; {new Date(galleryImages[currentImageIndex].projectDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
