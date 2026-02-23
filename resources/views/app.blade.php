<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'JKK - Jaya Karya Kontruksi') }}</title>

    <!-- Resource Hints & Preloading -->

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Static SEO Fallback -->
    <meta name="description"
        content="PT Jaya Karya Konstruksi (JKK) melayani jasa konstruksi, pengaspalan jalan hotmix, dan sewa batching plant beton berkualitas SNI.">
    <meta name="keywords"
        content="pt jaya karya konstruksi, batching plant pt jaya karya konstruksi, kontraktor aspal, jkk">

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
