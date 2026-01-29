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

Route::get('/language/{locale}', function (string $locale) {
    // Only allow valid locales
    $allowedLocales = ['id', 'en'];

    if (in_array($locale, $allowedLocales)) {
        session(['locale' => $locale]);
        App::setLocale($locale);
    }

    return redirect()->back();
})->name('language.switch');

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome');
});
