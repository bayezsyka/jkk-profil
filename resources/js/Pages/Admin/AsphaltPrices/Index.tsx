import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface AsphaltPrice {
    id: number;
    name: string;
    price_loco: number;
    price_tergelar: number;
    unit: string;
    description: string | null;
    order: number;
}

interface PageProps {
    prices: AsphaltPrice[];
}

export default function AsphaltPriceIndex({ prices }: PageProps) {
    const [editingPrice, setEditingPrice] = useState<AsphaltPrice | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        price_loco: 0,
        price_tergelar: 0,
        description: '',
    });

    const openEditModal = (price: AsphaltPrice) => {
        setEditingPrice(price);
        setData({
            price_loco: price.price_loco,
            price_tergelar: price.price_tergelar,
            description: price.description || '',
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingPrice) {
            put(route('admin.asphalt-prices.update', editingPrice.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingPrice(null);
                    reset();
                },
            });
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AdminLayout>
            <Head title="Kelola Harga Aspa" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Harga Aspal (Hotmix)</h1>
                    <p className="text-sm text-gray-500">Kelola daftar harga aspal untuk kalkulator.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Jenis Hotmix</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Harga Loco / Di AMP</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Harga Tergelar</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Satuan</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {prices.map((price) => (
                                <tr key={price.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-blue-500 transition-all">
                                        {price.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-blue-600">
                                        {formatCurrency(price.price_loco)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600">
                                        {formatCurrency(price.price_tergelar)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        Per {price.unit}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => openEditModal(price)}
                                            className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            Edit Harga
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && editingPrice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">
                                Edit Harga: {editingPrice.name}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Harga Loco (Rp)</label>
                                <input
                                    type="number"
                                    value={data.price_loco}
                                    onChange={(e) => setData('price_loco', Number(e.target.value))}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-medium"
                                    placeholder="Harga Loco..."
                                    required
                                    min="0"
                                />
                                {errors.price_loco && <p className="text-red-500 text-xs mt-1">{errors.price_loco}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Harga Tergelar (Rp)</label>
                                <input
                                    type="number"
                                    value={data.price_tergelar}
                                    onChange={(e) => setData('price_tergelar', Number(e.target.value))}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-medium"
                                    placeholder="Harga Tergelar..."
                                    required
                                    min="0"
                                />
                                {errors.price_tergelar && <p className="text-red-500 text-xs mt-1">{errors.price_tergelar}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Keterangan (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    placeholder="Contoh: Promo..."
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm disabled:opacity-50 shadow-lg shadow-blue-200"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
