import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';
import { Listbox, Switch } from '@headlessui/react';

// Data based on the provided price list
interface ConcreteType {
    id: number | string;
    name: string;
    price: number;
    code?: string;
    description?: string | null;
}

const DEFAULT_CONCRETE_TYPES: ConcreteType[] = [
    { id: 'B.0', name: 'B.0', price: 785000 },
];

interface Props {
    initialPrices?: ConcreteType[];
}

export default function BatchingCalculator({ initialPrices = [] }: Props) {
    const { locale, t } = useLanguage();
    const prices = initialPrices.length > 0 ? initialPrices : DEFAULT_CONCRETE_TYPES;
    const defaultType = prices.find(p => p.name.includes('K-200')) || prices[0];
    const [selectedType, setSelectedType] = useState(defaultType);
    const [volume, setVolume] = useState<number | ''>(1);
    const [includePPN, setIncludePPN] = useState(false);
    
    // Calculation Result State
    const [result, setResult] = useState({
        basePrice: 0,
        subtotal: 0,
        ppn: 0,
        total: 0
    });

    useEffect(() => {
        const vol = volume === '' ? 0 : Number(volume);
        const basePrice = selectedType.price;
        const subtotal = basePrice * vol;
        const ppn = includePPN ? subtotal * 0.11 : 0;
        const total = subtotal + ppn;

        setResult({
            basePrice,
            subtotal,
            ppn,
            total
        });
    }, [selectedType, volume, includePPN]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                        {t('services.calculator.subtitle')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        {t('services.calculator.title')}
                    </h2>
                    <p className="text-slate-600 text-base max-w-xl">
                        {t('services.calculator.description')}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                        {/* Input Section */}
                        <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                                {t('services.calculator.parameter_title')}
                            </h3>

                            <div className="space-y-6">
                                {/* Concrete Type Selection */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('services.calculator.quality_label')}</label>
                                    <Listbox value={selectedType} onChange={setSelectedType}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-pointer bg-slate-50 py-3 pl-4 pr-10 text-left rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm hover:bg-slate-100">
                                                <span className="block truncate font-medium text-slate-900">{selectedType.name}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-400">
                                                        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </Listbox.Button>
                                            <AnimatePresence>
                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                                                    {prices.map((type, typeIdx) => (
                                                        <Listbox.Option
                                                            key={typeIdx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2.5 pl-10 pr-4 ${
                                                                    active ? 'bg-slate-50 text-slate-900' : 'text-slate-700'
                                                                }`
                                                            }
                                                            value={type}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={`block truncate ${selected ? 'font-semibold text-primary' : 'font-normal'}`}>
                                                                        {type.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </AnimatePresence>
                                        </div>
                                    </Listbox>
                                </div>

                                {/* Volume Input */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        {t('services.calculator.volume_label')}
                                    </label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            className="block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-medium"
                                            placeholder="0.0"
                                            value={volume}
                                            onChange={(e) => setVolume(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <span className="text-slate-500 sm:text-sm font-medium">m³</span>
                                        </div>
                                    </div>
                                </div>

                                {/* PPN Toggle */}
                                <div className="flex items-center justify-between py-2 border-t border-slate-100 mt-4 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">{t('services.calculator.vat_label')}</span>
                                    </div>
                                    <Switch
                                        checked={includePPN}
                                        onChange={setIncludePPN}
                                        className={`${
                                            includePPN ? 'bg-primary' : 'bg-slate-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                                    >
                                        <span
                                            className={`${
                                                includePPN ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                </div>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div className="bg-slate-50/50 p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">2</span>
                                    {t('services.calculator.details_title')}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">{t('services.calculator.unit_price')} ({selectedType.name})</span>
                                        <span className="font-medium text-slate-900">
                                            {formatCurrency(result.basePrice)}
                                            <span className="text-slate-400 font-normal ml-1">/m³</span>
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Volume</span>
                                        <span className="font-medium text-slate-900">
                                            {volume === '' ? 0 : volume} m³
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-200">
                                        <span className="text-slate-600">{t('services.calculator.subtotal')}</span>
                                        <span className="font-medium text-slate-900">{formatCurrency(result.subtotal)}</span>
                                    </div>

                                    <AnimatePresence>
                                        {includePPN && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex justify-between items-center text-sm pt-2 text-slate-600">
                                                    <span>{t('services.calculator.vat')}</span>
                                                    <span className="text-slate-900">
                                                        + {formatCurrency(result.ppn)}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mt-8 pt-6 border-t border-slate-200 border-dashed">
                                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('services.calculator.total')}</span>
                                    <span className="text-3xl font-bold text-primary">
                                        {formatCurrency(result.total)}
                                    </span>
                                </div>
                                
                                <div className="text-[10px] text-slate-400 mt-2 text-right space-y-0.5">
                                    <p>{t('services.calculator.note_radius')}</p>
                                    <p>{t('services.calculator.note_pump')}</p>
                                    <p>{t('services.calculator.note_change')}</p>
                                </div>

                                <a 
                                    href={`/${locale}/kontak-kami`}
                                    className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-slate-900/10 flex items-center justify-center"
                                >
                                    {t('services.calculator.order_btn')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
