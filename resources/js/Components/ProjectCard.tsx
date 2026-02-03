import { Link } from '@inertiajs/react';
import React from 'react';

interface ProjectImage {
    id: number;
    image_path: string;
    project_id: number;
}

export interface Project {
    id: number;
    title: string;
    location: string;
    date: string;
    category: string;
    subcategory: string | null;
    description: string | null;
    images: ProjectImage[];
}

interface ProjectCardProps {
    project: Project;
    className?: string;
    showCategory?: boolean;
    showDescription?: boolean;
    compact?: boolean;
}

export default function ProjectCard({ 
    project, 
    className = '', 
    showCategory = true, 
    showDescription = true,
    compact = false
}: ProjectCardProps) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full ${className}`}>
            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden group">
                {project.images.length > 0 ? (
                    <img 
                        src={project.images[0].image_path.startsWith('http') ? project.images[0].image_path : `/storage/${project.images[0].image_path}`} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {showCategory && (
                    <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                        {project.category.replace(/_/g, ' ')}
                    </div>
                )}
            </div>
            
            <div className={`${compact ? 'p-3' : 'p-6'} flex-1 flex flex-col`}>
                <div className={`flex items-center text-xs sm:text-sm text-gray-500 ${compact ? 'mb-2 gap-2 sm:gap-4' : 'mb-3 gap-4'}`}>
                    <span className="flex items-center gap-1">
                        {!compact && (
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                        {new Date(project.date).getFullYear()}
                    </span>
                    <span className="flex items-center gap-1 truncate text-[10px] sm:text-sm">
                        {!compact && (
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                        <span className="truncate">{project.location}</span>
                    </span>
                </div>
                
                <h3 className={`${compact ? 'text-sm sm:text-lg' : 'text-xl'} font-bold text-slate-800 ${compact ? 'mb-2' : 'mb-3'} line-clamp-2 group-hover:text-blue-600 transition-colors`}>
                    <Link href={route('projects.show', project.id)} className="hover:text-blue-600 transition-colors">
                        {project.title}
                    </Link>
                </h3>
                
                {showDescription && (
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                        {project.description || "Tidak ada deskripsi tersedia."}
                    </p>
                )}
                
                <Link 
                    href={route('projects.show', project.id)}
                    className={`inline-flex items-center justify-center w-full px-2 sm:px-4 ${compact ? 'py-1.5 text-xs sm:text-sm' : 'py-2.5'} bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-blue-600 font-medium transition-all gap-1 sm:gap-2 group border border-slate-200`}
                >
                    Lihat Detail
                    <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} transition-transform group-hover:translate-x-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
