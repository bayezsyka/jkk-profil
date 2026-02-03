import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import ServiceGallery from '@/Components/ServiceGallery';

interface Props {
    projects: any[];
}

export default function Construction({ projects }: Props) {
    const { t } = useLanguage();

    return (
        <PublicLayout 
            title={`${t('services.contractor.title')} - JKK`}
            headerTitle={t('services.contractor.title')}
        >
            <ServiceGallery projects={projects} />
        </PublicLayout>
    );
}
