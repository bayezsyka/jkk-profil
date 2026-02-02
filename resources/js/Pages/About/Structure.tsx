import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import StructureSection from './Sections/StructureSection';

const Structure: React.FC<{ organizationMembers: any[] }> = ({ organizationMembers }) => {
    const { t, locale } = useLanguage();

    const breadcrumbs = [
        { label: t('nav.about'), href: `/${locale}/tentang-kami` },
        { label: t('nav.about_structure') }
    ];

    return (
        <PublicLayout
            title={`${t('nav.about_structure')} - JKK`}
            headerTitle={t('nav.about_structure')}
            breadcrumbs={breadcrumbs}
        >
            <div className="container mx-auto px-4 py-12 md:py-20">
                <StructureSection id="struktur" data={organizationMembers} />
            </div>
        </PublicLayout>
    );
};

export default Structure;
