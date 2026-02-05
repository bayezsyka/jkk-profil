<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    protected $imageService;

    public function __construct(\App\Services\ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('category', 'user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Articles/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'status' => 'required|in:DRAFT,PUBLISHED,ARCHIVED',
            'published_at' => 'nullable|date',
            'seo_title' => 'nullable|string|max:255',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        $data = $request->except('thumbnail');
        $data['slug'] = Str::slug($request->title);
        $data['user_id'] = auth()->id();

        // Auto-generate excerpt if missing
        if (empty($data['excerpt'])) {
            $data['excerpt'] = Str::limit(strip_tags($data['content']), 150);
        }

        // Auto-set published_at if status is PUBLISHED but date is missing
        if ($request->status === 'PUBLISHED' && empty($request->published_at)) {
            $data['published_at'] = now();
        }

        if ($request->hasFile('thumbnail')) {
            $path = $this->imageService->uploadAndCompress($request->file('thumbnail'), 'articles', 1200);
            $data['thumbnail'] = $path;
        }

        Article::create($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'status' => 'required|in:DRAFT,PUBLISHED,ARCHIVED',
            'published_at' => 'nullable|date',
            'seo_title' => 'nullable|string|max:255',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        $data = $request->except('thumbnail');

        // Auto-generate excerpt if missing
        if (empty($data['excerpt'])) {
            $data['excerpt'] = Str::limit(strip_tags($data['content']), 150);
        }

        // Auto-set published_at if switching to PUBLISHED and no date set
        if ($request->status === 'PUBLISHED' && empty($request->published_at) && $article->status !== 'PUBLISHED') {
            $data['published_at'] = now();
        } elseif ($request->status === 'PUBLISHED' && empty($request->published_at) && !$article->published_at) {
            $data['published_at'] = now();
        }

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail
            if ($article->thumbnail) {
                $oldPath = str_replace('/storage/', '', $article->thumbnail);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $this->imageService->uploadAndCompress($request->file('thumbnail'), 'articles', 1200);
            $data['thumbnail'] = $path;
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->thumbnail) {
            $oldPath = str_replace('/storage/', '', $article->thumbnail);
            Storage::disk('public')->delete($oldPath);
        }

        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Article deleted successfully.');
    }
}
