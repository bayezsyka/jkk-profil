import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';

const Structure: React.FC = () => {
    const { t } = useLanguage();

    // Define breadcrumbs
    const breadcrumbs = [
        { label: 'Tentang Kami', href: '#' }, // Or a real link if we have an index
        { label: 'Struktur Organisasi' }
    ];

    return (
        <PublicLayout
            title="Struktur Organisasi - JKK"
            headerTitle="Struktur Organisasi"
            breadcrumbs={breadcrumbs}
            // headerImage="/images/structure-bg.jpg" // Optional: Use a specific image
        >
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Structure content goes here. This page demonstrates the automatic layout with the page header.
                    </p>
                    {/* Placeholder for Structure Chart */}
                    <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-gray-400 font-medium">Bagan Struktur Organisasi</span>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Structure;
