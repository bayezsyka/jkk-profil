<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
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
            return Inertia::render('Welcome/Index');
        })->name('home');

        Route::get('/tentang-kami', function () {
            return Inertia::render('About/Info', [
                'organizationMembers' => \App\Models\OrganizationMember::orderBy('order')->get(),
            ]);
        })->name('about');

        Route::get('/tentang-kami/struktur', function () {
            return Inertia::render('About/Structure', [
                'organizationMembers' => \App\Models\OrganizationMember::orderBy('order')->get(),
            ]);
        })->name('about.structure');

        Route::get('/kontak-kami', function () {
            return Inertia::render('Contact/Index');
        })->name('contact');

        // Services Routes
        Route::get('/services/batching-plant', function () {
            $projects = \App\Models\Project::where('category', 'batching_plant')
                ->with('images')
                ->orderBy('date', 'desc')
                ->get();
            return Inertia::render('Services/BatchingPlant', [
                'projects' => $projects
            ]);
        })->name('services.batching');

        Route::get('/services/construction', function () {
            $projects = \App\Models\Project::where('category', 'construction')
                ->with('images')
                ->orderBy('date', 'desc')
                ->get();
            return Inertia::render('Services/Construction', [
                'projects' => $projects
            ]);
        })->name('services.construction');

        Route::get('/services/asphalt-mixing-plant', function () {
            $projects = \App\Models\Project::where('category', 'asphalt_mixing_plant')
                ->with('images')
                ->orderBy('date', 'desc')
                ->get();
            return Inertia::render('Services/AsphaltMixPlant', [
                'projects' => $projects
            ]);
        })->name('services.asphalt');

        // Gallery Route
        Route::get('/galeri', [\App\Http\Controllers\GalleryController::class, 'index'])->name('gallery');

        // Projects Routes
        Route::get('/projek', [\App\Http\Controllers\Public\ProjectController::class, 'index'])->name('projects.index');
        Route::get('/projek/{id}', [\App\Http\Controllers\Public\ProjectController::class, 'show'])->name('projects.show');
    });

// Auth & Admin Routes
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        // Organization Structure Management
        Route::get('/organization', [\App\Http\Controllers\Admin\OrganizationController::class, 'index'])->name('organization.index');
        Route::post('/organization', [\App\Http\Controllers\Admin\OrganizationController::class, 'store'])->name('organization.store');
        Route::post('/organization/{organizationMember}', [\App\Http\Controllers\Admin\OrganizationController::class, 'update'])->name('organization.update'); // Using POST for update to support file uploads (Laravel/Inertia quirk)
        Route::delete('/organization/{organizationMember}', [\App\Http\Controllers\Admin\OrganizationController::class, 'destroy'])->name('organization.destroy');

        // Project Gallery Management
        Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class);
        Route::delete('project-images/{projectImage}', [\App\Http\Controllers\Admin\ProjectController::class, 'destroyImage'])->name('project-images.destroy');
    });
});
