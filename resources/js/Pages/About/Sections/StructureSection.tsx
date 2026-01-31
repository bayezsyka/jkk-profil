import React from 'react';

const StructureSection: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} className="scroll-mt-32 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Struktur Organisasi</h2>
                <div className="w-20 h-1 bg-[#1e3a5f] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="max-w-4xl mx-auto">
                <p className="text-gray-600 mb-8 text-center text-lg">
                    Organisasi kami dikelola secara profesional dengan pembagian tugas yang jelas untuk memastikan efisiensi dalam setiap operasional proyek.
                </p>
                <div className="w-full aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 group hover:border-[#1e3a5f] transition-colors cursor-pointer">
                    <svg className="w-16 h-16 text-gray-300 group-hover:text-[#1e3a5f] transition-colors mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-gray-400 font-medium group-hover:text-[#1e3a5f]">Klik untuk memperbesar Bagan Struktur Organisasi</span>
                </div>
            </div>
        </section>
    );
};

export default StructureSection;
