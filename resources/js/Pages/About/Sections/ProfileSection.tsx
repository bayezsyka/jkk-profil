import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const ProfileSection: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useLanguage();

    return (
        <section id={id} className="scroll-mt-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">{t('about.profile.title')}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {t('about.profile.content1')}
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {t('about.profile.content2')}
                    </p>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <div className="aspect-[4/3] bg-gray-200 animate-pulse">
                         <img 
                            src="https://images.unsplash.com/photo-1541913080-214a6745383d?q=80&w=1000&auto=format&fit=crop" 
                            alt="Company Profile" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                         />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/40 to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
