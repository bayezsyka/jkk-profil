import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Modal from '@/Components/UI/Modal';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    articles_count: number;
}

export default function Index({ categories }: { categories: { data: Category[], links: any[] } }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: ''
    });

    const openCreateModal = () => {
        setEditingCategory(null);
        setData({ name: '', description: '' });
        clearErrors();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setData({ name: category.name, description: category.description || '' });
        clearErrors();
        setIsCreateModalOpen(true);
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setEditingCategory(null);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('admin.categories.update', editingCategory.id), {
                onSuccess: () => closeModal()
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => closeModal()
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Categories" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Slug</th>
                            <th className="px-6 py-4">Articles</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.data.length > 0 ? (
                            categories.data.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{category.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                            {category.articles_count}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button 
                                            onClick={() => openEditModal(category)}
                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(category.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination if needed */}
            
            {/* Create/Edit Modal */}
            <Modal show={isCreateModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingCategory ? 'Edit Category' : 'Create New Category'}
                    </h2>
                    
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input 
                                type="text" 
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="e.g. Tips Konstruksi"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                rows={3}
                                placeholder="Short description..."
                            />
                             {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button 
                                type="button" 
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AdminLayout>
    );
}
