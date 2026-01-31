import React from 'react';

const ValuesSection: React.FC<{ id: string }> = ({ id }) => {
    const values = [
        { title: 'Integritas', desc: 'Kami menjunjung tinggi kejujuran dan etika profesional dalam setiap aspek bisnis kami.', icon: '🛡️' },
        { title: 'Kualitas', desc: 'Memberikan hasil kerja yang melampaui standar industri adalah komitmen tak tergoyahkan kami.', icon: '⭐' },
        { title: 'Kerjasama', desc: 'Kami percaya kekuatan sinergi tim dan kemitraan strategis adalah kunci keberhasilan.', icon: '🤝' }
    ];

    return (
        <section id={id} className="scroll-mt-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Nilai Perusahaan</h2>
                <p className="text-gray-500 mt-2">Pilar utama kesuksesan PT. Jaya Karya Kontruksi</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((nilai, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-blue-900 group hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-4xl mb-4">{nilai.icon}</div>
                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{nilai.title}</h3>
                        <p className="text-gray-600">{nilai.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ValuesSection;
