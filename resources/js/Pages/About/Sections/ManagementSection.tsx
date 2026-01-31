import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const ManagementSection: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useLanguage();

    const managers = [
        { name: 'Ir. H. Sudirman', role: t('about.management.roles.ceo'), img: 'https://i.pravatar.cc/300?img=11' },
        { name: 'Agung Wijaya, S.T.', role: t('about.management.roles.coo'), img: 'https://i.pravatar.cc/300?img=12' },
        { name: 'Sari Permata, M.M.', role: t('about.management.roles.cfo'), img: 'https://i.pravatar.cc/300?img=5' }
    ];

    return (
        <section id={id} className="scroll-mt-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">{t('about.management.title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {managers.map((person, idx) => (
                    <div key={idx} className="text-center group">
                        <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
                            <img src={person.img} alt={person.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a5f]">{person.name}</h3>
                        <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mt-1">{person.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManagementSection;
