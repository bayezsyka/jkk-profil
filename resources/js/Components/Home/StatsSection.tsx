import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const StatsSection: React.FC = () => {
    const { t } = useLanguage();

    const stats = [
        { number: '67+', label: t('stats.years') },
        { number: '500+', label: t('stats.projects') },
        { number: '10K+', label: t('stats.employees') },
        { number: '34', label: t('stats.provinces') },
    ];

    return (
        <section
            style={{
                padding: '80px 24px',
                backgroundColor: '#526086',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '40px',
                }}
                className="stats-grid"
            >
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                fontWeight: 700,
                                color: 'white',
                                lineHeight: 1,
                                marginBottom: '8px',
                            }}
                        >
                            {stat.number}
                        </div>
                        <div
                            style={{
                                fontSize: '16px',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontWeight: 500,
                            }}
                        >
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
