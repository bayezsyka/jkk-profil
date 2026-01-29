import React, { useState } from 'react';
import { useLanguage, Locale } from '@/hooks/useLanguage';

interface TopBarProps {
    isVisible: boolean;
    onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

const TopBar: React.FC<TopBarProps> = ({ isVisible, onShowToast }) => {
    const { locale, setLanguage, t } = useLanguage();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLanguageChange = (lang: Locale) => {
        if (lang !== locale) {
            // Show toast before navigation (will redirect)
            onShowToast(
                lang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English',
                'info'
            );
            // Navigate to language switch route
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

    return (
        <>
            <div
                className="top-bar"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '44px',
                    backgroundColor: 'white',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0 24px',
                    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
            >
                {/* Contact Link - Hidden on mobile */}
                <a
                    href="#contact"
                    className="topbar-contact-link"
                    style={{
                        display: 'none',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#171717',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'color 0.2s',
                    }}
                >
                    <span
                        style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: '#526086',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </span>
                    {t('topbar.contact')}
                </a>

                {/* Divider - Hidden on mobile */}
                <div
                    className="topbar-divider"
                    style={{
                        display: 'none',
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        margin: '0 16px',
                    }}
                />

                {/* Search Button */}
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#526086',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                    }}
                >
                    <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </button>

                {/* Divider */}
                <div
                    style={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        margin: '0 16px',
                    }}
                />

                {/* Language Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={() => handleLanguageChange('id')}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 8px',
                            fontSize: '14px',
                            fontWeight: locale === 'id' ? 700 : 400,
                            color: locale === 'id' ? '#526086' : '#6b7280',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'color 0.2s',
                        }}
                    >
                        ID
                        {locale === 'id' && (
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '16px',
                                    height: '2px',
                                    backgroundColor: '#526086',
                                }}
                            />
                        )}
                    </button>
                    <span style={{ color: '#6b7280' }}>|</span>
                    <button
                        onClick={() => handleLanguageChange('en')}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 8px',
                            fontSize: '14px',
                            fontWeight: locale === 'en' ? 700 : 400,
                            color: locale === 'en' ? '#526086' : '#6b7280',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'color 0.2s',
                        }}
                    >
                        ENG
                        {locale === 'en' && (
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#526086',
                                }}
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* Search Dropdown */}
            {showSearch && (
                <div
                    style={{
                        position: 'fixed',
                        top: '44px',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        zIndex: 49,
                        padding: '12px 24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('topbar.search')}
                            style={{
                                flex: 1,
                                padding: '10px 20px',
                                borderRadius: '9999px',
                                border: '2px solid rgba(0,0,0,0.1)',
                                outline: 'none',
                                fontSize: '14px',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#526086')}
                            onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                            autoFocus
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '9999px',
                                backgroundColor: '#526086',
                                color: 'white',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            {t('topbar.searchBtn')}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default TopBar;
