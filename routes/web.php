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

        // 1. Handle public/storage issues
        $publicStoragePath = public_path('storage');
        if (file_exists($publicStoragePath)) {
            if (is_link($publicStoragePath)) {
                $results[] = "public/storage is already a symlink.";
            } else {
                $results[] = "public/storage is a DIRECTORY. Attempting to move it to storage/app/public...";
                // If it's a real directory, move its content to the real storage first
                $storageAppPublic = storage_path('app/public');

                // Helper to copy directory
                $copyDir = function ($src, $dst) use (&$copyDir) {
                    if (!file_exists($dst)) mkdir($dst, 0755, true);
                    $dir = opendir($src);
                    while (($file = readdir($dir)) !== false) {
                        if ($file != '.' && $file != '..') {
                            if (is_dir($src . '/' . $file)) {
                                $copyDir($src . '/' . $file, $dst . '/' . $file);
                            } else {
                                copy($src . '/' . $file, $dst . '/' . $file);
                            }
                        }
                    }
                    closedir($dir);
                };

                $copyDir($publicStoragePath, $storageAppPublic);

                // Now delete the directory in public
                $deleteDir = function ($dir) use (&$deleteDir) {
                    if (!file_exists($dir)) return true;
                    if (!is_dir($dir)) return unlink($dir);
                    foreach (scandir($dir) as $item) {
                        if ($item == '.' || $item == '..') continue;
                        if (!$deleteDir($dir . DIRECTORY_SEPARATOR . $item)) return false;
                    }
                    return rmdir($dir);
                };

                if ($deleteDir($publicStoragePath)) {
                    $results[] = "Successfully deleted old public/storage directory.";
                } else {
                    $results[] = "FAILED to delete public/storage directory. Please delete it manually via File Manager.";
                }
            }
        }

        // 2. Run storage:link
        try {
            \Illuminate\Support\Facades\Artisan::call('storage:link');
            $results[] = "Artisan storage:link output: " . trim(\Illuminate\Support\Facades\Artisan::output());
        } catch (\Exception $e) {
            $results[] = "Artisan storage:link failed: " . $e->getMessage();
        }

        // 3. Fix permissions recursively
        $fixPermissions = function ($path) use (&$fixPermissions) {
            if (!file_exists($path)) return;

            if (is_dir($path)) {
                @chmod($path, 0755);
                foreach (scandir($path) as $item) {
                    if ($item === '.' || $item === '..') continue;
                    $fullPath = $path . DIRECTORY_SEPARATOR . $item;
                    $fixPermissions($fullPath);
                }
            } else {
                @chmod($path, 0644);
            }
        };

        $storagePath = storage_path('app/public');
        if (file_exists($storagePath)) {
            $fixPermissions($storagePath);
            $results[] = "Permissions in storage/app/public fixed recursively (755 for dirs, 644 for files).";
        } else {
            mkdir($storagePath, 0755, true);
            $results[] = "Created missing storage/app/public directory.";
        }

        // Ensure subdirectories exist
        foreach (['articles', 'company-gallery', 'projects'] as $dir) {
            $target = $storagePath . DIRECTORY_SEPARATOR . $dir;
            if (!file_exists($target)) {
                mkdir($target, 0755, true);
                $results[] = "Created subdirectory: $dir";
            }
        }

        return [
            'status' => 'success',
            'messages' => $results,
            'diagnostic' => [
                'public_storage_exists' => file_exists($publicStoragePath),
                'public_storage_is_link' => is_link($publicStoragePath),
                'storage_app_public_exists' => file_exists($storagePath)
            ]
        ];
    } catch (\Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ];
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

    Route::redirect('/admin', '/admin/dashboard');

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
