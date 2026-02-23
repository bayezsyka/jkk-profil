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

    if (!articles || articles.length === 0) return null;

    const displayArticles = articles.slice(0, 3);
    const featuredArticle = displayArticles[0];
    const sideArticles = displayArticles.slice(1);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <section className="py-10 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-12">
                    <div>
                        <p className="text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5">
                            {t('articles.blog')}
                        </p>
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                            {t('articles.latest_articles')}
                        </h2>
                        <p className="text-slate-500 mt-1 md:mt-2 max-w-xl text-xs md:text-base hidden md:block">
                            {t('articles.latest_articles_desc')}
                        </p>
                    </div>
                    <Link
                        href={`/${locale}/artikel`}
                        className="mt-2 md:mt-0 inline-flex items-center text-primary font-semibold text-xs md:text-sm hover:underline group"
                    >
                        {t('common.viewAll')} {t('nav.articles')}
                        <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Mobile: stacked list / Desktop: featured + side */}
                {/* Featured Article — on mobile shown compact, on desktop shown large */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5">
                    {featuredArticle && (
                        <Link
                            href={`/${locale}/artikel/${featuredArticle.slug}`}
                            className="group bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="relative aspect-[16/9] md:aspect-[16/10] overflow-hidden bg-slate-100">
                                {featuredArticle.thumbnail ? (
                                    <img
                                        src={featuredArticle.thumbnail}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                )}
                                {featuredArticle.category && (
                                    <span className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 bg-primary text-white text-[10px] md:text-xs font-medium rounded-md">
                                        {featuredArticle.category.name}
                                    </span>
                                )}
                            </div>
                            <div className="p-3 md:p-5">
                                <div className="flex items-center text-slate-400 text-[10px] md:text-xs gap-2 md:gap-3 mb-1 md:mb-2">
                                    <span>{formatDate(featuredArticle.published_at)}</span>
                                    <span className="flex items-center gap-0.5">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {featuredArticle.views}
                                    </span>
                                </div>
                                <h3 className="text-sm md:text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                    {featuredArticle.title}
                                </h3>
                                {featuredArticle.excerpt && (
                                    <p className="text-slate-500 text-xs md:text-sm line-clamp-2 mt-1 hidden md:block">
                                        {featuredArticle.excerpt}
                                    </p>
                                )}
                            </div>
                        </Link>
                    )}

                    {/* Side Articles */}
                    <div className="flex flex-col gap-3">
                        {sideArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/${locale}/artikel/${article.slug}`}
                                className="group flex bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-24 sm:w-32 md:w-40 flex-shrink-0 overflow-hidden bg-slate-100">
                                    {article.thumbnail ? (
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-3 md:p-4 flex flex-col justify-center min-w-0">
                                    {article.category && (
                                        <span className="text-primary text-[10px] md:text-xs font-semibold mb-0.5 md:mb-1">
                                            {article.category.name}
                                        </span>
                                    )}
                                    <h3 className="text-xs md:text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center text-slate-400 text-[10px] md:text-xs gap-2 mt-1">
                                        <span>{formatDate(article.published_at)}</span>
                                        <span className="flex items-center gap-0.5">
                                            <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {article.views}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestArticlesSection;
