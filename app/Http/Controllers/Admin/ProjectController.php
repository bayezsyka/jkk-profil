<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    protected $imageService;

    public function __construct(\App\Services\ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        $projects = Project::with('images')
            ->orderBy('date', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(Request $request)
    {
        // \Illuminate\Support\Facades\Log::info('Project Store Request', $request->all());

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'category' => ['required', Rule::in(['batching_plant', 'asphalt_mixing_plant', 'construction'])],
            'subcategory' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:20480',
        ]);

        $project = Project::create([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'date' => $validated['date'],
            'category' => $validated['category'],
            'subcategory' => empty($validated['subcategory']) ? null : $validated['subcategory'],
            'description' => empty($validated['description']) ? null : $validated['description'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Use ImageService to compress and convert
                $path = $this->imageService->uploadAndCompress($image, 'projects');

                $project->images()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $project->load('images');
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'category' => ['required', Rule::in(['batching_plant', 'asphalt_mixing_plant', 'construction'])],
            'subcategory' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:20480',
        ]);

        $project->update([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'date' => $validated['date'],
            'category' => $validated['category'],
            'subcategory' => empty($validated['subcategory']) ? null : $validated['subcategory'],
            'description' => empty($validated['description']) ? null : $validated['description'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Use ImageService to compress and convert
                $path = $this->imageService->uploadAndCompress($image, 'projects');

                $project->images()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        // Delete images from storage
        foreach ($project->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }

    public function destroyImage(ProjectImage $projectImage)
    {
        Storage::disk('public')->delete($projectImage->image_path);
        $projectImage->delete();

        return back()->with('success', 'Image deleted successfully.');
    }
}
