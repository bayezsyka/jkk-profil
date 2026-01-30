import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Locale } from '@/hooks/useLanguage';

interface MenuItem {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
}

interface NavbarProps {
    isScrolled: boolean;
    // topBarVisible no longer needed as logic is internal
    onShowToast?: (message: string, type: 'success' | 'info' | 'error') => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, onShowToast }) => {
    const { t, locale, setLanguage } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- Language & Search Logic (Merged from TopBar) ---
    const handleLanguageChange = (lang: Locale) => {
        if (lang !== locale) {
            if (onShowToast) {
                onShowToast(
                    lang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English',
                    'info'
                );
            }
            setLanguage(lang);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            setSearchQuery('');
            setShowSearch(false);
        }
    };
    // ----------------------------------------------------

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
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredMenu(label);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredMenu(null);
        }, 150);
    };

    return (
        <nav
            className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 40,
                // Top: Transparent to blend with Hero. Scrolled: White compact.
                backgroundColor: isScrolled ? 'white' : 'transparent', 
                backdropFilter: isScrolled ? 'none' : 'none', // Remove blur on top to be clean
                boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
                // Reduced padding for minimal look
                padding: isScrolled ? '8px 24px' : '16px 32px', 
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gridTemplateRows: isScrolled ? 'auto' : 'auto auto',
                gap: isScrolled ? '0' : '4px', // Reduced gap
                alignItems: 'center',
            }}
        >
            {/* AREA 1: LOGO */}
            <div
                style={{
                    gridArea: isScrolled ? '1 / 1 / 2 / 2' : '1 / 1 / 3 / 2',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.4s ease',
                    textDecoration: 'none',
                    // Removed paddingRight and borderRight
                }}
            >
                <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img 
                        src="/images/logo.png" 
                        alt="Logo" 
                        style={{ 
                            // Adjusted size
                            width: isScrolled ? '40px' : '60px', 
                            height: isScrolled ? '40px' : '60px', 
                            objectFit: 'contain',
                            transition: 'all 0.4s ease',
                            filter: isScrolled ? 'none' : 'brightness(0) invert(1)' // Optional: Make logo white on dark hero? Assuming Logo works on dark. If not, remove filter. 
                            // Let's assume standard logo for now. 
                        }} 
                    />
                    {/* Text Removed as requested */}
                </a>
            </div>

            {/* AREA 2: TOP BAR ACTIONS (Info Removed) */}
            <div
                style={{
                    gridArea: '1 / 2 / 2 / 3',
                    justifySelf: 'end',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    opacity: isScrolled ? 0 : 1,
                    height: isScrolled ? 0 : 'auto',
                    overflow: 'hidden',
                    transform: isScrolled ? 'translateY(-10px)' : 'translateY(0)',
                    transition: 'all 0.3s ease',
                    visibility: isScrolled ? 'hidden' : 'visible',
                    paddingBottom: isScrolled ? 0 : '8px',
                    width: '100%',
                    justifyContent: 'flex-end',
                }}
            >
                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                         onClick={() => setShowSearch(!showSearch)}
                         style={{ 
                             background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                             display: 'flex', alignItems: 'center', color: 'white' // White icon on top
                         }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                        <button onClick={() => handleLanguageChange('id')} style={{ color: locale === 'id' ? 'white' : 'rgba(255,255,255,0.6)', border: 'none', background: 'none', cursor: 'pointer' }}>ID</button>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                        <button onClick={() => handleLanguageChange('en')} style={{ color: locale === 'en' ? 'white' : 'rgba(255,255,255,0.6)', border: 'none', background: 'none', cursor: 'pointer' }}>EN</button>
                    </div>
                </div>
            </div>

            {/* AREA 3: NAVBAR MENU */}
            {/* Grid position: Scrolled (Row 1 Col 2) / Top (Row 2 Col 2) */}
            <div
                style={{
                    gridArea: isScrolled ? '1 / 2 / 2 / 3' : '2 / 2 / 3 / 3',
                    justifySelf: 'end',
                    display: 'flex',
                    alignItems: 'center',
                    gap: isScrolled ? '24px' : '32px',
                    transition: 'all 0.4s ease',
                    width: '100%',
                    justifyContent: 'flex-end',
                }}
            >
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
                                padding: '8px 0',
                                background: 'none',
                                border: 'none',
                                // Text color needs to adapt: White on Top (implied dark bg from Hero), Dark on Scrolled
                                color: isScrolled ? '#171717' : 'rgba(255,255,255,0.95)',
                                fontSize: isScrolled ? '14px' : '15px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                            }}
                        >
                            {/* Hover color logic handling via style injection or simpler hover class if CSS allowed, but sticking to inline styles */}
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
                                        marginTop: '2px',
                                        opacity: 0.8
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </button>
                        
                        {/* Dropdown Menu (Consistent) */}
                         {item.children && hoveredMenu === item.label && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0, // Align right for cleaner look on right side
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    padding: '8px 0',
                                    minWidth: '220px',
                                    paddingTop: '8px',
                                    zIndex: 100,
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
                                            e.currentTarget.style.color = '#526086';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#4b5563';
                                        }}
                                    >
                                        {child.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                 ))}

                 <a 
                    href={`/${locale}/kontak-kami`}
                    style={{
                        padding: isScrolled ? '8px 20px' : '10px 24px',
                        backgroundColor: '#526086',
                        color: 'white',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 10px rgba(82, 96, 134, 0.2)',
                    }}
                 >
                    {t('nav.contact')}
                 </a>
            </div>

            {/* Mobile Toggle (Simple position absolute for now, or grid managed) */}
            <div className="mobile-toggle" style={{ display: 'none' }}> {/* Add media query logic via CSS or window width hook later if needed, mostly desktop focus now based on grid request */} </div>
            
            {/* Search Overlay */}
            {showSearch && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }} onClick={() => setShowSearch(false)}>
                    <div 
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'white', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <form onSubmit={handleSearch} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' }}>
                             <input
                                  type="text"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  placeholder={t('topbar.search')}
                                  style={{ flex: 1, padding: '12px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                                  autoFocus
                             />
                             <button type="submit" style={{ padding: '12px 24px', background: '#526086', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }}>Cari</button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
