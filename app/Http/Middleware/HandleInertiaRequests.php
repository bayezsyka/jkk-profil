<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = App::getLocale();
        $translations = $this->getTranslations($locale);
        $appUrl = $this->normalizeAppUrl((string) config('app.url'));
        $currentPath = $request->getPathInfo() ?: '/';
        $currentUrl = $this->buildAbsoluteUrl($appUrl, $currentPath, $request->getQueryString());

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'company' => config('company'),
            'app_url' => $appUrl,
            'locale' => $locale,
            'translations' => $translations,
            'current_path' => $currentPath,
            'current_url' => $currentUrl,
            'localized_urls' => $this->buildLocalizedUrls($appUrl, $currentPath, $request->getQueryString()),
        ];
    }

    /**
     * Get translations from the JSON file for the given locale.
     *
     * @param string $locale
     * @return array
     */
    protected function getTranslations(string $locale): array
    {
        $path = lang_path("{$locale}.json");

        if (File::exists($path)) {
            $content = File::get($path);
            return json_decode($content, true) ?? [];
        }

        // Fallback to Indonesian if locale file doesn't exist
        $fallbackPath = lang_path('id.json');
        if (File::exists($fallbackPath)) {
            $content = File::get($fallbackPath);
            return json_decode($content, true) ?? [];
        }

        return [];
    }

    protected function normalizeAppUrl(string $url): string
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

                $localizedPath = '/' . implode('/', $localizedSegments);

                return [$locale => $this->buildAbsoluteUrl($appUrl, $localizedPath, $queryString)];
            })
            ->all();
    }
}
