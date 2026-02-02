import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const ValuesSection: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useLanguage();

    return (
        <section id={id} className="scroll-mt-32">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">{t('about.values.title')}</h2>
                    <p className="text-[#1e3a5f]/60 font-medium uppercase tracking-widest text-sm">{t('about.values.subtitle')}</p>
                    <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full"></div>
                </div>
                
                <div className="p-6 bg-blue-50/50 rounded-2xl">
                    <p className="text-gray-700 text-lg leading-relaxed text-justify italic">
                        "{t('about.values.content')}"
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;
