import React, { useState, useEffect } from 'react';

interface SubNavbarSection {
    id: string;
    label: string;
}

interface AboutSubNavbarProps {
    sections: SubNavbarSection[];
    activeSection: string;
    scrollToSection: (id: string) => void;
    isMenuSticky: boolean;
}

const AboutSubNavbar: React.FC<AboutSubNavbarProps> = ({ 
    sections, 
    activeSection, 
    scrollToSection, 
    isMenuSticky 
}) => {
    return (
        <div className="relative z-40 py-4 md:py-8 flex justify-center w-full">
            <div 
                className={`about-subnavbar transition-all duration-500 ease-in-out ${
                    isMenuSticky 
                        ? 'fixed top-[100px] bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-100 py-1.5 px-2' 
                        : 'bg-gray-100/60 rounded-2xl py-1.5 px-2'
                }`}
                style={{ 
                    zIndex: 35,
                    left: isMenuSticky ? '50%' : 'auto',
                    transform: isMenuSticky ? 'translateX(-50%)' : 'none',
                    maxWidth: '95vw',
                    width: isMenuSticky ? 'auto' : 'max-content'
                }}
            >
                <div className="flex flex-nowrap items-center md:justify-center gap-1 md:gap-2 overflow-x-auto no-scrollbar scroll-smooth px-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`px-3 md:px-5 py-2 md:py-2.5 text-[10px] md:text-sm font-black transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0 uppercase tracking-tighter ${
                                activeSection === section.id
                                    ? 'bg-[#1e3a5f] text-white shadow-lg scale-105'
                                    : 'text-[#1e3a5f] hover:bg-white/80'
                            }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @media (max-width: 768px) {
                    .about-subnavbar.fixed {
                        top: 75px !important; /* Adjust for mobile navbar height if needed */
                    }
                }
            `}</style>
        </div>
    );
};

export default AboutSubNavbar;
