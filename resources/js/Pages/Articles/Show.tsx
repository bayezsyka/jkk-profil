import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';
import { Navbar, Footer } from '@/Components/Navigation';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail: string;
    published_at: string;
    seo_title: string | null;
    seo_keywords: string | null;
    category: {
        name: string;
        slug: string;
    };
    user: {
        name: string;
    };
    views: number;
}

interface Props {
    article: Article;
    relatedArticles: Article[];
}

// Services icon map helper
const ServiceIcon = ({ type }: { type: string }) => {
    if (type === 'batching') return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    );
    if (type === 'construction') return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
    );
};

export default function Show({ article, relatedArticles }: Props) {
    const { locale, t } = useLanguage();

    const services = [
        {
            id: 1,
            title: t('services.batching.title'),
            description: t('services.batching.desc'),
            type: 'batching',
            route: 'services.batching'
        },
        {
            id: 2,
            title: t('services.contractor.title'),
            description: t('services.contractor.desc'),
            type: 'construction',
            route: 'services.construction'
        },
        {
            id: 3,
            title: t('services.asphalt.title'),
            description: t('services.asphalt.desc'),
            type: 'asphalt',
            route: 'services.asphalt'
        }
    ];

    return (
        <>
            <Head>
                <title>{`${article.seo_title || article.title} | Blog PT. Jaya Karya Kontruksi`}</title>
                <meta name="description" content={article.excerpt || `${article.title}. Baca artikel selengkapnya di website resmi PT. Jaya Karya Kontruksi.`} />
                <meta name="keywords" content={article.seo_keywords || `artikel konstruksi, ${article.title}, JKK blog, berita konstruksi, info batching plant, info AMP`} />
                <meta property="og:title" content={article.seo_title || article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta property="og:image" content={article.thumbnail} />
                <meta property="og:type" content="article" />
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": article.seo_title || article.title,
                            "description": article.excerpt,
                            "image": article.thumbnail ? [article.thumbnail] : [],
                            "datePublished": article.published_at,
                            "dateModified": article.published_at,
                            "author": [{
                                "@type": "Organization",
                                "name": article.user?.name || t('footer.company'),
                                "url": "https://jkk-konstruksi.com"
                            }]
                        })
                    }}
                />
            </Head>

            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Fixed Navbar */}
                <Navbar 
                    forceTransparent={true}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        zIndex: 50
                    }}
                />

                {/* Article Hero Header - Unique Design */}
                <header className="relative w-full min-h-[450px] md:min-h-[500px] flex items-end overflow-hidden">
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(${article.thumbnail})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div 
                        className="absolute inset-0 z-10"
                        style={{
                            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 40%, rgba(15, 23, 42, 0.3) 70%, rgba(15, 23, 42, 0.1) 100%)'
                        }}
                    />

                    {/* Content */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-10 md:pb-14">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
                            <Link href={`/${locale}`} className="hover:text-white transition-colors">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor" 
                                    className="w-4 h-4"
                                >
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                </svg>
                            </Link>
                            <span className="text-gray-500">/</span>
                            <Link href={route('articles.index', { locale })} className="hover:text-white transition-colors">
                                {t('nav.articles')}
                            </Link>
                            <span className="text-gray-500">/</span>
                            <Link 
                                href={route('articles.index', { locale, category: article.category.slug })} 
                                className="hover:text-white transition-colors"
                            >
                                {article.category.name}
                            </Link>
                        </nav>

                        {/* Category Badge */}
                        <Link 
                            href={route('articles.index', { locale, category: article.category.slug })}
                            className="inline-block bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5 hover:bg-blue-500 transition-colors"
                        >
                            {article.category.name}
                        </Link>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl">
                            {article.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300">
                            <span className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    {(article.user.name || 'J')[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-white">{article.user.name || t('footer.company')}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(article.published_at).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {article.views} {t('articles.read')}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-grow">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            
                            {/* Article Content (70%) */}
                            <article className="lg:col-span-8">
                                {/* Content Rendered with Typography Plugin */}
                                <div 
                                    className="prose prose-blue prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 font-sans bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />

                                {/* Share Section */}
                                <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{t('articles.share')}</h4>
                                            <p className="text-sm text-gray-500">{t('articles.share_desc')}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <a 
                                                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                </svg>
                                            </a>
                                            <a 
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                            </a>
                                            <a 
                                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Sidebar (30%) */}
                            <aside className="lg:col-span-4 space-y-6">
                                
                                {/* Sticky Container */}
                                <div className="sticky top-24 space-y-6">
                                    
                                    {/* Our Services Widget */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                            <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                                            {t('services.title')}
                                        </h3>
                                        <div className="space-y-3">
                                            {services.map((service) => (
                                                <Link 
                                                    key={service.id}
                                                    href={route(service.route, { locale })}
                                                    className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all"
                                                >
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        <ServiceIcon type={service.type} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                                                            {service.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Widget */}
                                    <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
                                        {/* Decorative Pattern */}
                                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                            <svg viewBox="0 0 100 100" fill="currentColor">
                                                <circle cx="50" cy="50" r="40" />
                                                <circle cx="80" cy="20" r="20" />
                                            </svg>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-3 text-white relative z-10">{t('articles.cta_title')}</h3>
                                        <p className="text-blue-100 mb-5 text-sm leading-relaxed relative z-10">
                                            {t('articles.cta_desc')}
                                        </p>
                                        <Link 
                                            href={route('contact', { locale })} 
                                            className="relative z-10 block w-full text-center bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                                        >
                                            {t('topbar.contact')}
                                        </Link>
                                    </div>

                                    {/* Popular Articles */}
                                    {relatedArticles.length > 0 && (
                                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                                <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                                                {t('articles.related_popular')}
                                            </h3>
                                            <div className="space-y-4">
                                                {relatedArticles.map((item, index) => (
                                                    <Link 
                                                        key={item.id} 
                                                        href={route('articles.show', { locale, slug: item.slug })}
                                                        className="group flex gap-3 items-start"
                                                    >
                                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                {item.views} {t('articles.read')}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </aside>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
