import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import ServiceGallery from '@/Components/ServiceGallery';

interface Props {
    projects: any[]; // Using any[] for simplicity as the full type is in ServiceGallery
}

export default function BatchingPlant({ projects }: Props) {
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
            <ServiceGallery projects={projects} />
        </PublicLayout>
    );
}
