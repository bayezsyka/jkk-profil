<?php

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>Storage Link Diagnostic Tool</h1>";

// 1. Basic Path Info
echo "<h2>1. Path Information</h2>";
echo "<table border='1' cellpadding='5'>";
echo "<tr><th>Key</th><th>Value</th><th>Exists?</th><th>Permissions</th></tr>";

$paths = [
    'Current Script Directory' => __DIR__,
    'Public Path (calculated)' => __DIR__, // Assuming check_paths.php is in public root
    'Storage Link (public/storage)' => __DIR__ . '/storage',
];

// Try to load Laravel helper if possible to get configured paths, but proceed if not
if (file_exists(__DIR__ . '/../bootstrap/app.php')) {
    // Standard Laravel structure
    $appPath = __DIR__ . '/..';
} elseif (file_exists(__DIR__ . '/bootstrap/app.php')) {
    // Current dir is app root (e.g. running via `php artisan serve` or local)
    $appPath = __DIR__;
} else {
    // Try to guess based on standard hostinger structure if moved out
    $appPath = dirname(__DIR__) . '/jkk-profil'; // pure guess, might valid
    if (!file_exists($appPath . '/bootstrap/app.php')) {
        $appPath = null;
    }
}

$storageTarget = null;

if ($appPath) {
    echo "<tr><td colspan='4'><strong>Laravel Framework Found at: $appPath</strong></td></tr>";

    // Attempt to bootstrap Laravel for helpers if possible (might fail if permissions wrong)
    try {
        require $appPath . '/vendor/autoload.php';
        $app = require_once $appPath . '/bootstrap/app.php';
        $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $kernel->bootstrap();

        $paths['Configured Public Path'] = public_path();
        $paths['Configured Storage Path'] = storage_path('app/public');
        $storageTarget = storage_path('app/public');
    } catch (Exception $e) {
        echo "<tr><td colspan='4' style='color:red'>Failed to bootstrap Laravel: " . $e->getMessage() . "</td></tr>";
    }
} else {
    // Manually guess storage target if we can't load laravel
    // Default laravel structure: storage/app/public relative to project root
    // If check_paths.php is in public/, then ../storage/app/public
    $possibleStorage = dirname(__DIR__) . '/storage/app/public';
    if (file_exists($possibleStorage)) {
        $storageTarget = $possibleStorage;
        $paths['Guessed Storage Target'] = $storageTarget;
    }
}

foreach ($paths as $name => $path) {
    $exists = file_exists($path) ? "<span style='color:green'>YES</span>" : "<span style='color:red'>NO</span>";
    $params = file_exists($path) ? substr(sprintf('%o', fileperms($path)), -4) : "N/A";
    $isLink = is_link($path) ? " (SYMLINK)" : "";

    echo "<tr>";
    echo "<td>$name</td>";
    echo "<td>$path$isLink</td>";
    echo "<td>$exists</td>";
    echo "<td>$params</td>";
    echo "</tr>";
}
echo "</table>";

// 2. Symlink Diagnosis
echo "<h2>2. Symlink Diagnosis</h2>";
$publicStorage = __DIR__ . '/storage';

if (is_link($publicStorage)) {
    $target = readlink($publicStorage);
    echo "<p><strong>'storage' is a symlink.</strong></p>";
    echo "<p>Points to: <code>$target</code></p>";

    // Resolve full path if relative
    if (strpos($target, '/') !== 0 && strpos($target, ':') === false) { // Basic check for relative path
        $targetAbsolute = realpath(dirname($publicStorage) . '/' . $target);
        echo "<p>Resolved Absolute Path: <code>$targetAbsolute</code></p>";
    } else {
        $targetAbsolute = $target;
    }

    if (file_exists($targetAbsolute)) {
        echo "<p style='color:green'>Target exists.</p>";
    } else {
        echo "<p style='color:red'><strong>TARGET DOES NOT EXIST OR IS NOT ACCESSIBLE.</strong> This is likely the cause of 403 or 404.</p>";
    }
} elseif (file_exists($publicStorage)) {
    echo "<p><strong>'storage' is a DIRECTORY, not a symlink.</strong> This might be wrong if you expected a symlink to storage/app/public.</p>";
} else {
    echo "<p><strong>'storage' does not exist in public directory.</strong></p>";
}

// 3. Test File Creation & Visibility
echo "<h2>3. Test File Accessibility</h2>";
if ($storageTarget && file_exists($storageTarget)) {
    echo "<p>Attempting to create a test file in storage target: <code>$storageTarget</code></p>";
    $testFileName = 'test_permission_' . time() . '.txt';
    $testContent = "This is a test file to verify storage permissions.";
    $testFilePath = $storageTarget . '/' . $testFileName;

    try {
        if (file_put_contents($testFilePath, $testContent) !== false) {
            echo "<p style='color:green'>Successfully wrote test file: $testFileName</p>";

            // Check if we can access it via web
            $webUrl = 'storage/' . $testFileName;
            echo "<p>Try clicking this link: <a href='$webUrl' target='_blank'>$webUrl</a></p>";
            echo "<p>If you see the text '$testContent', then basic storage access works.</p>";
            echo "<p>If you get 403/404, the symlink or web server config is broken.</p>";
        } else {
            echo "<p style='color:red'>Failed to write test file. Check folder permissions of storage/app/public.</p>";
        }
    } catch (Exception $e) {
        echo "<p style='color:red'>Error writing test file: " . $e->getMessage() . "</p>";
    }
} else {
    echo "<p>Cannot test file writing because storage target was not found.</p>";
}

// 4. Directory Traversal Check inside Storage
echo "<h2>4. Company Gallery Directory Check</h2>";
if ($storageTarget) {
    $galleryPath = $storageTarget . '/company-gallery';
    if (file_exists($galleryPath)) {
        echo "<p>Directory <code>company-gallery</code> exists.</p>";
        echo "<p>Permissions: " . substr(sprintf('%o', fileperms($galleryPath)), -4) . "</p>";

        $files = scandir($galleryPath);
        $files = array_diff($files, ['.', '..']);
        if (count($files) > 0) {
            echo "<p>Found " . count($files) . " files:</p><ul>";
            foreach ($files as $f) {
                $p = $galleryPath . '/' . $f;
                $perm = substr(sprintf('%o', fileperms($p)), -4);
                echo "<li>$f (Perms: $perm) - <a href='storage/company-gallery/$f' target='_blank'>Try Link</a></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>Directory is empty.</p>";
        }
    } else {
        echo "<p style='color:red'>Directory <code>company-gallery</code> does NOT exist in storage/app/public.</p>";
    }
}

// 5. Fix Actions
echo "<h2>5. Attempt Fixes</h2>";
echo "<form method='post'>";
echo "<input type='submit' name='fix_symlink' value='Re-create Symlink' /> ";
echo "<input type='submit' name='fix_perms' value='Fix Permissions (chmod 755/644)' />";
echo "</form>";

if (isset($_POST['fix_symlink'])) {
    if ($storageTarget) {
        echo "<h3>Attempting to re-create symlink...</h3>";
        if (file_exists($publicStorage) || is_link($publicStorage)) {
            // Try to delete first (might fail on some shared hosts)
            if (@unlink($publicStorage)) {
                echo "Removed old link.<br>";
            } else {
                // If it's a directory, we usually can't unlink it easily without recursive delete, danger!
                if (is_dir($publicStorage) && !is_link($publicStorage)) {
                    echo "<span style='color:red'>'storage' is a real directory (not link), cannot safely remove automatically. Please rename or remove it via File Manager.</span><br>";
                } else {
                    echo "Failed to remove old link (permissions?).<br>";
                }
            }
        }

        if (!file_exists($publicStorage)) {
            if (symlink($storageTarget, $publicStorage)) {
                echo "<span style='color:green'>Symlink created successfully!</span> Refers to $storageTarget<br>";
            } else {
                echo "<span style='color:red'>Failed to create symlink.</span> `symlink()` function might be disabled.<br>";
            }
        }
    } else {
        echo "Cannot create symlink: Storage target unknown.<br>";
    }
}

if (isset($_POST['fix_perms']) && $storageTarget) {
    echo "<h3>Attempting to fix permissions...</h3>";
    // Recursive chmod simplistic approach
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($storageTarget));
    $count = 0;
    foreach ($iterator as $item) {
        if ($item->getFilename() == '.' || $item->getFilename() == '..') continue;

        try {
            if ($item->isDir()) {
                chmod($item->getPathname(), 0755);
            } else {
                chmod($item->getPathname(), 0644);
            }
            $count++;
        } catch (Exception $e) {
            // ignore
        }
    }
    echo "Attempted to set permissions on $count items.<br>";
}
