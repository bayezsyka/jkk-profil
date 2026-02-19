<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyGallery;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyGalleryController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        $photos = CompanyGallery::orderBy('order')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/CompanyGallery/Index', [
            'photos' => $photos,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:20480',
        ]);

        if ($request->hasFile('images')) {
            $maxOrder = CompanyGallery::max('order') ?? 0;

            foreach ($request->file('images') as $image) {
                $path = $this->imageService->uploadAndCompress($image, 'company-gallery');

                CompanyGallery::create([
                    'image_path' => $path,
                    'order' => ++$maxOrder,
                ]);
            }
        }

        return redirect()->route('admin.company-gallery.index')->with('success', 'Foto berhasil ditambahkan.');
    }

    public function destroy(CompanyGallery $companyGallery)
    {
        Storage::disk('public')->delete($companyGallery->image_path);
        $companyGallery->delete();

        return back()->with('success', 'Foto berhasil dihapus.');
    }
}
