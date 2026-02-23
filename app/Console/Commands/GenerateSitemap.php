<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Article;
use App\Models\Project;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.xml file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create();
        $locales = ['id', 'en'];

        foreach ($locales as $locale) {
            // Main Pages
            $sitemap->add(Url::create(route('home', ['locale' => $locale]))
                ->setPriority(1.0)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY));

            $sitemap->add(Url::create(route('about', ['locale' => $locale]))
                ->setPriority(0.8)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

            $sitemap->add(Url::create(route('contact', ['locale' => $locale]))
                ->setPriority(0.8)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

            $sitemap->add(Url::create(route('gallery', ['locale' => $locale]))
                ->setPriority(0.8)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));

            // Services
            $sitemap->add(Url::create(route('services.batching', ['locale' => $locale]))
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

            $sitemap->add(Url::create(route('services.construction', ['locale' => $locale]))
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

            $sitemap->add(Url::create(route('services.asphalt', ['locale' => $locale]))
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

            // Dynamic Projects
            $sitemap->add(Url::create(route('projects.index', ['locale' => $locale]))
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));

            Project::all()->each(function (Project $project) use ($sitemap, $locale) {
                $sitemap->add(Url::create(route('projects.show', ['locale' => $locale, 'id' => $project->id]))
                    ->setLastModificationDate($project->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.7));
            });

            // Dynamic Articles
            $sitemap->add(Url::create(route('articles.index', ['locale' => $locale]))
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY));

            Article::published()->get()->each(function (Article $article) use ($sitemap, $locale) {
                $sitemap->add(Url::create(route('articles.show', ['locale' => $locale, 'slug' => $article->slug]))
                    ->setLastModificationDate($article->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.7));
            });
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info("Sitemap generated successfully with " . count($sitemap->getTags()) . " URLs.");
    }
}
