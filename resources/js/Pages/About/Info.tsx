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
        { id: 'struktur', label: t('nav.about_structure'), Component: StructureSection },
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
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar / Sub-Navbar */}
                    <aside className="md:w-64 flex-shrink-0" ref={menuRef}>
                        <div className="md:sticky md:top-32">
                            <AboutSubNavbar 
                                sections={sectionsConfig.map(({ id, label }) => ({ id, label }))}
                                activeSection={activeSection}
                                scrollToSection={scrollToSection}
                                isMenuSticky={isMenuSticky}
                            />
                        </div>
                    </aside>

                    {/* Content Sections */}
                    <main className="flex-1 max-w-4xl space-y-24">
                        {sectionsConfig.map(({ id, Component }) => (
                            <Component key={id} id={id} />
                        ))}
                    </main>
                </div>
            </div>

            <style>{`
                .scroll-mt-32 {
                    scroll-margin-top: 130px;
                }
                @media (max-width: 768px) {
                    .scroll-mt-32 {
                        scroll-margin-top: 100px;
                    }
                }
            `}</style>
        </PublicLayout>
    );
};

export default AboutInfo;
