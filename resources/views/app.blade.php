<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Jaya Karya Kontruksi') }}</title>

    <!-- Resource Hints & Preloading -->

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Favicon & App Icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/webp" href="/images/logo.webp">
    <link rel="apple-touch-icon" href="/images/logo.webp">

    <!-- Static SEO Fallback -->
    <meta name="description"
        content="PT Jaya Karya Kontruksi (JKK) - Perusahaan jasa konstruksi, penyedia asphalt mix plant (AMP), dan penyedia beton ready mix berkualitas di Brebes.">
    <meta name="keywords"
        content="jaya karya kontruksi, jkk, kontraktor jalan, aspal hotmix, ready mix, batching plant, pt jkk, konstruksi brebes">

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
