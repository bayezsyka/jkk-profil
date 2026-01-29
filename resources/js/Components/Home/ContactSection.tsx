import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

const ContactSection: React.FC = () => {
    const { t } = useLanguage();
    const { company } = usePage<PageProps>().props;

    return (
        <section
            id="contact"
            style={{
                padding: '100px 24px',
                background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
            }}
        >
            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 700,
                        color: '#171717',
                        marginBottom: '24px',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {t('contact.title')}
                </h2>

                <p
                    style={{
                        fontSize: '18px',
                        color: '#6b7280',
                        marginBottom: '48px',
                        lineHeight: 1.7,
                    }}
                >
                    {t('contact.desc')}
                </p>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <a
                        href={`tel:${company.phone.replace(/[()\s-]/g, '')}`}
                        className="contact-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            backgroundColor: '#526086',
                            color: 'white',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 20px rgba(82, 96, 134, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#667BA3';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#526086';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        {company.phone}
                    </a>

                    <a
                        href={`mailto:${company.email_1}`}
                        className="contact-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            backgroundColor: 'white',
                            color: '#526086',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '16px',
                            border: '2px solid #526086',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#526086';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#526086';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        {company.email_1}
                    </a>

                    {/* WhatsApp Button */}
                    <a
                        href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                        className="contact-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            backgroundColor: '#25D366',
                            color: 'white',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#128C7E';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#25D366';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        WhatsApp
                    </a>

                    {/* Email 2 Button */}
                    <a
                        href={`mailto:${company.email_2}`}
                        className="contact-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            backgroundColor: 'white',
                            color: '#526086',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '16px',
                            border: '2px solid #526086',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#526086';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#526086';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        {company.email_2}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
