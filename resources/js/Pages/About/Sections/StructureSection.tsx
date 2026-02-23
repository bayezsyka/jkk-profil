import React, { useLayoutEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { OrgChart } from 'd3-org-chart';

const StructureSection: React.FC<{ id: string; data?: any[] }> = ({ id, data: rawData }) => {
    const { t } = useLanguage();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);

    const chartData = (rawData || []).map(member => ({
        id: member.id.toString(),
        parentId: member.parent_id ? member.parent_id.toString() : null,
        name: member.name,
        role: member.role.startsWith('about.structure.roles.') ? t(member.role) : member.role,
        image: member.photo_path ? `/storage/${member.photo_path}` : null,
    }));

    // Handle multiple roots to prevent d3-org-chart error
    const roots = chartData.filter(node => !node.parentId);
    if (roots.length > 1) {
        const virtualRootId = 'virtual-root';
        chartData.push({
            id: virtualRootId,
            parentId: null,
            name: 'PT. JAYA KARYA KONTRUKSI',
            role: 'Struktur Organisasi',
            image: null
        } as any);
        
        roots.forEach(root => {
            root.parentId = virtualRootId;
        });
    }

    useLayoutEffect(() => {
        if (chartContainerRef.current && !chartRef.current) {
            const isMobile = window.innerWidth < 768;

            chartRef.current = new OrgChart()
                .container(chartContainerRef.current)
                .data(chartData)
                .nodeWidth((d: any) => 220)
                .nodeHeight((d: any) => 90)
                .childrenMargin((d: any) => 50)
                .compactMarginBetween((d: any) => 35)
                .compactMarginPair((d: any) => 30)
                .compact(isMobile) // Enable compact mode on mobile for vertical layout
                .nodeContent((d: any) => {
                    return `
                        <div style="
                            background: white;
                            border: 2px solid #1e3a5f;
                            border-radius: 12px;
                            padding: 12px;
                            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            transition: all 0.3s;
                        ">
                            <div style="width: 100%; min-width: 0;">
                                <div style="
                                    color: #1e3a5f;
                                    font-weight: 800;
                                    font-size: 14px;
                                    margin-bottom: 4px;
                                    text-transform: uppercase;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                ">${d.data.name}</div>
                                <div style="
                                    color: #64748b;
                                    font-size: 11px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">${d.data.role}</div>
                            </div>
                        </div>
                    `;
                })
                .render();

                // Call fit with a small delay to ensure container is ready
                setTimeout(() => {
                    chartRef.current?.fit();
                }, 100);

                const handleResize = () => {
                    const isNowMobile = window.innerWidth < 768;
                    chartRef.current
                        ?.compact(isNowMobile)
                        ?.render()
                        ?.fit();
                };

                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
        }
    }, []);    return (
        <section id={id} className="scroll-mt-32">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">{t('about.structure.title')}</h2>
                    <div className="w-20 h-1 bg-[#1e3a5f] mx-auto mt-4 rounded-full"></div>
                </div>
                
                <div className="relative bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
                    <div ref={chartContainerRef} className="min-h-[600px] w-full cursor-grab active:cursor-grabbing" />
                    
                    {/* Controls Overlay */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                         <button 
                            onClick={() => chartRef.current?.fit()}
                            className="p-3 bg-white border border-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors text-[#1e3a5f] font-bold text-xs"
                         >
                            {t('about.structure.fit')}
                         </button>
                    </div>
                </div>

                <div className="mt-8 flex justify-center items-center gap-4 text-gray-400 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {t('about.structure.zoom')}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {t('about.structure.pan')}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {t('about.structure.expand')}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StructureSection;
