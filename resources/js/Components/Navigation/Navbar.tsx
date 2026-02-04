import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage, Locale } from '@/hooks/useLanguage';
import { usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/Common/ApplicationLogo';

interface MenuItem {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
}

interface NavbarProps {
    onShowToast?: (message: string, type: 'success' | 'info' | 'error') => void;
    className?: string;
    style?: React.CSSProperties;
    forceTransparent?: boolean;
}

interface TopBarProps {
    onShowToast?: (message: string, type: 'success' | 'info' | 'error') => void;
    className?: string;
    style?: React.CSSProperties;
    isTransparent?: boolean;
    isMobile?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onShowToast, className, style, isTransparent = false, isMobile = false }) => {
    const { locale, setLanguage, t } = useLanguage();

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLanguageChange = (lang: Locale) => {
        if (lang !== locale) {
            setLanguage(lang);
            if (onShowToast) {
                onShowToast(lang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English', 'info');
            }
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // implement sesuai kebutuhan
            setSearchQuery('');
            setShowSearch(false);
        }
    };

    return (
        <div
            className={`top-bar ${className || ''}`}
            style={{
                height: isMobile ? '36px' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0',
                color: 'white',
                fontSize: '0.85rem',
                position: 'relative',
                ...style,
            }}
        >
            {!isMobile && (
                <>
                    <a
                        href={`/${locale}/kontak-kami`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 500,
                            marginRight: '20px',
                            transition: 'opacity 0.2s',
                        }}
                        className="hover:opacity-80"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        {t('nav.contact')}
                    </a>

                    <div
                        style={{
                            width: '1px',
                            height: '12px',
                            backgroundColor: 'currentColor',
                            opacity: 0.3,
                            marginRight: '20px',
                        }}
                    />

                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '20px',
                        }}
                        aria-label="Search"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={() => handleLanguageChange('id')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        fontWeight: locale === 'id' ? 700 : 400,
                        opacity: locale === 'id' ? 1 : 0.6,
                        cursor: 'pointer',
                        fontSize: 'inherit',
                    }}
                >
                    ID
                </button>
                <span style={{ opacity: 0.4 }}>|</span>
                <button
                    onClick={() => handleLanguageChange('en')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        fontWeight: locale === 'en' ? 700 : 400,
                        opacity: locale === 'en' ? 1 : 0.6,
                        cursor: 'pointer',
                        fontSize: 'inherit',
                    }}
                >
                    EN
                </button>
            </div>

            {showSearch && !isMobile && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: 'white',
                        padding: '10px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0 0 8px 8px',
                        zIndex: 60,
                        color: '#374151',
                    }}
                >
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('topbar.search')}
                            className="text-sm border rounded px-2 py-1 outline-none focus:border-blue-500"
                            autoFocus
                        />
                        <button type="submit" className="bg-blue-900 text-white text-xs px-3 py-1 rounded">
                            GO
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

const Navbar: React.FC<NavbarProps> = ({ onShowToast, className, style, forceTransparent }) => {
    const { t, locale, setLanguage } = useLanguage();
    const { url } = usePage();

    const toggleLanguage = (lang: Locale) => {
        if (lang !== locale) {
            setLanguage(lang);
            if (onShowToast) {
                onShowToast(lang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English', 'info');
            }
        }
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1024px)');
        const apply = () => {
            setIsMobile(mq.matches);
            if (!mq.matches) {
                setMobileOpen(false);
                setMobileSearchOpen(false);
            }
        };
        apply();
        mq.addEventListener?.('change', apply);
        return () => mq.removeEventListener?.('change', apply);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        if (mobileOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [mobileOpen, isMobile]);

    const isHomepage = ['/', '/id', '/en'].includes(url) || url === '/';
    const isTransparent = (forceTransparent || isHomepage) && !isScrolled;

    const textColor = isTransparent ? 'white' : '#1f2937';
    const topBarColor = isTransparent ? 'rgba(255,255,255,0.9)' : '#526086';

    const menuItems: MenuItem[] = useMemo(
        () => [
            {
                label: t('nav.about'),
                href: `/${locale}/tentang-kami`,
            },
            {
                label: t('services.batching.title'),
                href: `/${locale}/services/batching-plant`,
            },
            {
                label: t('services.contractor.title'),
                href: `/${locale}/services/construction`,
            },
            {
                label: t('services.asphalt.title'),
                href: `/${locale}/services/asphalt-mixing-plant`,
            },
            {
                label: t('nav.nav_articles'), // Using existing key, or plain text if key missing? Let's use key.
                href: `/${locale}/artikel`,
            },
            {
                label: t('nav.others'),
                children: [
                    { label: t('nav.nav_gallery'), href: `/${locale}/galeri` },
                    { label: t('nav.nav_projects'), href: `/${locale}/projek` },
                ],
            },
        ],
        [t, locale]
    );

    const toggleMobileSection = (label: string) => {
        setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const handleMobileSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobileSearchQuery.trim()) {
            // implement sesuai kebutuhan
            setMobileSearchQuery('');
            setMobileSearchOpen(false);
        }
    };

    return (
        <>
            <header
                className={`fixed w-full z-50 transition-all duration-300 ${className || ''}`}
                style={{
                    backgroundColor: isTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: isTransparent ? 'none' : 'blur(10px)',
                    boxShadow: isTransparent ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
                    padding: isMobile ? '10px 16px' : '10px 0',
                    ...style,
                }}
            >
                {!isMobile ? (
                    <div
                        className="container mx-auto px-4 sm:px-6 lg:px-8"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            gridTemplateRows: isScrolled ? '0px auto' : 'auto auto',
                            gap: isScrolled ? '0px' : '0px 32px',
                            alignItems: 'center',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        <div
                            style={{
                                gridRow: '1 / span 2',
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                paddingRight: '20px',
                            }}
                        >
                            <a href={`/${locale}`} style={{ display: 'block', transition: 'transform 0.3s' }}>
                                <ApplicationLogo
                                    className="transition-all duration-300"
                                    style={{
                                        width: isScrolled ? '45px' : '70px',
                                        height: isScrolled ? '45px' : '70px',
                                    }}
                                />
                            </a>
                        </div>

                        <div
                            style={{
                                gridColumn: '2',
                                overflow: 'hidden',
                                opacity: isScrolled ? 0 : 1,
                                transform: isScrolled ? 'translateY(-10px)' : 'translateY(0)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <TopBar onShowToast={onShowToast} isTransparent={isTransparent} style={{ color: topBarColor }} />
                        </div>

                        <div
                            style={{
                                gridColumn: '2',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingTop: isScrolled ? '0' : '8px',
                                transition: 'padding 0.3s ease',
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
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '8px 0',
                                                    fontSize: '15px',
                                                    fontWeight: 600,
                                                    textDecoration: 'none',
                                                    color: url === item.href ? '#3B82F6' : textColor,
                                                    transition: 'color 0.2s',
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
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
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        style={{ marginTop: '2px' }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                )}
                                            </button>
                                        )}

                                        {item.children && hoveredMenu === item.label && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    right: 0,
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                                    padding: '8px 0',
                                                    minWidth: '220px',
                                                    zIndex: 100,
                                                    animation: 'fadeIn 0.2s ease-in-out',
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
                                                            e.currentTarget.style.paddingLeft = '24px';
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
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                        }}
                    >
                        <a href={`/${locale}`} style={{ display: 'flex', alignItems: 'center' }} aria-label="Home">
                            <ApplicationLogo style={{ width: '42px', height: '42px' }} />
                        </a>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button
                                onClick={() => {
                                    setMobileSearchOpen((v) => !v);
                                    if (!mobileOpen) setMobileOpen(true);
                                }}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: '#0B2D5C',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                aria-label="Search"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={() => setMobileOpen((v) => !v)}
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '999px',
                                    border: '3px solid #0B2D5C',
                                    cursor: 'pointer',
                                    background: mobileOpen ? '#3B82F6' : 'white',
                                    color: mobileOpen ? 'white' : '#0B2D5C',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                }}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            >
                                {mobileOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(5px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </header>

            {isMobile && mobileOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.20)',
                        zIndex: 999,
                    }}
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {isMobile && mobileOpen && (
                <aside
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#ffffff',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        style={{
                            padding: '10px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                        }}
                    >
                        <a href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }} aria-label="Home">
                            <ApplicationLogo style={{ width: '40px', height: '40px' }} />
                        </a>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                                onClick={() => setMobileSearchOpen((v) => !v)}
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: '#0B2D5C',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                aria-label="Search"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '999px',
                                    border: '2px solid #0B2D5C',
                                    cursor: 'pointer',
                                    background: '#3B82F6',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                aria-label="Close menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {mobileSearchOpen && (
                        <div
                            style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                            }}
                        >
                            <form onSubmit={handleMobileSearch} style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="text"
                                    value={mobileSearchQuery}
                                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                                    placeholder={t('topbar.search')}
                                    style={{
                                        flex: 1,
                                        height: '42px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(15, 23, 42, 0.16)',
                                        padding: '0 12px',
                                        fontSize: '14px',
                                        outline: 'none',
                                    }}
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    style={{
                                        height: '42px',
                                        padding: '0 14px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: '#0B2D5C',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        letterSpacing: '0.5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    GO
                                </button>
                            </form>
                        </div>
                    )}

                    <nav
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '10px 0',
                        }}
                    >
                        {menuItems.map((item) => {
                            const expanded = !!mobileExpanded[item.label];
                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() => (item.children ? toggleMobileSection(item.label) : item.href && (window.location.href = item.href))}
                                        style={{
                                            width: '100%',
                                            background: 'none',
                                            border: 'none',
                                            textAlign: 'left',
                                            padding: '14px 18px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            fontSize: '20px',
                                            letterSpacing: '0.5px',
                                            fontWeight: 500,
                                            color: '#0f172a',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <span>{item.label}</span>
                                        {item.children && (
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#0f172a"
                                                    style={{
                                                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.2s ease',
                                                        opacity: 0.9,
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>

                                    {item.children && (
                                        <div
                                            style={{
                                                maxHeight: expanded ? 800 : 0,
                                                overflow: 'hidden',
                                                transition: 'max-height 0.25s ease',
                                            }}
                                        >
                                            <div style={{ padding: '0 18px 10px 18px' }}>
                                                {item.children.map((child) => (
                                                    <a
                                                        key={child.href}
                                                        href={child.href}
                                                        style={{
                                                            display: 'block',
                                                            padding: '10px 2px',
                                                            fontSize: '16px',
                                                            color: '#334155',
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        {child.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ height: '1px', background: 'rgba(15, 23, 42, 0.08)' }} />
                                </div>
                            );
                        })}
                    </nav>

                    <div
                        style={{
                            padding: '14px 16px',
                            borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '14px',
                        }}
                    >


                        <a
                            href={`/${locale}/kontak-kami`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '44px',
                                height: '44px',
                                borderRadius: '999px',
                                textDecoration: 'none',
                                color: '#64748b',
                                border: '1px solid rgba(15, 23, 42, 0.12)',
                            }}
                            aria-label="Contact"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.27 1.05l-2.2 2.2a16 16 0 007.07 7.07l2.2-2.2a1 1 0 011.05-.27l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C10.85 21 3 13.15 3 3.5V5z"
                                />
                            </svg>
                        </a>

                        <div style={{ width: '1px', height: '26px', background: 'rgba(15, 23, 42, 0.12)' }} />

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                borderRadius: '999px',
                                background: 'rgba(2, 132, 199, 0.10)',
                                border: '1px solid rgba(2, 132, 199, 0.18)',
                            }}
                        >
                            <span
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '999px',
                                    background: 'rgba(2, 132, 199, 0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#0ea5e9',
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 15h16.8" />
                                </svg>
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '4px' }}>
                                <button
                                    onClick={() => toggleLanguage('id')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#0B2D5C',
                                        fontWeight: locale === 'id' ? 800 : 400,
                                        opacity: locale === 'id' ? 1 : 0.6,
                                        cursor: 'pointer',
                                        fontSize: 'inherit',
                                    }}
                                >
                                    ID
                                </button>
                                <span style={{ opacity: 0.4, color: '#0B2D5C' }}>|</span>
                                <button
                                    onClick={() => toggleLanguage('en')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#0B2D5C',
                                        fontWeight: locale === 'en' ? 800 : 400,
                                        opacity: locale === 'en' ? 1 : 0.6,
                                        cursor: 'pointer',
                                        fontSize: 'inherit',
                                    }}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'none' }}>
                        <TopBar onShowToast={onShowToast} isTransparent={false} isMobile={true} style={{ color: '#526086' }} />
                    </div>
                </aside>
            )}
        </>
    );
};

export default Navbar;
