import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

interface Translations {
    [key: string]: {
        id: string;
        en: string;
    };
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Translations = {
    // Navigation
    'nav.about': { id: 'TENTANG KAMI', en: 'ABOUT US' },
    'nav.about.profile': { id: 'Profil Perusahaan', en: 'Company Profile' },
    'nav.about.vision': { id: 'Visi & Misi', en: 'Vision & Mission' },
    'nav.about.structure': { id: 'Struktur Organisasi', en: 'Organization Structure' },
    'nav.about.certification': { id: 'Sertifikasi', en: 'Certifications' },
    'nav.services': { id: 'LAYANAN KAMI', en: 'OUR SERVICES' },
    'nav.services.construction': { id: 'Konstruksi Bangunan', en: 'Building Construction' },
    'nav.services.infrastructure': { id: 'Infrastruktur', en: 'Infrastructure' },
    'nav.services.renovation': { id: 'Renovasi', en: 'Renovation' },
    'nav.services.consultation': { id: 'Konsultasi', en: 'Consultation' },
    'nav.projects': { id: 'PROJEK', en: 'PROJECTS' },
    'nav.projects.ongoing': { id: 'Projek Berjalan', en: 'Ongoing Projects' },
    'nav.projects.completed': { id: 'Projek Selesai', en: 'Completed Projects' },
    'nav.projects.portfolio': { id: 'Portfolio', en: 'Portfolio' },
    
    // Top Bar
    'topbar.contact': { id: 'Hubungi Kami', en: 'Contact Us' },
    'topbar.search': { id: 'Cari...', en: 'Search...' },
    'topbar.searchBtn': { id: 'Cari', en: 'Search' },
    
    // Splash Screen
    'splash.tagline': { id: 'Membangun Masa Depan Indonesia', en: 'Building the Future of Indonesia' },
    
    // Hero Section
    'hero.title': { id: 'Jaya Karya Kontruksi', en: 'Jaya Karya Kontruksi' },
    'hero.subtitle': { id: 'Membangun Masa Depan - Membangun Infrastruktur Indonesia', en: 'Building the Future - Building Indonesian Infrastructure' },
    'hero.cta.learn': { id: 'Pelajari Lebih Lanjut', en: 'Learn More' },
    'hero.cta.contact': { id: 'Hubungi Kami', en: 'Contact Us' },
    
    // About Section
    'about.title': { id: 'Tentang Kami', en: 'About Us' },
    'about.construction.title': { id: 'Konstruksi Bangunan', en: 'Building Construction' },
    'about.construction.desc': { id: 'Membangun gedung berkualitas tinggi dengan standar internasional dan teknologi terkini.', en: 'Building high-quality buildings with international standards and the latest technology.' },
    'about.infrastructure.title': { id: 'Infrastruktur', en: 'Infrastructure' },
    'about.infrastructure.desc': { id: 'Pengembangan infrastruktur jalan, jembatan, dan fasilitas publik untuk kemajuan bangsa.', en: 'Development of roads, bridges, and public facilities for the nation\'s progress.' },
    'about.energy.title': { id: 'Energi', en: 'Energy' },
    'about.energy.desc': { id: 'Proyek energi terbarukan dan pembangkit listrik untuk masa depan yang berkelanjutan.', en: 'Renewable energy and power plant projects for a sustainable future.' },
    
    // Stats Section
    'stats.years': { id: 'Tahun Pengalaman', en: 'Years of Experience' },
    'stats.projects': { id: 'Proyek Selesai', en: 'Completed Projects' },
    'stats.employees': { id: 'Karyawan', en: 'Employees' },
    'stats.provinces': { id: 'Provinsi', en: 'Provinces' },
    
    // Contact Section
    'contact.title': { id: 'Hubungi Kami', en: 'Contact Us' },
    'contact.desc': { id: 'Siap membantu mewujudkan proyek konstruksi Anda. Hubungi kami untuk konsultasi gratis.', en: 'Ready to help realize your construction project. Contact us for a free consultation.' },
    'contact.phone': { id: 'Telepon', en: 'Phone' },
    'contact.email': { id: 'Email', en: 'Email' },
    
    // Footer
    'footer.copyright': { id: '© 2026 JKK - Jaya Karya Kontruksi. Hak Cipta Dilindungi.', en: '© 2026 JKK - Jaya Karya Kontruksi. All Rights Reserved.' },
    
    // Toast Messages
    'toast.langChanged': { id: 'Bahasa diubah ke Indonesia', en: 'Language changed to English' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('id');

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'id' || saved === 'en')) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        const translation = translations[key];
        if (!translation) return key;
        return translation[language];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
