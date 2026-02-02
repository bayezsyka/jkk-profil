import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const VisionMissionSection: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useLanguage();

    return (
        <section id={id} className="scroll-mt-32">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Vision Card */}
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4 uppercase tracking-wider">{t('about.vision.vision_title')}</h2>
                    <div className="w-12 h-1 bg-[#1e3a5f] mb-6 rounded-full"></div>
                    <p className="text-gray-600 text-lg leading-relaxed text-justify">
                        {t('about.vision.vision_content')}
                    </p>
                </div>

                {/* Mission Card */}
                <div className="bg-[#1e3a5f] p-8 md:p-10 rounded-3xl shadow-xl text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider">{t('about.vision.mission_title')}</h2>
                    <div className="w-12 h-1 bg-white/30 mb-6 rounded-full"></div>
                    <p className="text-white/90 text-lg leading-relaxed text-justify">
                        {t('about.vision.mission_items.0')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VisionMissionSection;
