import React from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

const Footer: React.FC = () => {
    const { company } = usePage<PageProps>().props;
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            {/* Main Footer */}
            <div 
                style={{
                    backgroundColor: '#667BA3',
                    color: '#fdfdfe',
                    padding: '24px 32px 20px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}
                >
                    {/* Top Row - Company Name & Sitemap */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: '#fdfdfe',
                                margin: 0,
                            }}
                        >
                            PT. JAYA KARYA KONTRUKSI
                        </h3>
                        <a
                            href="/sitemap"
                            style={{
                                color: '#fdfdfe',
                                textDecoration: 'none',
                                fontSize: '14px',
                            }}
                        >
                            Sitemap
                        </a>
                    </div>

                    {/* Bottom Row - Address & Contact */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '24px',
                        }}
                    >
                        {/* Address */}
                        <p
                            style={{
                                fontSize: '13px',
                                color: 'rgba(253, 253, 254, 0.85)',
                                margin: 0,
                                maxWidth: '450px',
                                lineHeight: 1.5,
                            }}
                        >
                            {company.address}
                        </p>

                        {/* Contact Info */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '32px',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                href={`tel:${company.phone.replace(/[()\s-]/g, '')}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#fdfdfe',
                                    textDecoration: 'none',
                                    fontSize: '13px',
                                }}
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <span>{company.phone}</span>
                            </a>

                            <a
                                href={`mailto:${company.email_1}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#fdfdfe',
                                    textDecoration: 'none',
                                    fontSize: '13px',
                                }}
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <span>{company.email_1}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    backgroundColor: '#526086',
                    color: '#fdfdfe',
                    padding: '14px 32px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    {/* Copyright */}
                    <p
                        style={{
                            fontSize: '12px',
                            color: 'rgba(253, 253, 254, 0.7)',
                            margin: 0,
                        }}
                    >
                        &copy; {currentYear} PT. JAYA KARYA KONTRUKSI
                    </p>

                    {/* Certification Badges */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        <div
                            style={{
                                padding: '4px 12px',
                                backgroundColor: 'rgba(253, 253, 254, 0.15)',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#fdfdfe',
                            }}
                        >
                            ISO 9001
                        </div>
                        <div
                            style={{
                                padding: '4px 12px',
                                backgroundColor: 'rgba(253, 253, 254, 0.15)',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#fdfdfe',
                            }}
                        >
                            SMK3
                        </div>
                        <div
                            style={{
                                padding: '4px 12px',
                                backgroundColor: 'rgba(253, 253, 254, 0.15)',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#fdfdfe',
                            }}
                        >
                            LPJK
                        </div>
                    </div>

                    {/* Social Media */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <a href="#" style={{ color: 'rgba(253, 253, 254, 0.6)' }}>
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="#" style={{ color: 'rgba(253, 253, 254, 0.6)' }}>
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </a>
                        <a href="#" style={{ color: 'rgba(253, 253, 254, 0.6)' }}>
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
