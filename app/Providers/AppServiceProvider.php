<?php

namespace App\Providers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        View::composer('app', function ($view) {
            $view->with('seo', $this->buildSeoPayload(request()));
        });
    }

    protected function buildSeoPayload(Request $request): array
    {
        $appUrl = $this->normalizeUrl((string) config('app.url'));
        $currentPath = $request->getPathInfo() ?: '/';
        $currentUrl = $this->buildAbsoluteUrl($appUrl, $currentPath, $request->getQueryString());
        $locale = $request->route('locale') ?: App::getLocale();
        $companyName = 'PT. Jaya Karya Kontruksi';
        $defaultDescription = 'PT Jaya Karya Kontruksi (JKK) - Perusahaan jasa konstruksi, penyedia asphalt mix plant (AMP), dan penyedia beton ready mix berkualitas di Brebes.';
        $defaultKeywords = 'jaya karya kontruksi, jkk, kontraktor jalan, aspal hotmix, ready mix, batching plant, pt jkk, konstruksi brebes';

        $seo = [
            'lang' => str_replace('_', '-', App::getLocale()),
            'title' => config('app.name', 'Jaya Karya Kontruksi'),
            'description' => $defaultDescription,
            'keywords' => $defaultKeywords,
            'robots' => 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
            'canonical' => $currentUrl,
            'alternate_urls' => $this->buildLocalizedUrls($appUrl, $currentPath, $request->getQueryString()),
            'meta' => [],
            'schemas' => [],
        ];

        $routeName = $request->route()?->getName();

        if ($routeName === 'articles.index') {
            $hasFilters = $request->filled('search') || ($request->filled('category') && $request->input('category') !== 'all');
            $baseArticlesUrl = $this->buildAbsoluteUrl($appUrl, "/{$locale}/artikel");

            $seo['title'] = "Artikel | {$companyName}";
            $seo['description'] = 'Kumpulan artikel PT. Jaya Karya Kontruksi seputar jasa konstruksi, batching plant, AMP, dan proyek infrastruktur.';
            $seo['keywords'] = 'artikel konstruksi, blog konstruksi, batching plant, asphalt mixing plant, ready mix, proyek infrastruktur';
            $seo['canonical'] = $hasFilters ? $baseArticlesUrl : $currentUrl;
            $seo['robots'] = $hasFilters
                ? 'noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
                : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
            $seo['meta'] = [
                ['name' => 'og:title', 'content' => "Artikel | {$companyName}", 'property' => true],
                ['name' => 'og:description', 'content' => $seo['description'], 'property' => true],
                ['name' => 'og:url', 'content' => $seo['canonical'], 'property' => true],
                ['name' => 'og:type', 'content' => 'website', 'property' => true],
            ];
        }

        if ($routeName === 'articles.show') {
            $article = Article::query()
                ->with(['category', 'user'])
                ->published()
                ->where('slug', $request->route('slug'))
                ->first();

            if ($article) {
                $headline = $article->seo_title ?: $article->title;
                $description = trim((string) ($article->excerpt ?: Str::limit(strip_tags($article->content), 160)));
                $image = $article->thumbnail
                    ? $this->absoluteAssetUrl($appUrl, $article->thumbnail)
                    : "{$appUrl}/images/hero-kontruksi.jpeg";
                $keywords = $article->seo_keywords ?: "artikel konstruksi, {$article->title}, JKK blog, berita konstruksi, info batching plant, info AMP";

                $seo['title'] = "{$headline} | {$companyName}";
                $seo['description'] = $description;
                $seo['keywords'] = $keywords;
                $seo['canonical'] = $currentUrl;
                $seo['meta'] = [
                    ['name' => 'og:site_name', 'content' => $companyName, 'property' => true],
                    ['name' => 'og:title', 'content' => $headline, 'property' => true],
                    ['name' => 'og:description', 'content' => $description, 'property' => true],
                    ['name' => 'og:image', 'content' => $image, 'property' => true],
                    ['name' => 'og:url', 'content' => $currentUrl, 'property' => true],
                    ['name' => 'og:type', 'content' => 'article', 'property' => true],
                    ['name' => 'article:published_time', 'content' => optional($article->published_at)->toIso8601String(), 'property' => true],
                    ['name' => 'article:modified_time', 'content' => optional($article->updated_at)->toIso8601String(), 'property' => true],
                    ['name' => 'article:section', 'content' => $article->category?->name, 'property' => true],
                    ['name' => 'twitter:card', 'content' => 'summary_large_image'],
                    ['name' => 'twitter:title', 'content' => $headline],
                    ['name' => 'twitter:description', 'content' => $description],
                    ['name' => 'twitter:image', 'content' => $image],
                ];
                $seo['schemas'] = [
                    [
                        '@context' => 'https://schema.org',
                        '@type' => 'Article',
                        '@id' => "{$currentUrl}#article",
                        'mainEntityOfPage' => $currentUrl,
                        'headline' => $headline,
                        'description' => $description,
                        'image' => [$image],
                        'url' => $currentUrl,
                        'inLanguage' => $locale === 'id' ? 'id-ID' : 'en-US',
                        'datePublished' => optional($article->published_at)->toIso8601String(),
                        'dateModified' => optional($article->updated_at)->toIso8601String(),
                        'articleSection' => $article->category?->name,
                        'keywords' => $keywords,
                        'author' => [
                            '@type' => 'Person',
                            'name' => $article->user?->name ?: $companyName,
                        ],
                        'publisher' => [
                            '@type' => 'Organization',
                            'name' => $companyName,
                            'url' => $appUrl,
                            'logo' => [
                                '@type' => 'ImageObject',
                                'url' => "{$appUrl}/images/logo.webp",
                            ],
                        ],
                    ],
                    [
                        '@context' => 'https://schema.org',
                        '@type' => 'BreadcrumbList',
                        'itemListElement' => [
                            [
                                '@type' => 'ListItem',
                                'position' => 1,
                                'name' => $locale === 'id' ? 'Beranda' : 'Home',
                                'item' => "{$appUrl}/{$locale}",
                            ],
                            [
                                '@type' => 'ListItem',
                                'position' => 2,
                                'name' => $locale === 'id' ? 'Artikel' : 'Articles',
                                'item' => "{$appUrl}/{$locale}/artikel",
                            ],
                            [
                                '@type' => 'ListItem',
                                'position' => 3,
                                'name' => $article->title,
                                'item' => $currentUrl,
                            ],
                        ],
                    ],
                ];
            }
        }

        return $seo;
    }

    protected function buildLocalizedUrls(string $appUrl, string $path, ?string $queryString = null): array
    {
        $segments = collect(explode('/', trim($path, '/')))
            ->filter()
            ->values();

        if ($segments->isEmpty() || !in_array($segments->first(), ['id', 'en'], true)) {
            return [];
        }

        return collect(['id', 'en'])
            ->mapWithKeys(function (string $locale) use ($segments, $appUrl, $queryString) {
                $localizedSegments = $segments->toArray();
                $localizedSegments[0] = $locale;

                return [$locale => $this->buildAbsoluteUrl($appUrl, '/' . implode('/', $localizedSegments), $queryString)];
            })
            ->all();
    }

    protected function absoluteAssetUrl(string $appUrl, ?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        return $this->buildAbsoluteUrl($appUrl, '/' . ltrim($path, '/'));
    }

    protected function normalizeUrl(string $url): string
    {
        $normalized = preg_replace('/^(https?:\/\/)www\./i', '$1', rtrim($url, '/'));

        return $normalized ?: rtrim($url, '/');
    }

    protected function buildAbsoluteUrl(string $appUrl, string $path, ?string $queryString = null): string
    {
        $url = rtrim($appUrl, '/') . '/' . ltrim($path, '/');

        if ($path === '/') {
            $url = rtrim($appUrl, '/') . '/';
        }

        return $queryString ? "{$url}?{$queryString}" : $url;
    }
}
