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
        <div className="relative z-30 -mt-[25vh] md:-mt-[45vh] mb-0 w-full group">
            {/* SlideShow Container */}
            <div className="w-full overflow-hidden relative">
                {/* Gradient mask for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-slate-900/0 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-slate-900/0 to-transparent z-10 pointer-events-none" />

                <div className="flex items-center pb-8">
                     <MarqueeContent images={loopedImages} />
                </div>
            </div>


        </div>
    );
}

function MarqueeContent({ images }: { images: GalleryItem[] }) {
    return (
        <motion.div
            className="flex items-center gap-4 md:gap-6 px-4"
            animate={{ x: "-50%" }}
            transition={{ 
                ease: "linear", 
                duration: Math.max(40, images.length * 5), 
                repeat: Infinity 
            }}
            style={{ width: "max-content" }}
        >
            {images.map((item, index) => (
                <a 
                    href="#" 
                    key={`${item.id}-${index}`}
                    className="relative block shrink-0 w-[220px] sm:w-[320px] md:w-[420px] aspect-video rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 will-change-transform"
                >
                    <img
                        src={item.src}
                        alt={item.projectTitle}
                        className="w-full h-full object-cover"
                        loading="eager"
                        draggable={false}
                    />
                    
                    {/* Minimal Overlay - Clean Look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end">
                        <h3 className="text-white font-bold text-base md:text-lg leading-tight drop-shadow-md line-clamp-1">{item.projectTitle}</h3>
                        <p className="text-white/80 text-xs md:text-sm mt-0.5 drop-shadow-sm">{item.projectLocation}</p>
                    </div>
                </a>
            ))}
        </motion.div>
    );
}
