import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import AboutSubNavbar from './AboutSubNavbar';

// Section Components
import ProfileSection from './Sections/ProfileSection';
import VisionMissionSection from './Sections/VisionMissionSection';
import ValuesSection from './Sections/ValuesSection';
import HistorySection from './Sections/HistorySection';
import StructureSection from './Sections/StructureSection';
import ManagementSection from './Sections/ManagementSection';

const AboutInfo: React.FC = () => {
    const { t, locale } = useLanguage();
    const [activeSection, setActiveSection] = useState('profil');
    const [isMenuSticky, setIsMenuSticky] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Dynamic Sections Configuration
    // To add a new section, just add it to this array
    const sectionsConfig = [
        { id: 'profil', label: t('about.profile.title'), Component: ProfileSection },
        { id: 'visi-misi', label: t('about.vision.title'), Component: VisionMissionSection },
        { id: 'nilai', label: t('about.values.title'), Component: ValuesSection },
        { id: 'sejarah', label: t('about.history.title'), Component: HistorySection },
        { id: 'struktur', label: t('nav.about_structure'), Component: StructureSection },
        { id: 'manajemen', label: 'Manajemen', Component: ManagementSection }, // TODO: Add Manajemen to JSON if needed
    ];

    const breadcrumbs = [
        { label: t('nav.about'), href: `/${locale}/tentang-kami` },
        { label: sectionsConfig.find(s => s.id === activeSection)?.label || 'Profil' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const rect = menuRef.current.getBoundingClientRect();
                setIsMenuSticky(rect.top <= 100);
            }

            // Determine active section based on scroll position
            const sectionElements = sectionsConfig.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 250;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && scrollPosition >= el.offsetTop) {
                    setActiveSection(sectionsConfig[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 180; // Accounting for Navbar + Sub-navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <PublicLayout
            title="Tentang Kami - PT. Jaya Karya Kontruksi"
            headerTitle="Tentang Kami"
            breadcrumbs={breadcrumbs}
        >
            {/* Sub-Navbar Component */}
            <div ref={menuRef}>
                <AboutSubNavbar 
                    sections={sectionsConfig.map(({ id, label }) => ({ id, label }))}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    isMenuSticky={isMenuSticky}
                />
            </div>

            {/* Content Sections */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-5xl mx-auto space-y-24">
                    {sectionsConfig.map(({ id, Component }) => (
                        <Component key={id} id={id} />
                    ))}
                </div>
            </div>

            <style>{`
                .scroll-mt-32 {
                    scroll-margin-top: 180px;
                }
                @media (max-width: 768px) {
                    .scroll-mt-32 {
                        scroll-margin-top: 160px;
                    }
                }
            `}</style>
        </PublicLayout>
    );
};

export default AboutInfo;
