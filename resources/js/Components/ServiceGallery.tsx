import { useMemo } from 'react';
import { motion } from 'framer-motion';

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
    const galleryImages: GalleryItem[] = useMemo(() => {
        const flattened = projects.flatMap(project =>
            project.images.map(image => ({
                id: image.id,
                src: image.image_path.startsWith('http') ? image.image_path : `/storage/${image.image_path}`,
                projectTitle: project.title,
                projectLocation: project.location,
                projectDate: project.date,
            }))
        );
        return flattened;
    }, [projects]);

    // Create a looped array for seamless marquee
    const loopedImages = useMemo(() => {
        if (galleryImages.length === 0) return [];
        const repeatCount = galleryImages.length < 5 ? 8 : 4;
        return Array(repeatCount).fill(galleryImages).flat();
    }, [galleryImages]);

    if (galleryImages.length === 0) return null;

    return (
        <div className="w-full relative overflow-hidden bg-black h-[35vh] md:h-[45vh] lg:h-[50vh]">
            {/* Gradient Overlays for smooth edge fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none" />

            <div className="flex h-full items-center">
                <motion.div
                    className="flex h-full"
                    animate={{ x: "-50%" }}
                    transition={{ 
                        ease: "linear", 
                        duration: Math.max(30, loopedImages.length * 4), 
                        repeat: Infinity 
                    }}
                    style={{ width: "fit-content" }}
                >
                    {loopedImages.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="relative h-full aspect-[4/3] md:aspect-[16/9] flex-shrink-0 border-none outline-none select-none pointer-events-none"
                        >
                            <img
                                src={item.src}
                                alt={item.projectTitle}
                                className="w-full h-full object-cover"
                                loading="eager"
                                draggable={false}
                            />
                            {/* Subtle overlay with info - static, no hover needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                                <div className="text-white">
                                    <h3 className="text-sm md:text-base font-bold tracking-wider uppercase opacity-80">{item.projectTitle}</h3>
                                    <p className="text-xs mt-0.5 opacity-60">{item.projectLocation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
