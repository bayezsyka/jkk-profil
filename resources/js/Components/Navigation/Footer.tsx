import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

const Footer: React.FC = () => {
    const { company } = usePage<PageProps>().props;
    const { locale, t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <footer>
            {/* Main Footer */}
            <div
                style={{
                    background: 'linear-gradient(180deg, #6B7FA6 0%, #5E7198 100%)',
                    color: '#fdfdfe',
                    padding: isMobile ? '24px 16px 20px' : isTablet ? '32px 24px 28px' : '48px 32px 42px',
                    position: 'relative',
                }}
            >
                {/* Subtle Top Divider */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: 'rgba(253,253,254,0.15)',
                    }}
                />

                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: isMobile || isTablet ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: isMobile || isTablet ? 'center' : 'center',
                        gap: isMobile ? '20px' : isTablet ? '24px' : '36px',
                        textAlign: isMobile || isTablet ? 'center' : 'left',
                    }}
                >
                    {/* Company Info */}
                    <div style={{ 
                        flex: isMobile || isTablet ? 'unset' : '1.3',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile || isTablet ? 'center' : 'flex-start',
                    }}>
                        <h3
                            style={{
                                fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                                fontWeight: 800,
                                margin: isMobile ? '0 0 8px 0' : '0 0 14px 0',
                                letterSpacing: '0.4px',
                            }}
                        >
                            {t('footer.company')}
                        </h3>

                        <div
                            style={{
                                width: isMobile ? '32px' : '44px',
                                height: isMobile ? '2px' : '3px',
                                backgroundColor: 'rgba(253,253,254,0.35)',
                                marginBottom: isMobile ? '10px' : '18px',
                                borderRadius: '2px',
                            }}
                        />

                        <p
                            style={{
                                fontSize: isMobile ? '12px' : '14px',
                                color: 'rgba(253,253,254,0.9)',
                                lineHeight: 1.6,
                                margin: 0,
                                maxWidth: isMobile ? '100%' : '540px',
                            }}
                        >
                            {company.address}
                        </p>
                    </div>

                    {/* CTA */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: isMobile || isTablet ? 'center' : 'flex-end',
                            alignItems: 'center',
                            flex: isMobile || isTablet ? 'unset' : '1',
                        }}
                    >
                        <a
                            href={`/${locale}/kontak-kami`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: isMobile ? '6px' : '10px',
                                backgroundColor: '#FDFDFE',
                                color: '#4A5B7C',
                                textDecoration: 'none',
                                fontSize: isMobile ? '12px' : '14px',
                                fontWeight: 700,
                                padding: isMobile ? '10px 18px' : isTablet ? '12px 22px' : '14px 26px',
                                borderRadius: '9999px',
                                boxShadow: '0 12px 26px rgba(0,0,0,0.18)',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow =
                                    '0 16px 34px rgba(0,0,0,0.22)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow =
                                    '0 12px 26px rgba(0,0,0,0.18)';
                            }}
                        >
                            {t('topbar.contact')}
                            <svg
                                width={isMobile ? "14" : "18"}
                                height={isMobile ? "14" : "18"}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    backgroundColor: '#4B5C80',
                    padding: isMobile ? '10px 16px' : '14px 32px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: isMobile ? '10px' : '12px',
                            color: 'rgba(253,253,254,0.75)',
                            margin: 0,
                            textAlign: 'center',
                        }}
                    >
                        © {currentYear} {t('footer.company')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
