import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/Common/ApplicationLogo';
import TopBar from './TopBar'; // Pastikan path import benar

interface MenuItem {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
}

interface NavbarProps {
    onShowToast?: (message: string, type: 'success' | 'info' | 'error') => void;
    className?: string;
    style?: React.CSSProperties;
}

const Navbar: React.FC<NavbarProps> = ({ onShowToast, className, style }) => {
    const { t, locale } = useLanguage();
    const { url } = usePage();

    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Logic Transparansi
    const isHomepage = ['/', '/id', '/en'].includes(url) || url === '/';
    // Transparent hanya jika di homepage DAN belum discroll
    const isTransparent = isHomepage && !isScrolled;

    // Warna Teks: Putih jika transparan, Gelap jika solid/scrolled
    const textColor = isTransparent ? 'white' : '#1f2937';
    // Warna Teks TopBar: Putih jika transparan, agak gelap/muted jika solid
    const topBarColor = isTransparent ? 'rgba(255,255,255,0.9)' : '#526086';

    const menuItems: MenuItem[] = [
        {
            label: t('nav.about'),
            children: [
                { label: t('nav.about.profile'), href: `/${locale}/tentang-kami/profil` },
                { label: t('nav.about.vision'), href: `/${locale}/tentang-kami/visi-misi` },
                { label: t('nav.about.structure'), href: `/${locale}/tentang-kami/struktur` },
                { label: t('nav.about.certification'), href: `/${locale}/tentang-kami/sertifikasi` },
            ],
        },
        {
            label: t('nav.services'),
            children: [
                { label: t('nav.services.construction'), href: `/${locale}/layanan/konstruksi` },
                { label: t('nav.services.infrastructure'), href: `/${locale}/layanan/infrastruktur` },
                { label: t('nav.services.renovation'), href: `/${locale}/layanan/renovasi` },
                { label: t('nav.services.consultation'), href: `/${locale}/layanan/konsultasi` },
            ],
        },
        {
            label: t('nav.projects'),
            children: [
                { label: t('nav.projects.ongoing'), href: `/${locale}/projek/berjalan` },
                { label: t('nav.projects.completed'), href: `/${locale}/projek/selesai` },
                { label: t('nav.projects.portfolio'), href: `/${locale}/projek/portfolio` },
            ],
        },
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${className || ''}`}
            style={{
                backgroundColor: isTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: isTransparent ? 'none' : 'blur(10px)',
                boxShadow: isTransparent ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
                padding: isScrolled ? '10px 32px' : '10px 32px 10px 32px',
                ...style
            }}
        >
            <div
                style={{
                    display: 'grid',
                    // Grid Logic: Kolom 1 (Auto untuk Logo), Kolom 2 (1fr untuk konten kanan)
                    gridTemplateColumns: 'auto 1fr',
                    // Grid Rows: Baris 1 (TopBar), Baris 2 (Navbar)
                    // Jika scrolled, tinggi baris 1 jadi 0px (hilang)
                    gridTemplateRows: isScrolled ? '0px auto' : 'auto auto',
                    gap: isScrolled ? '0px' : '0px 32px', // Hilangkan gap row saat scrolled
                    alignItems: 'center',
                    transition: 'all 0.4s ease',
                }}
            >
                {/* GRID 1: LOGO 
                  Row Span 2 (mengisi tinggi TopBar + Navbar saat di atas)
                */}
                {/* GRID 1: LOGO 
                  Row Span 2 (mengisi tinggi TopBar + Navbar saat di atas)
                */}
                <div 
                    style={{ 
                        gridRow: '1 / span 2', 
                        display: 'flex', 
                        alignItems: 'center',
                        height: '100%',
                        paddingRight: '20px',
                        // borderRight removed as requested
                    }}
                >
                    <a href={`/${locale}`} style={{ display: 'block', transition: 'transform 0.3s' }}>
                        <ApplicationLogo 
                            className="transition-all duration-300"
                            // Logo membesar saat di top (layout grid), mengecil saat scroll
                            style={{ 
                                width: isScrolled ? '45px' : '70px', 
                                height: isScrolled ? '45px' : '70px' 
                            }} 
                        />
                    </a>
                </div>

                {/* GRID 2: TOP BAR 
                  Grid Column start 2
                */}
                <div 
                    style={{ 
                        gridColumn: '2', 
                        overflow: 'hidden', // Penting agar hilang mulus saat height 0
                        opacity: isScrolled ? 0 : 1, // Fade out saat scroll
                        transform: isScrolled ? 'translateY(-10px)' : 'translateY(0)',
                        transition: 'all 0.3s ease',
                    }}
                >
                   <TopBar 
                        onShowToast={onShowToast} 
                        isTransparent={isTransparent}
                        style={{ color: topBarColor }}
                   />
                   {/* Divider line removed as requested */}
                </div>

                {/* GRID 3: NAVBAR MENU 
                  Grid Column start 2
                */}
                <div 
                    style={{ 
                        gridColumn: '2',
                        display: 'flex',
                        justifyContent: 'flex-end', // Menu rata kanan
                        paddingTop: isScrolled ? '0' : '8px', // Sedikit jarak dari TopBar jika tidak scroll
                        transition: 'padding 0.3s ease'
                    }}
                >
                    <div style={{ display: 'flex', gap: '32px' }}>
                        {menuItems.map((item) => (
                            <div
                                key={item.label}
                                onMouseEnter={() => setHoveredMenu(item.label)}
                                onMouseLeave={() => setHoveredMenu(null)}
                                style={{ position: 'relative' }}
                            >
                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 0',
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        color: textColor,
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    {item.label}
                                    {item.children && (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginTop: '2px' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>

                                {/* Dropdown */}
                                {item.children && hoveredMenu === item.label && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0, // Align right agar rapi
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                            padding: '8px 0',
                                            minWidth: '220px',
                                            zIndex: 100,
                                            animation: 'fadeIn 0.2s ease-in-out'
                                        }}
                                    >
                                        {item.children.map((child) => (
                                            <a
                                                key={child.href}
                                                href={child.href}
                                                style={{
                                                    display: 'block',
                                                    padding: '10px 20px',
                                                    color: '#4b5563',
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                    e.currentTarget.style.color = '#1f2937';
                                                    e.currentTarget.style.paddingLeft = '24px'; // Efek geser dikit
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = '#4b5563';
                                                    e.currentTarget.style.paddingLeft = '20px';
                                                }}
                                            >
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Style untuk animasi fadeIn dropdown */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </header>
    );
};

export default Navbar;