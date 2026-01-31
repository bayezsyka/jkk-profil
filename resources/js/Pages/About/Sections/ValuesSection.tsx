import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const ValuesSection: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useLanguage();

    const values = [
        { title: t('about.values.items.0.title'), desc: t('about.values.items.0.desc'), icon: t('about.values.items.0.icon') },
        { title: t('about.values.items.1.title'), desc: t('about.values.items.1.desc'), icon: t('about.values.items.1.icon') },
        { title: t('about.values.items.2.title'), desc: t('about.values.items.2.desc'), icon: t('about.values.items.2.icon') }
    ];

    return (
        <section id={id} className="scroll-mt-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">{t('about.values.title')}</h2>
                <p className="text-gray-500 mt-2">{t('about.values.subtitle')}</p>
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
