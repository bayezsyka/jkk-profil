<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin JKK',
            'email' => 'admin@jayakaryakontruksi.com',
            'password' => \Illuminate\Support\Facades\Hash::make('jkk@2026'),
        ]);

        $this->call([
            AsphaltPriceSeeder::class,
            ConcretePriceSeeder::class,
        ]);
    }
}
