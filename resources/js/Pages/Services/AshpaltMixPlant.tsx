import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function AshpaltMixPlant() {
    return (
        <PublicLayout 
            title="Asphalt Mixing Plant - JKK"
             // Automatic header will kick in, title -> "Asphalt Mixing Plant"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    Produksi aspal hotmix berkualitas tinggi untuk pembangunan jalan dan infrastruktur.
                </p>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Layanan Kami</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Kami menyediakan berbagai jenis campuran aspal seperti AC-WC, AC-BC, AC-Base, dan HRS dengan kualitas terbaik. 
                        Didukung oleh peralatan teknologi terkini dan tim ahli berpengalaman untuk memastikan setiap produk memenuhi standar teknis jalan raya.
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
}
