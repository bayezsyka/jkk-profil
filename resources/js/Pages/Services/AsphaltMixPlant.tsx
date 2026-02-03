import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import ServiceGallery from '@/Components/ServiceGallery';

interface Props {
    projects: any[];
}

export default function AsphaltMixPlant({ projects }: Props) {
    const { t } = useLanguage();

    return (
        <PublicLayout 
            title={`${t('services.asphalt.title')} - JKK`}
            headerTitle={t('services.asphalt.title')}
        >
            <ServiceGallery projects={projects} />
        </PublicLayout>
    );
}
