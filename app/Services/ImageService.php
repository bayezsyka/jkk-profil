<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageService
{
    /**
     * Upload an image, convert to WebP, and compress.
     *
     * @param UploadedFile $file The uploaded file.
     * @param string $path The storage path (folder).
     * @param int|null $maxWidth Maximum width (optional).
     * @param int $quality Compression quality (0-100).
     * @return string The stored file path.
     */
    public function uploadAndCompress(UploadedFile $file, string $path, ?int $maxWidth = 1920, int $quality = 80): string
    {
        // Debugging: Ensure class exists
        if (!class_exists(\Intervention\Image\ImageManager::class)) {
            throw new \Exception('Intervention ImageManager class not found. Please run "composer require intervention/image".');
        }

        $manager = new ImageManager(new Driver());

        // Read the image
        $image = $manager->read($file);

        // Resize if width exceeds maxWidth (maintain aspect ratio)
        if ($maxWidth && $image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        // Generate unique filename with .webp extension
        $filename = uniqid() . '_' . time() . '.webp';
        $fullPath = $path . '/' . $filename;

        // Encode to WebP with quality
        $encoded = $image->toWebp($quality);

        // Save to storage (public disk)
        Storage::disk('public')->put($fullPath, (string) $encoded);

        // Explicitly set permissions (required by some shared hostings)
        try {
            $absolutePath = Storage::disk('public')->path($fullPath);
            $directory = dirname($absolutePath);

            // Set directory permissions to 755
            if (file_exists($directory)) {
                @chmod($directory, 0755);
            }

            // Set file permissions to 644
            if (file_exists($absolutePath)) {
                @chmod($absolutePath, 0644);
            }
        } catch (\Exception $e) {
            // Silently fail if chmod/path is not supported by the disk driver
        }

        return $fullPath;
    }
}
