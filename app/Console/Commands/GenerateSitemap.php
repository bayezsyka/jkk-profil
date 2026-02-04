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
        $sitemap = Sitemap::create()
            ->add(Url::create('/'))
            ->add(Url::create('/id'))
            ->add(Url::create('/en'))
            ->add(Url::create('/id/tentang-kami'))
            ->add(Url::create('/id/services/batching-plant'))
            ->add(Url::create('/id/services/construction'))
            ->add(Url::create('/id/services/asphalt-mixing-plant'))
            ->add(Url::create('/id/galeri'))
            ->add(Url::create('/id/projek'))
            ->add(Url::create('/id/artikel'));

        // Add Projects
        Project::all()->each(function (Project $project) use ($sitemap) {
            $sitemap->add(Url::create("/id/projek/{$project->id}")
                ->setLastModificationDate($project->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority(0.8));
        });

        // Add Articles
        Article::published()->get()->each(function (Article $article) use ($sitemap) {
            $sitemap->add(Url::create("/id/artikel/{$article->slug}")
                ->setLastModificationDate($article->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority(0.9));
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');
    }
}
