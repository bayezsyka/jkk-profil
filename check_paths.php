<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Public Disk Root: " . config('filesystems.disks.public.root') . "\n";
echo "Public Path: " . public_path('storage') . "\n";
echo "Storage Path: " . storage_path('app/public') . "\n";
