import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BreadcrumbItem {
    label: string;
    href?: string;
}

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
}

interface ServicePageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage: string;
    projects?: Project[];
}

// ─── Marquee Sub-component ────────────────────────────────────────────────────
function MarqueeStrip({ images, direction = 'left', speed = 50 }: {
    images: GalleryItem[];
    direction?: 'left' | 'right';
    speed?: number;
}) {
    const looped = useMemo(() => {
        if (images.length === 0) return [];
        const count = images.length < 5 ? 8 : 4;
        return Array(count).fill(images).flat();
    }, [images]);

    if (looped.length === 0) return null;

    const duration = Math.max(35, looped.length * (speed / 10));

    return (
        <motion.div
            className="flex items-center gap-3 md:gap-5 px-2"
            animate={{ x: direction === 'left' ? '-50%' : '0%' }}
            initial={{ x: direction === 'left' ? '0%' : '-50%' }}
            transition={{
                ease: 'linear',
                duration,
                repeat: Infinity,
            }}
            style={{ width: 'max-content' }}
        >
            {looped.map((item, index) => (
                <div
                    key={`${item.id}-${index}`}
                    className="relative shrink-0 w-[220px] sm:w-[300px] md:w-[380px] aspect-[16/10] rounded-xl overflow-hidden group/card"
                >
                    <img
                        src={item.src}
                        alt={item.projectTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        loading="eager"
                        draggable={false}
                    />
                    {/* Card overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                        <h4 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-1 drop-shadow-lg">
                            {item.projectTitle}
                        </h4>
                        <p className="text-white/70 text-xs md:text-sm mt-0.5 drop-shadow">
                            {item.projectLocation}
                        </p>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServicePageHeader({
    title,
    subtitle,
    breadcrumbs,
    backgroundImage,
    projects = [],
}: ServicePageHeaderProps) {
    const { locale, t } = useLanguage();
    const [imageLoaded, setImageLoaded] = useState(false);

    // Build gallery items from projects
    const galleryImages: GalleryItem[] = useMemo(() => {
        return projects.flatMap(project =>
            project.images.map(image => ({
                id: image.id,
                src: image.image_path.startsWith('http')
                    ? image.image_path
                    : `/storage/${image.image_path}`,
                projectTitle: project.title,
                projectLocation: project.location,
            }))
        );
    }, [projects]);

    const hasGallery = galleryImages.length > 0;

    const handleScrollDown = () => {
        const headerEl = document.getElementById('service-header-end');
        if (headerEl) {
            headerEl.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    // Stagger animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        },
    };

    return (
        <>
            <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
                {/* ── Background Layer ──────────────────────────────── */}
                <div className="absolute inset-0 z-0">
                    {/* Background image */}
                    <img
                        src={backgroundImage}
                        alt=""
                        className={`w-full h-full object-cover transition-all duration-1000 ${
                            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        // @ts-ignore
                        fetchpriority="high"
                    />
                </div>

                {/* ── Cinematic Gradient Overlays ─────────────────── */}
                {/* Main dark overlay */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background: `linear-gradient(
                            180deg,
                            rgba(15, 23, 42, 0.85) 0%,
                            rgba(15, 23, 42, 0.55) 35%,
                            rgba(15, 23, 42, 0.40) 55%,
                            rgba(15, 23, 42, 0.70) 80%,
                            rgba(15, 23, 42, 0.95) 100%
                        )`,
                    }}
                />
                {/* Blue tint overlay */}
                <div
                    className="absolute inset-0 z-[2]"
                    style={{
                        background: `linear-gradient(
                            135deg,
                            rgba(30, 58, 138, 0.50) 0%,
                            rgba(30, 58, 138, 0.10) 50%,
                            rgba(30, 58, 138, 0.30) 100%
                        )`,
                    }}
                />
                {/* Vignetting effect */}
                <div
                    className="absolute inset-0 z-[3]"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15, 23, 42, 0.5) 100%)',
                    }}
                />

                {/* ── Title & Breadcrumb Content ──────────────────── */}
                <div className="relative z-10 flex-1 flex flex-col justify-end pb-24 md:justify-center md:pb-0 pt-28 md:pt-36">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Breadcrumbs */}
                            <motion.nav
                                variants={itemVariants}
                                className="flex items-center gap-2 text-xs md:text-sm mb-5 md:mb-7"
                            >
                                <Link
                                    href={`/${locale}`}
                                    className="text-white/50 hover:text-white transition-colors duration-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                                    >
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                </Link>
                                {breadcrumbs.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <span className="text-white/30">/</span>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="text-white/50 hover:text-white transition-colors duration-300"
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className="text-white/80 font-medium">
                                                {item.label}
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </motion.nav>

                            {/* Accent bar */}
                            <motion.div variants={itemVariants} className="mb-5 md:mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 md:w-14 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
                                    <div className="w-3 md:w-4 h-1 bg-blue-400/40 rounded-full" />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl"
                            >
                                {title}
                            </motion.h1>

                            {/* Subtitle */}
                            {subtitle && (
                                <motion.p
                                    variants={itemVariants}
                                    className="mt-4 md:mt-6 text-base md:text-lg text-white/60 max-w-2xl leading-relaxed font-light"
                                >
                                    {subtitle}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* ── Scroll Indicator ──────────────────────────────── */}
                <motion.div
                    className="absolute bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <button
                        onClick={handleScrollDown}
                        className="group flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-500 focus:outline-none"
                        aria-label={t('common.scrollDown')}
                    >
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
                            Scroll
                        </span>
                        <div className="relative w-5 h-8 md:w-6 md:h-9 border border-white/20 rounded-full flex justify-center group-hover:border-white/40 transition-colors duration-500">
                            <motion.div
                                className="w-1 h-1.5 md:w-1.5 md:h-2 bg-white/60 rounded-full mt-1.5"
                                animate={{ y: [0, 10, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: 'easeInOut',
                                }}
                            />
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* ── Gallery Marquee Section (below header) ──────────── */}
            {hasGallery && (
                <div className="relative bg-slate-900 py-10 md:py-14 overflow-hidden">
                    {/* Fade edges for marquee */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

                    <div className="overflow-hidden">
                        <MarqueeStrip images={galleryImages} direction="left" speed={50} />
                    </div>
                </div>
            )}

            {/* Marker for scroll-to target */}
            <div id="service-header-end" />
        </>
    );
}

