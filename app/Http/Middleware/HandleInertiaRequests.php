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
        // Get locale from session, default to 'id'
        $locale = session('locale', 'id');

        // Set the application locale
        App::setLocale($locale);

        // Read translations from JSON file
        $translations = $this->getTranslations($locale);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'company' => config('company'),
            'locale' => $locale,
            'translations' => $translations,
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
}
