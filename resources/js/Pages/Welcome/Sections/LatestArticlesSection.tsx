import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

interface Category {
    id: number;
    name: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string | null;
    published_at: string;
    views: number;
    category: Category | null;
}

interface LatestArticlesSectionProps {
    articles: Article[];
}

const LatestArticlesSection: React.FC<LatestArticlesSectionProps> = ({ articles }) => {
    const { t, locale } = useLanguage();

    if (!articles || articles.length === 0) {
        return null;
    }

    const displayArticles = articles.slice(0, 3);
    const featuredArticle = displayArticles[0];
    const sideArticles = displayArticles.slice(1);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
                        {t('articles.blog')}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        {t('articles.latest_articles')}
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        {t('articles.latest_articles_desc')}
                    </p>
                </div>

                {/* Articles Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Featured Article */}
                    {featuredArticle && (
                        <Link
                            href={`/${locale}/artikel/${featuredArticle.slug}`}
                            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-72 md:h-80 overflow-hidden">
                                {featuredArticle.thumbnail ? (
                                    <img
                                        src={featuredArticle.thumbnail}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                                        <svg className="w-20 h-20 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                
                                {/* Category Badge */}
                                {featuredArticle.category && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                                            {featuredArticle.category.name}
                                        </span>
                                    </div>
                                )}

                                {/* Article Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <div className="flex items-center text-white/80 text-sm mb-3 gap-4">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(featuredArticle.published_at)}
                                        </span>
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {featuredArticle.views} {t('articles.views')}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors line-clamp-2">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base line-clamp-2">
                                        {featuredArticle.excerpt}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Side Articles */}
                    <div className="flex flex-col gap-6">
                        {sideArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/${locale}/artikel/${article.slug}`}
                                className="group flex bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-32 md:w-48 flex-shrink-0 overflow-hidden">
                                    {article.thumbnail ? (
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                                    {article.category && (
                                        <span className="text-primary text-xs font-semibold mb-2">
                                            {article.category.name}
                                        </span>
                                    )}
                                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center text-slate-500 text-xs md:text-sm gap-3">
                                        <span>{formatDate(article.published_at)}</span>
                                        <span className="flex items-center">
                                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {article.views}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Empty state for missing articles */}
                        {sideArticles.length === 0 && (
                            <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-2xl p-8">
                                <p className="text-slate-400 text-center">
                                    {t('articles.no_more_articles')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href={`/${locale}/artikel`}
                        className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                        <span>{t('common.viewAll')} {t('nav.articles')}</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestArticlesSection;
