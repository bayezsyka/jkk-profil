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
        <div className="w-full">
            {/* Desktop Sidebar Style */}
            <div className="hidden md:flex flex-col gap-2 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="px-4 py-2 mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Navigation</span>
                </div>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 text-left flex items-center gap-3 ${
                            activeSection === section.id
                                ? 'bg-[#1e3a5f] text-white shadow-md translate-x-1'
                                : 'text-[#1e3a5f] hover:bg-gray-50'
                        }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeSection === section.id ? 'bg-white scale-125' : 'bg-[#1e3a5f]/20'}`} />
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Mobile Scrollable Horizontal Style */}
            <div 
                className={`md:hidden about-subnavbar ${
                    isMenuSticky 
                        ? 'fixed top-[75px] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100 py-2 px-3 z-50 w-[92vw]' 
                        : 'bg-gray-100/60 rounded-2xl py-2 px-2'
                }`}
            >
                <div className="flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`px-4 py-2 text-[11px] font-black rounded-xl whitespace-nowrap flex-shrink-0 uppercase tracking-tighter transition-all ${
                                activeSection === section.id
                                    ? 'bg-[#1e3a5f] text-white shadow-lg'
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
            `}</style>
        </div>
    );
};

export default AboutSubNavbar;
