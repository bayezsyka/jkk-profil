<!DOCTYPE html>
<html lang="{{ $seo['lang'] ?? str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ $seo['title'] ?? config('app.name', 'Jaya Karya Kontruksi') }}</title>

    <!-- Resource Hints & Preloading -->

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Favicon & App Icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/webp" href="/images/logo.webp">
    <link rel="apple-touch-icon" href="/images/logo.webp">

    <!-- SEO Fallback from Laravel (works even without Inertia SSR / Node.js) -->
    <meta name="description"
        content="{{ $seo['description'] ?? 'PT Jaya Karya Kontruksi (JKK) - Perusahaan jasa konstruksi, penyedia asphalt mix plant (AMP), dan penyedia beton ready mix berkualitas di Brebes.' }}">
    <meta name="keywords"
        content="{{ $seo['keywords'] ?? 'jaya karya kontruksi, jkk, kontraktor jalan, aspal hotmix, ready mix, batching plant, pt jkk, konstruksi brebes' }}">
    <meta name="robots" content="{{ $seo['robots'] ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }}">
    @if (!empty($seo['canonical']))
        <link rel="canonical" href="{{ $seo['canonical'] }}">
    @endif
    @foreach (($seo['alternate_urls'] ?? []) as $hrefLang => $alternateUrl)
        <link rel="alternate" hrefLang="{{ $hrefLang }}" href="{{ $alternateUrl }}">
    @endforeach
    @if (!empty($seo['alternate_urls']['id']))
        <link rel="alternate" hrefLang="x-default" href="{{ $seo['alternate_urls']['id'] }}">
    @endif
    @foreach (($seo['meta'] ?? []) as $meta)
        @if (!empty($meta['content']))
            @if (!empty($meta['property']))
                <meta property="{{ $meta['name'] }}" content="{{ $meta['content'] }}">
            @else
                <meta name="{{ $meta['name'] }}" content="{{ $meta['content'] }}">
            @endif
        @endif
    @endforeach
    @foreach (($seo['schemas'] ?? []) as $schema)
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endforeach

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
