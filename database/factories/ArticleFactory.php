<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');
        $title = $faker->sentence();

        return [
            'category_id' => \App\Models\Category::factory(),
            'user_id' => \App\Models\User::factory(),
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'excerpt' => $faker->paragraph(),
            'content' => collect($faker->paragraphs(5))->map(fn($p) => "<p>$p</p>")->join(''),
            'thumbnail' => 'https://placehold.co/600x400',
            'status' => $this->faker->randomElement(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'seo_title' => $title,
            'seo_keywords' => implode(', ', $faker->words(5)),
            'views' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
