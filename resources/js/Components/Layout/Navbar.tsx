import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MenuItem {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
}

interface NavbarProps {
    isScrolled: boolean;
    topBarVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, topBarVisible }) => {
    const { t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const menuItems: MenuItem[] = [
        {
            label: t('nav.about'),
            children: [
                { label: t('nav.about.profile'), href: '/tentang-kami/profil' },
                { label: t('nav.about.vision'), href: '/tentang-kami/visi-misi' },
                { label: t('nav.about.structure'), href: '/tentang-kami/struktur' },
                { label: t('nav.about.certification'), href: '/tentang-kami/sertifikasi' },
            ],
        },
        {
            label: t('nav.services'),
            children: [
                { label: t('nav.services.construction'), href: '/layanan/konstruksi' },
                { label: t('nav.services.infrastructure'), href: '/layanan/infrastruktur' },
                { label: t('nav.services.renovation'), href: '/layanan/renovasi' },
                { label: t('nav.services.consultation'), href: '/layanan/konsultasi' },
            ],
        },
        {
            label: t('nav.projects'),
            children: [
                { label: t('nav.projects.ongoing'), href: '/projek/berjalan' },
                { label: t('nav.projects.completed'), href: '/projek/selesai' },
                { label: t('nav.projects.portfolio'), href: '/projek/portfolio' },
            ],
        },
    ];

    const handleMouseEnter = (label: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setHoveredMenu(label);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredMenu(null);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    return (
        <nav
            className="navbar"
            style={{
                position: 'fixed',
                top: topBarVisible ? '44px' : '0',
                left: 0,
                right: 0,
                height: '52px',
                backgroundColor: 'white',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                zIndex: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                transition: 'top 0.3s ease, box-shadow 0.2s ease',
                boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
            }}
        >
            {/* Logo */}
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    style={{ 
                        width: '40px', 
                        height: '40px', 
                        objectFit: 'contain'
                    }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0B2B5A', lineHeight: 1.2 }}>JKK</span>
                    <span style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.5px' }}>COMPANY PROFILE</span>
                </div>
            </a>

            {/* Desktop Menu */}
            <div className="navbar-desktop-menu" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                        style={{ position: 'relative' }}
                    >
                        <button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '8px 16px',
                                background: 'none',
                                border: 'none',
                                color: '#171717',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                            }}
                        >
                            {item.label}
                            {item.children && (
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{
                                        transition: 'transform 0.2s',
                                        transform: hoveredMenu === item.label ? 'rotate(180deg)' : 'rotate(0)',
                                    }}
                                >
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
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    padding: '8px 0',
                                    minWidth: '200px',
                                    marginTop: '4px',
                                }}
                            >
                                {item.children.map((child) => (
                                    <a
                                        key={child.href}
                                        href={child.href}
                                        style={{
                                            display: 'block',
                                            padding: '10px 16px',
                                            color: '#171717',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            transition: 'background-color 0.2s, color 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f9fafb';
                                            e.currentTarget.style.color = '#0B2B5A';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#171717';
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

            {/* Mobile Hamburger */}
            <button
                className="navbar-hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                <span
                    style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: '#171717',
                        borderRadius: '1px',
                        transition: 'transform 0.2s, opacity 0.2s',
                        transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                    }}
                />
                <span
                    style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: '#171717',
                        borderRadius: '1px',
                        transition: 'opacity 0.2s',
                        opacity: mobileMenuOpen ? 0 : 1,
                    }}
                />
                <span
                    style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: '#171717',
                        borderRadius: '1px',
                        transition: 'transform 0.2s',
                        transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                    }}
                />
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="navbar-mobile-menu"
                    style={{
                        position: 'absolute',
                        top: '52px',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    }}
                >
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            <button
                                onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.label ? null : item.label)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px 24px',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#171717',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                {item.label}
                                {item.children && (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{
                                            transition: 'transform 0.2s',
                                            transform: expandedMobileMenu === item.label ? 'rotate(180deg)' : 'rotate(0)',
                                        }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>

                            {/* Mobile Submenu */}
                            {item.children && expandedMobileMenu === item.label && (
                                <div style={{ backgroundColor: '#f9fafb' }}>
                                    {item.children.map((child) => (
                                        <a
                                            key={child.href}
                                            href={child.href}
                                            style={{
                                                display: 'block',
                                                padding: '12px 24px 12px 40px',
                                                color: '#171717',
                                                textDecoration: 'none',
                                                fontSize: '13px',
                                                borderBottom: '1px solid rgba(0,0,0,0.05)',
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
            )}
        </nav>
    );
};

export default Navbar;
