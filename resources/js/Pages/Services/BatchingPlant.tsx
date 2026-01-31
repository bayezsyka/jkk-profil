import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';

export default function BatchingPlant() {
    const { t } = useLanguage();

    const strengths = [
        t('services.batching.strengths.0'),
        t('services.batching.strengths.1'),
        t('services.batching.strengths.2'),
        t('services.batching.strengths.3'),
    ];

    return (
        <PublicLayout 
            title={`${t('services.batching.title')} - JKK`}
            headerTitle={t('services.batching.title')}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    {t('services.batching.page_desc')}
                </p>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('services.batching.strengths_title')}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        {strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {strength}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PublicLayout>
    );
}
