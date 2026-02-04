import React, { useState, useEffect } from 'react'; // Re-added imports explicitly just in case, though usually Layout/Inertia handles some
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react'; // Add router import
import PageHeader from '@/Components/Common/PageHeader';
import { useLanguage } from '@/hooks/useLanguage';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string;
    published_at: string;
    category: {
        name: string;
        slug: string;
    };
    user: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    articles: {
        data: Article[];
        links: PaginationLink[];
        next_page_url: string | null;
        prev_page_url: string | null;
    };
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Index({ articles, categories, filters }: Props) {
    const { t, locale } = useLanguage();
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(route('articles.index', { locale }), { 
                    search: search,
                    category: selectedCategory !== 'all' ? selectedCategory : undefined
                }, {
                    preserveState: true,
                    replace: true
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);
        router.get(route('articles.index', { locale }), { 
            search: search || undefined,
            category: category !== 'all' ? category : undefined
        }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <PublicLayout>
            <Head title="Pusat Pengetahuan Sipil" />

            <PageHeader 
                title="Pusat Pengetahuan Sipil" 
                breadcrumbs={[
                    { label: 'Beranda', href: route('home', { locale }) },
                    { label: 'Artikel' }
                ]}
                backgroundImage="/images/projects/project-1.jpg" // Using a generic project image as placeholder
            />

            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Filter Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="w-full md:w-1/3">
                             <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <svg 
                                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white"
                            >
                                <option value="all">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Articles Grid */}
                    {articles.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.data.map((article) => (
                                <article 
                                    key={article.id} 
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full group"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img 
                                            src={article.thumbnail} 
                                            alt={article.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                                                {article.category.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                                            <span>
                                                {new Date(article.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                           <Link 
                                            href="#" /* Will link to detail later */
                                            className="focus:outline-none"
                                           >
                                                {article.title}
                                            </Link>
                                        </h3>
                                        
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                                            {article.excerpt}
                                        </p>

                                        <div className="pt-4 border-t border-gray-100 mt-auto">
                                            <Link 
                                                href="#" /* Will link to detail later */ 
                                                className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
                                            >
                                                Baca Selengkapnya
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada artikel ditemukan</h3>
                            <p className="mt-1 text-sm text-gray-500">Coba ubah kata kunci pencarian atau filter kategori.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {articles.links.length > 3 && (
                        <div className="mt-12 flex justify-center">
                            <div className="flex space-x-1">
                                {articles.links.map((link, i) => (
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-4 py-2 text-sm rounded-md transition-colors ${
                                                link.active 
                                                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-600 border border-gray-200'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            className="px-4 py-2 text-sm rounded-md bg-gray-50 text-gray-400 border border-transparent cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
