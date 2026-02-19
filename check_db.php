<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$latest = \App\Models\CompanyGallery::latest()->first();
if ($latest) {
    echo "ID: " . $latest->id . "\n";
    echo "Path: " . $latest->image_path . "\n";
    echo "Created: " . $latest->created_at . "\n";
} else {
    echo "No photos found in database.\n";
}
