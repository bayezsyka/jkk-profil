import React, { useState, useEffect } from 'react';
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
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                            Estimasi Biaya
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Kalkulator Harga Beton
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Hitung estimasi biaya kebutuhan beton Anda dengan mudah. Pilih mutu beton dan masukkan volume yang dibutuhkan.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Input Section */}
                    <motion.div 
                        className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative z-20"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">1</span>
                            Parameter Pesanan
                        </h3>

                        <div className="space-y-6">
                            {/* Concrete Type Selection */}
                            <div className="relative z-30">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mutu Beton</label>
                                <Listbox value={selectedType} onChange={setSelectedType}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-pointer bg-white py-3.5 pl-4 pr-10 text-left rounded-xl border-2 border-slate-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all sm:text-sm shadow-sm hover:border-slate-300">
                                            <span className="block truncate font-medium text-slate-900">{selectedType.name}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-400">
                                                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Listbox.Button>
                                        <AnimatePresence>
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                                                {prices.map((type, typeIdx) => (
                                                    <Listbox.Option
                                                        key={typeIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                                                active ? 'bg-primary/5 text-primary' : 'text-slate-900'
                                                            }`
                                                        }
                                                        value={type}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${
                                                                        selected ? 'font-bold' : 'font-normal'
                                                                    }`}
                                                                >
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
                                    Volume (m³)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        className="block w-full rounded-xl border-2 border-slate-200 py-3.5 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all sm:text-sm font-medium"
                                        placeholder="0.0"
                                        value={volume}
                                        onChange={(e) => setVolume(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-slate-500 sm:text-sm font-bold bg-slate-100 px-2 py-1 rounded">m³</span>
                                    </div>
                                </div>
                            </div>

                            {/* PPN Toggle */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-900">Include PPN 11%</span>
                                    <span className="text-xs text-slate-500">Tambahkan pajak pertambahan nilai</span>
                                </div>
                                <Switch
                                    checked={includePPN}
                                    onChange={setIncludePPN}
                                    className={`${
                                        includePPN ? 'bg-primary' : 'bg-slate-300'
                                    } relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                                >
                                    <span
                                        className={`${
                                            includePPN ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                            </div>

                            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                <p className="text-xs text-yellow-800 leading-relaxed">
                                    <strong>Catatan:</strong> Harga tidak termasuk sewa Concrete Pump. Harga sudah termasuk pengiriman dalam radius 25 Km.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Result Section */}
                    <motion.div 
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-slate-900 text-white rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
                            {/* Decorative blurred circles on dark card */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <h3 className="text-xl font-bold text-white mb-8 flex items-center relative z-10">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-sm">2</span>
                                Estimasi Biaya
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center py-4 border-b border-white/10">
                                    <span className="text-slate-400">Harga Satuan ({selectedType.name})</span>
                                    <span className="text-xl font-semibold tracking-wide">
                                        {formatCurrency(result.basePrice)}
                                        <span className="text-sm text-slate-500 font-normal ml-1">/m³</span>
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 border-b border-white/10">
                                    <span className="text-slate-400">Volume</span>
                                    <span className="text-xl font-semibold tracking-wide">
                                        {volume === '' ? 0 : volume}
                                        <span className="text-sm text-slate-500 font-normal ml-1">m³</span>
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 border-b border-white/10">
                                    <span className="text-slate-400">Subtotal</span>
                                    <span className="text-xl font-semibold tracking-wide">{formatCurrency(result.subtotal)}</span>
                                </div>

                                <AnimatePresence>
                                    {includePPN && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex justify-between items-center py-4 border-b border-white/10">
                                                <span className="text-slate-400">PPN (11%)</span>
                                                <span className="text-xl font-semibold text-primary-300 tracking-wide">
                                                    + {formatCurrency(result.ppn)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="pt-4 mt-4">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-2">
                                        <span className="text-lg text-slate-300 font-medium">Total Estimasi</span>
                                        <motion.span 
                                            key={result.total}
                                            initial={{ scale: 0.9, opacity: 0.5 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-4xl md:text-5xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
                                        >
                                            {formatCurrency(result.total)}
                                        </motion.span>
                                    </div>
                                    <p className="text-right text-xs text-slate-500 mt-2">
                                        *Harga dapat berubah sewaktu-waktu tanpa pemberitahuan
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-10">
                                <button className="w-full bg-primary hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center group">
                                    Hubungi Sales Sekarang
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
