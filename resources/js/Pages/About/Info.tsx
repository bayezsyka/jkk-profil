import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { Head } from '@inertiajs/react';
import AboutSubNavbar from './AboutSubNavbar';

// Section Components
import ProfileSection from './Sections/ProfileSection';
import VisionMissionSection from './Sections/VisionMissionSection';
import ValuesSection from './Sections/ValuesSection';
import HistorySection from './Sections/HistorySection';
import ManagementSection from './Sections/ManagementSection';

// Lazy loaded heavy components
const StructureSection = React.lazy(() => import('./Sections/StructureSection'));
const CompanyGallerySection = React.lazy(() => import('./Sections/CompanyGallerySection'));

interface GalleryPhoto {
    id: number;
    image_path: string;
}

const AboutInfo: React.FC<{ organizationMembers: any[]; companyGallery: GalleryPhoto[] }> = ({ organizationMembers, companyGallery }) => {
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
        ...(companyGallery && companyGallery.length > 0
            ? [{ id: 'galeri', label: t('about.company_gallery.title'), Component: CompanyGallerySection }]
            : []),
    ];

    const breadcrumbs = [
        { label: t('nav.about'), href: `/${locale}/tentang-kami` },
        { label: sectionsConfig.find(s => s.id === activeSection)?.label || t('about.profile.title') }
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
        <>
            <Head>
                <title>{`${t('nav.about')} | Pengalaman & Visi`}</title>
                <meta name="description" content="Pelajari profil PT. Jaya Karya Kontruksi (JKK), visi misi, dan dedikasi kami dalam menyediakan layanan konstruksi jalan dan beton berkualitas di Kalimantan Timur." />
                <meta name="keywords" content="profil JKK, tentang PT. Jaya Karya Kontruksi, visi misi konstruksi, kontraktor jalan Kaltim, sejarah perusahaan konstruksi" />
            </Head>
            <PublicLayout
                title={t('nav.about')}
                headerTitle={t('nav.about')}
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
                            <React.Suspense 
                                key={id} 
                                fallback={
                                    <div id={id} className="scroll-mt-32 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-64 flex items-center justify-center">
                                        <div className="w-10 h-10 border-4 border-[#1e3a5f]/20 border-t-[#1e3a5f] rounded-full animate-spin"></div>
                                    </div>
                                }
                            >
                                <Component 
                                    id={id} 
                                    data={id === 'struktur' ? organizationMembers : id === 'galeri' ? companyGallery : undefined} 
                                />
                            </React.Suspense>
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
        </>
    );
};

export default AboutInfo;
