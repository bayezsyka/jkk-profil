import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

const Footer: React.FC = () => {
    const { company } = usePage<PageProps>().props;
    const { locale } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            {/* Main Footer */}
            <div
                style={{
                    background: 'linear-gradient(180deg, #6B7FA6 0%, #5E7198 100%)',
                    color: '#fdfdfe',
                    padding: '48px 32px 42px',
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
                        display: 'grid',
                        gridTemplateColumns: '1.3fr 1fr',
                        gap: '36px',
                    }}
                >
                    {/* Company Info */}
                    <div>
                        <h3
                            style={{
                                fontSize: '18px',
                                fontWeight: 800,
                                margin: '0 0 14px 0',
                                letterSpacing: '0.4px',
                            }}
                        >
                            PT. JAYA KARYA KONTRUKSI
                        </h3>

                        <div
                            style={{
                                width: '44px',
                                height: '3px',
                                backgroundColor: 'rgba(253,253,254,0.35)',
                                marginBottom: '18px',
                                borderRadius: '2px',
                            }}
                        />

                        <p
                            style={{
                                fontSize: '14px',
                                color: 'rgba(253,253,254,0.9)',
                                lineHeight: 1.7,
                                margin: 0,
                                maxWidth: '540px',
                            }}
                        >
                            {company.address}
                        </p>
                    </div>

                    {/* CTA */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <a
                            href={`/${locale}/kontak-kami`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                backgroundColor: '#FDFDFE',
                                color: '#4A5B7C',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 700,
                                padding: '14px 26px',
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
                            Hubungi Kami
                            <svg
                                width="18"
                                height="18"
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
                    padding: '14px 32px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                    }}
                >
                    <p
                        style={{
                            fontSize: '12px',
                            color: 'rgba(253,253,254,0.75)',
                            margin: 0,
                        }}
                    >
                        © {currentYear} PT. JAYA KARYA KONTRUKSI
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
