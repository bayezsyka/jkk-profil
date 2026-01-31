<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Language Switch Route
|--------------------------------------------------------------------------
|
| This route handles switching the application locale.
| It stores the selected locale in the session and redirects back.
|
*/


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect('/id');
});

Route::prefix('{locale}')
    ->where(['locale' => 'id|en'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('Welcome');
        })->name('home');

        Route::get('/tentang-kami', function () {
            return Inertia::render('About/Info');
        })->name('about');

        Route::get('/tentang-kami/struktur', function () {
            return Inertia::render('About/Structure');
        })->name('about.structure');

        Route::get('/kontak-kami', function () {
            return Inertia::render('Contact/Index');
        })->name('contact');

        // Services Routes
        Route::get('/services/batching-plant', function () {
            return Inertia::render('Services/BatchingPlant');
        })->name('services.batching');

        Route::get('/services/construction', function () {
            return Inertia::render('Services/Construction');
        })->name('services.construction');

        Route::get('/services/asphalt-mixing-plant', function () {
            return Inertia::render('Services/AsphaltMixPlant');
        })->name('services.asphalt');
    });
