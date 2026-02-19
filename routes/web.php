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

// Temporary route to fix storage on hosting
Route::get('/fix-storage', function () {
    try {
        $results = [];
        \Illuminate\Support\Facades\Artisan::call('storage:link');
        $results[] = "Artisan storage:link: " . trim(\Illuminate\Support\Facades\Artisan::output());

        $fix = function ($p) use (&$fix) {
            if (!file_exists($p)) return;
            @chmod($p, 0755);
            if (is_dir($p)) {
                foreach (scandir($p) as $i) {
                    if ($i === '.' || $i === '..') continue;
                    $full = $p . DIRECTORY_SEPARATOR . $i;
                    if (is_dir($full)) $fix($full);
                    else @chmod($full, 0644);
                }
            }
        };

        $storagePath = storage_path('app/public');
        if (file_exists($storagePath)) {
            $fix($storagePath);
            $results[] = "Permissions in storage/app/public fixed";
        }

        $publicStorageLink = public_path('storage');
        if (file_exists($publicStorageLink)) {
            @chmod($publicStorageLink, 0755);
            $results[] = "Public storage link fixed";
        }

        return ['messages' => $results, 'diagnostic' => ['link' => is_link($publicStorageLink)]];
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

Route::prefix('{locale}')
    ->where(['locale' => 'id|en'])
    ->group(function () {
        Route::get('/', function () {
            // Get latest 3 projects with images
            $latestProjects = \App\Models\Project::with('images')
                ->orderBy('date', 'desc')
                ->take(3)
                ->get();

            // Get all project images for gallery (with project title)
            $galleryImages = \App\Models\ProjectImage::with('project:id,title')
                ->get()
                ->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path,
                        'project_title' => $image->project->title ?? 'Project',
                    ];
                });

            // Get latest 3 published articles
            $latestArticles = \App\Models\Article::with('category')
                ->published()
                ->orderBy('published_at', 'desc')
                ->take(3)
                ->get();

            return Inertia::render('Welcome/Index', [
                'latestProjects' => $latestProjects,
                'galleryImages' => $galleryImages,
                'latestArticles' => $latestArticles,
            ]);
        })->name('home');

        Route::get('/tentang-kami', function () {
            return Inertia::render('About/Info', [
                'organizationMembers' => \App\Models\OrganizationMember::orderBy('order')->get(),
                'companyGallery' => \App\Models\CompanyGallery::orderBy('order')->get(),
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

            $concretePrices = \App\Models\ConcretePrice::orderBy('order')->get();

            return Inertia::render('Services/BatchingPlant', [
                'projects' => $projects,
                'concretePrices' => $concretePrices,
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

            $asphaltPrices = \App\Models\AsphaltPrice::orderBy('order')->get();

            return Inertia::render('Services/AsphaltMixPlant', [
                'projects' => $projects,
                'asphaltPrices' => $asphaltPrices,
            ]);
        })->name('services.asphalt');

        // Gallery Route
        Route::get('/galeri', [\App\Http\Controllers\GalleryController::class, 'index'])->name('gallery');

        // Projects Routes
        Route::get('/projek', [\App\Http\Controllers\Public\ProjectController::class, 'index'])->name('projects.index');
        Route::get('/projek/{id}', [\App\Http\Controllers\Public\ProjectController::class, 'show'])->name('projects.show');

        // Articles Route
        Route::get('/artikel', [\App\Http\Controllers\Public\ArticleController::class, 'index'])->name('articles.index');
        Route::get('/artikel/{slug}', [\App\Http\Controllers\Public\ArticleController::class, 'show'])->name('articles.show');
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

        // Concrete Price Management
        Route::resource('concrete-prices', \App\Http\Controllers\Admin\ConcretePriceController::class)->only(['index', 'update']);
        Route::resource('asphalt-prices', \App\Http\Controllers\Admin\AsphaltPriceController::class)->only(['index', 'update']);

        // Article Management
        Route::resource('articles', \App\Http\Controllers\Admin\ArticleController::class);
        Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);

        // Company Gallery Management
        Route::get('/company-gallery', [\App\Http\Controllers\Admin\CompanyGalleryController::class, 'index'])->name('company-gallery.index');
        Route::post('/company-gallery', [\App\Http\Controllers\Admin\CompanyGalleryController::class, 'store'])->name('company-gallery.store');
        Route::delete('/company-gallery/{companyGallery}', [\App\Http\Controllers\Admin\CompanyGalleryController::class, 'destroy'])->name('company-gallery.destroy');
    });
});
