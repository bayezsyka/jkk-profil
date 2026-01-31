import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';

export default function AsphaltMixPlant() {
    const { t } = useLanguage();

    return (
        <PublicLayout 
            title={`${t('services.asphalt.title')} - JKK`}
            headerTitle={t('services.asphalt.title')}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    {t('services.asphalt.page_desc')}
                </p>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('services.asphalt.services_title')}</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t('services.asphalt.content')}
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
}
