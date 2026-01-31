import React from 'react';

const HistorySection: React.FC<{ id: string }> = ({ id }) => {
    const historyItems = [
        { year: '2010', event: 'Pendirian perusahaan sebagai CV kecil di bidang pekerjaan sipil.' },
        { year: '2015', event: 'Transformasi menjadi PT dan ekspansi ke layanan pengadaan material beton.' },
        { year: '2018', event: 'Peresmian unit Batching Plant modern pertama dengan kapasitas besar.' },
        { year: '2022', event: 'Akuisisi unit Asphalt Mixing Plant terbaru untuk mendukung proyek perkerasan jalan.' }
    ];

    return (
        <section id={id} className="scroll-mt-32">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Sejarah Singkat</h2>
                    <div className="w-16 h-1 bg-[#1e3a5f] mb-6 rounded-full"></div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Perjalanan kami dimulai dari tekad untuk berkontribusi dalam pembangunan daerah hingga kini menjangkau proyek-proyek strategis nasional.
                    </p>
                </div>
                <div className="md:w-2/3 space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    {historyItems.map((item, idx) => (
                        <div key={idx} className="relative pl-12">
                            <div className="absolute left-[0.2rem] top-1 w-6 h-6 bg-[#1e3a5f] border-4 border-white rounded-full shadow-sm"></div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">{item.year}</div>
                            <p className="text-gray-700 text-lg">{item.event}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HistorySection;
