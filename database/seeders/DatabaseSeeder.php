<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin JKK',
            'email' => 'a@a.com',
            'password' => \Illuminate\Support\Facades\Hash::make('123'),
        ]);

        $this->call([
            OrganizationSeeder::class,
        ]);

        // Blog Seeder
        $categories = collect(['Beton', 'Aspal', 'Konstruksi Umum', 'Alat Berat', 'Tutorial'])->map(function ($name) {
            return \App\Models\Category::create([
                'name' => $name,
                'slug' => \Illuminate\Support\Str::slug($name),
                'description' => "Informasi dan panduan lengkap mengenai teknik sipil kategori $name.",
            ]);
        });

        \App\Models\Article::factory(20)->make()->each(function ($article) use ($user, $categories) {
            $article->user_id = $user->id;
            $article->category_id = $categories->random()->id;
            $article->save();
        });
    }
}
