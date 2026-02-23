<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Project;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $locale = $request->input('locale', 'id');

        if (strlen($query) < 2) {
            return response()->json(['results' => []]);
        }

        $results = [];

        // Search Articles
        $articles = Article::with('category')
            ->published()
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('excerpt', 'LIKE', "%{$query}%")
                    ->orWhere('content', 'LIKE', "%{$query}%");
            })
            ->orderBy('published_at', 'desc')
            ->take(5)
            ->get();

        foreach ($articles as $article) {
            $results[] = [
                'type' => 'article',
                'title' => $article->title,
                'description' => $article->excerpt ?? \Illuminate\Support\Str::limit(strip_tags($article->content), 100),
                'thumbnail' => $article->thumbnail,
                'url' => "/{$locale}/artikel/{$article->slug}",
                'category' => $article->category?->name,
            ];
        }

        // Search Projects
        $projects = Project::with('images')
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('location', 'LIKE', "%{$query}%")
                    ->orWhere('description', 'LIKE', "%{$query}%")
                    ->orWhere('category', 'LIKE', "%{$query}%");
            })
            ->orderBy('date', 'desc')
            ->take(5)
            ->get();

        foreach ($projects as $project) {
            $firstImage = $project->images->first();
            $results[] = [
                'type' => 'project',
                'title' => $project->title,
                'description' => $project->location,
                'thumbnail' => $firstImage ? \Illuminate\Support\Facades\Storage::disk('public')->url($firstImage->image_path) : null,
                'url' => "/{$locale}/projek/{$project->id}",
                'category' => $project->category,
            ];
        }

        // Note: CompanyGallery doesn't have searchable text columns (title),
        // so gallery results are provided via the static pages search below.

        // Static pages search (Services, Contact, About)
        $staticPages = $this->searchStaticPages($query, $locale);
        $results = array_merge($results, $staticPages);

        return response()->json(['results' => $results]);
    }

    private function searchStaticPages(string $query, string $locale): array
    {
        $results = [];
        $queryLower = mb_strtolower($query);

        // Define static pages with keywords in both languages
        $pages = [
            [
                'type' => 'service',
                'keywords' => ['batching', 'plant', 'beton', 'concrete', 'ready mix', 'readymix', 'ready-mix', 'dry mix'],
                'title_id' => 'Batching Plant',
                'title_en' => 'Batching Plant',
                'desc_id' => 'Produksi beton ready mix dengan sistem Dry Mix modern dan dilengkapi Laboratorium Beton.',
                'desc_en' => 'Ready mix concrete production with modern Dry Mix systems and equipped with a Concrete Laboratory.',
                'url' => "/{$locale}/services/batching-plant",
            ],
            [
                'type' => 'service',
                'keywords' => ['konstruksi', 'construction', 'kontraktor', 'contractor', 'jalan', 'road', 'jembatan', 'bridge', 'gedung', 'building'],
                'title_id' => 'Jasa Konstruksi',
                'title_en' => 'Construction Services',
                'desc_id' => 'Konstruksi jalan raya, jembatan, saluran air, dan bangunan gedung.',
                'desc_en' => 'Highway, bridge, drainage, and building construction.',
                'url' => "/{$locale}/services/construction",
            ],
            [
                'type' => 'service',
                'keywords' => ['asphalt', 'aspal', 'hotmix', 'hot mix', 'amp', 'mixing plant', 'pengaspalan', 'paving'],
                'title_id' => 'Asphalt Mixing Plant',
                'title_en' => 'Asphalt Mixing Plant',
                'desc_id' => 'Produksi aspal hotmix berkualitas untuk proyek pengaspalan jalan.',
                'desc_en' => 'Quality hotmix asphalt production for road paving projects.',
                'url' => "/{$locale}/services/asphalt-mixing-plant",
            ],
            [
                'type' => 'page',
                'keywords' => ['kontak', 'contact', 'hubungi', 'telepon', 'phone', 'email', 'alamat', 'address', 'whatsapp'],
                'title_id' => 'Hubungi Kami',
                'title_en' => 'Contact Us',
                'desc_id' => 'Siap membantu mewujudkan proyek konstruksi Anda.',
                'desc_en' => 'Ready to help realize your construction project.',
                'url' => "/{$locale}/kontak-kami",
            ],
            [
                'type' => 'page',
                'keywords' => ['tentang', 'about', 'profil', 'profile', 'sejarah', 'history', 'visi', 'misi', 'vision', 'mission', 'struktur', 'structure', 'organisasi', 'organization'],
                'title_id' => 'Tentang Kami',
                'title_en' => 'About Us',
                'desc_id' => 'Profil dan informasi perusahaan PT. Jaya Karya Kontruksi.',
                'desc_en' => 'Company profile and information of PT. Jaya Karya Kontruksi.',
                'url' => "/{$locale}/tentang-kami",
            ],
            [
                'type' => 'page',
                'keywords' => ['galeri', 'gallery', 'foto', 'photo', 'gambar', 'image', 'dokumentasi', 'documentation'],
                'title_id' => 'Galeri',
                'title_en' => 'Gallery',
                'desc_id' => 'Dokumentasi visual dari berbagai proyek yang telah kami kerjakan.',
                'desc_en' => 'Visual documentation of various projects we have completed.',
                'url' => "/{$locale}/galeri",
            ],
            [
                'type' => 'page',
                'keywords' => ['proyek', 'projek', 'project', 'portfolio'],
                'title_id' => 'Proyek',
                'title_en' => 'Projects',
                'desc_id' => 'Daftar proyek yang telah dan sedang kami kerjakan.',
                'desc_en' => 'List of projects we have completed and are working on.',
                'url' => "/{$locale}/projek",
            ],
            [
                'type' => 'page',
                'keywords' => ['artikel', 'article', 'berita', 'news', 'blog'],
                'title_id' => 'Artikel',
                'title_en' => 'Articles',
                'desc_id' => 'Baca berita dan informasi terbaru seputar konstruksi dan proyek kami.',
                'desc_en' => 'Read the latest news and information about construction and our projects.',
                'url' => "/{$locale}/artikel",
            ],
        ];

        foreach ($pages as $page) {
            foreach ($page['keywords'] as $keyword) {
                if (str_contains($queryLower, $keyword) || str_contains($keyword, $queryLower)) {
                    $results[] = [
                        'type' => $page['type'],
                        'title' => $locale === 'id' ? $page['title_id'] : $page['title_en'],
                        'description' => $locale === 'id' ? $page['desc_id'] : $page['desc_en'],
                        'thumbnail' => null,
                        'url' => $page['url'],
                        'category' => null,
                    ];
                    break; // Stop checking keywords for this page
                }
            }
        }

        return $results;
    }
}
