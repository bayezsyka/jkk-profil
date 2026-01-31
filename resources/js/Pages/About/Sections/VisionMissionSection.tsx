import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const VisionMissionSection: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useLanguage();

    const missionItems = [
        t('about.vision.mission_items.0'),
        t('about.vision.mission_items.1'),
        t('about.vision.mission_items.2'),
        t('about.vision.mission_items.3'),
    ];

    return (
        <section id={id} className="scroll-mt-32 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">{t('about.vision.title')}</h2>
                <div className="w-20 h-1 bg-[#1e3a5f] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-[#f8fafc] p-8 rounded-2xl border-l-4 border-blue-600">
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">{t('about.vision.vision_title')}</h3>
                    <p className="text-gray-600 italic text-lg">
                        "{t('about.vision.vision_content')}"
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">{t('about.vision.mission_title')}</h3>
                    <ul className="space-y-4">
                        {missionItems.map((misi, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="w-6 h-6 flex-shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-1">{idx+1}</span>
                                <span className="text-gray-600 text-lg">{misi}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default VisionMissionSection;
