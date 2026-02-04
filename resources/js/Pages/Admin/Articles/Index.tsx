import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Article {
    id: number;
    title: string;
    category: {
        id: number;
        name: string;
    };
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    views: number;
    created_at: string;
    published_at: string | null;
}

interface Props {
    articles: {
        data: Article[];
        links: any[];
    };
}

export default function Index({ articles }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(route('admin.articles.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Artikel" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Manajemen Artikel</h2>
                    <Link
                        href={route('admin.articles.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Artikel Baru
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dilihat</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articles.data.length > 0 ? (
                                articles.data.map((article) => (
                                    <tr key={article.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                {article.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${article.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 
                                                  article.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-gray-100 text-gray-800'}`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {article.views}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(article.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={route('admin.articles.edit', article.id)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        Tidak ada artikel ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                 {/* Pagination */}
                 {articles.links && articles.links.length > 3 && (
                     <div className="mt-4 flex justify-center space-x-1">
                        {articles.links.map((link, i) => (
                            !link.url ? (
                                <span
                                    key={i}
                                    className="px-3 py-1 border rounded bg-gray-100 text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                     </div>
                 )}
            </div>
        </AdminLayout>
    );
}
