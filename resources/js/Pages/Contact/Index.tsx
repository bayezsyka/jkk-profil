import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface ContactPageProps extends PageProps {}

const Contact: React.FC = () => {
    const { t, locale } = useLanguage();
    const { company } = usePage<ContactPageProps>().props;

    const breadcrumbs = [{ label: t('nav.home'), href: route('home', { locale }) }, { label: t('nav.contact') }];

    // Kantor Utama: 6°52'38.8"S 109°04'22.5"E => -6.877444, 109.072917
    // Basecamp    : 6°56'33.7"S 108°55'05.2"E => -6.942694, 108.918111
    const kantorUtamaMapSrc = `https://www.google.com/maps?q=-6.877444,109.072917&z=16&output=embed`;
    const basecampMapSrc = `https://www.google.com/maps?q=-6.942694,108.918111&z=16&output=embed`;

    return (
        <PublicLayout
            title={`${t('contact.title')} - JKK`}
            headerTitle={t('contact.title')}
            breadcrumbs={breadcrumbs}
        >
            <div className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto space-y-10">
                        {/* MAPS */}
                        <div className="space-y-3">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{t('contact.location.title')}</h3>
                                    <p className="text-sm text-gray-500">{t('contact.location.subtitle')}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Kantor Utama */}
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                                        <p className="text-sm font-bold text-gray-800">{t('contact.location.office_label')}</p>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            6°52&apos;38.8&quot;S 109°04&apos;22.5&quot;E
                                        </p>
                                    </div>
                                    <div className="w-full h-[260px] bg-gray-100 relative z-0">
                                        <iframe
                                            src={kantorUtamaMapSrc}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={t('contact.location.office_map_title')}
                                        />
                                    </div>
                                </div>

                                {/* Basecamp */}
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                                        <p className="text-sm font-bold text-gray-800">{t('contact.location.basecamp_label')}</p>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            6°56&apos;33.7&quot;S 108°55&apos;05.2&quot;E
                                        </p>
                                    </div>
                                    <div className="w-full h-[260px] bg-gray-100 relative z-0">
                                        <iframe
                                            src={basecampMapSrc}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={t('contact.location.basecamp_map_title')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KONTAK LAINNYA */}
                        <div className="bg-blue-50/50 p-8 md:p-10 rounded-2xl border border-blue-100">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <h3 className="text-xl font-bold text-[#1e3a8a]">{t('contact.other.title')}</h3>
                                <a
                                    href="https://jayakaryakontruksi.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                                >
                                    jayakaryakontruksi.com
                                </a>
                            </div>

                            <div className="mt-6 h-px bg-blue-100" />

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Alamat */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.office')}</p>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {company?.address || t('contact.address_not_set')}
                                        </p>
                                    </div>
                                </div>

                                {/* Telepon */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.phone')}</p>
                                        <p className="text-gray-600 text-sm">{company?.phone || '(021) 1234-5678'}</p>
                                    </div>
                                </div>

                                {/* Email Kontak */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.email')}</p>
                                        <a
                                            href={`mailto:${company?.email_1 || 'jayakarya24@gmail.com'}`}
                                            className="text-blue-700 hover:text-blue-800 transition-colors text-sm font-semibold"
                                        >
                                            {company?.email_1 || 'jayakarya24@gmail.com'}
                                        </a>
                                    </div>
                                </div>

                                {/* Website */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.website')}</p>
                                        <a
                                            href="https://jayakaryakontruksi.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-700 hover:text-blue-800 transition-colors text-sm font-semibold"
                                        >
                                            jayakaryakontruksi.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NOTE: FORM SUDAH DIBUANG SESUAI PERMINTAAN */}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Contact;
