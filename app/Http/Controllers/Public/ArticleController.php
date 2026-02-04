<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query()
            ->with(['category', 'user'])
            ->published()
            ->orderBy('published_at', 'desc');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->has('category')) {
            $slug = $request->input('category');
            if ($slug !== 'all') {
                $query->whereHas('category', function ($q) use ($slug) {
                    $q->where('slug', $slug);
                });
            }
        }

        $articles = $query->paginate(9)->withQueryString();

        // Only show categories that have at least one PUBLISHED article
        $categories = Category::whereHas('articles', function ($q) {
            $q->published();
        })->get();

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
    public function show($locale, $slug)
    {
        $article = Article::where('slug', $slug)
            ->with(['category', 'user'])
            ->where(function ($query) {
                // Allow viewing drafted/archived if user is admin, but for public controller simpler to restrict or check Auth
                // For now, let's stick to published() scope for public view, unless previews are needed later
                $query->published();
            })
            ->firstOrFail();

        // Increment views
        $article->increment('views');

        // Related articles
        $relatedArticles = Article::published()
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
