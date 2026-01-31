import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Konstruki() {
    return (
        <PublicLayout 
            title="Jasa Konstruksi - JKK"
            // Automatic header will kick in, title -> "Jasa Konstruksi"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    Kontraktor umum terpercaya untuk pembangunan gedung, infrastruktur, dan jalan dengan standar keselamatan dan kualitas tertinggi.
                </p>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Lingkup Layanan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900">Gedung Bertingkat</h3>
                                <p className="text-gray-600 text-sm mt-1">Pembangunan gedung perkantoran, apartemen, dan komersial.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900">Infrastruktur</h3>
                                <p className="text-gray-600 text-sm mt-1">Jalan, jembatan, saluran air, dan fasilitas umum lainnya.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900">Renovasi</h3>
                                <p className="text-gray-600 text-sm mt-1">Layanan perbaikan dan peningkatan kualitas bangunan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
