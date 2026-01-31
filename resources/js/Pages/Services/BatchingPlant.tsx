import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function BatchingPlant() {
    return (
        <PublicLayout 
            title="Batching Plant - JKK"
            // Automatic header will kick in, title -> "Batching Plant"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    Layanan beton siap pakai (Readymix) berkualitas tinggi untuk kebutuhan konstruksi Anda.
                </p>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Keunggulan Kami</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <li className="flex items-center gap-2">
                             <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                             Kualitas beton terjamin sesuai standar SNI
                        </li>
                        <li className="flex items-center gap-2">
                             <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                             Pengiriman tepat waktu
                        </li>
                        <li className="flex items-center gap-2">
                             <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                             Kapasitas produksi besar
                        </li>
                        <li className="flex items-center gap-2">
                             <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                             Didukung armada truck mixer yang memadai
                        </li>
                    </ul>
                </div>
            </div>
        </PublicLayout>
    );
}
