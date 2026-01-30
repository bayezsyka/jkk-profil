import React, { useState, useEffect } from 'react';
import { useLanguage, Locale } from '@/hooks/useLanguage';
import { usePage } from '@inertiajs/react';

interface TopBarProps {
    onShowToast?: (message: string, type: 'success' | 'info' | 'error') => void;
    className?: string;
    style?: React.CSSProperties;
    // Kita buat prop ini opsional karena logic warna akan dihandle parent (Navbar)
    isTransparent?: boolean; 
}

const TopBar: React.FC<TopBarProps> = ({ onShowToast, className, style, isTransparent = false }) => {
    const { locale, setLanguage, t } = useLanguage();
    
    // State search lokal
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLanguageChange = (lang: Locale) => {
        if (lang !== locale) {
            setLanguage(lang);
            if (onShowToast) {
                 onShowToast(
                    lang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English',
                    'info'
                );
            }
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

    return (
        <div
            className={`top-bar ${className || ''}`}
            style={{
                height: '40px', // Sedikit diperkecil agar proporsional
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0', // Padding dihandle oleh Grid parent
                color: 'white', // Default text putih (untuk mode transparan)
                fontSize: '0.85rem',
                ...style
            }}
        >
            {/* Contact Link */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('nav.contact')}
            </a>

            {/* Separator */}
            <div style={{ width: '1px', height: '12px', backgroundColor: 'currentColor', opacity: 0.3, marginRight: '20px' }} />

            {/* Search Toggle */}
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
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            {/* Language Switcher */}
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
                        fontSize: 'inherit'
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
                        fontSize: 'inherit'
                    }}
                >
                    EN
                </button>
            </div>

            {/* Search Dropdown Overlay */}
            {showSearch && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    padding: '10px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0 0 8px 8px',
                    zIndex: 60,
                    color: '#374151'
                }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('topbar.search')}
                            className="text-sm border rounded px-2 py-1 outline-none focus:border-blue-500"
                            autoFocus
                        />
                        <button type="submit" className="bg-blue-900 text-white text-xs px-3 py-1 rounded">GO</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TopBar;