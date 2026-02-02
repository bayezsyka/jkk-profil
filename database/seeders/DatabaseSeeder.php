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
        User::factory()->create([
            'name' => 'Admin JKK',
            'email' => 'admin@jkk.com',
            'password' => \Illuminate\Support\Facades\Hash::make('jkk@2026'),
        ]);

        $this->call([
            OrganizationSeeder::class,
        ]);
    }
}
