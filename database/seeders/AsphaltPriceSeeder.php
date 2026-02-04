<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsphaltPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prices = [
            [
                'name' => 'SANDSHEET A',
                'price_loco' => 1600000,
                'price_tergelar' => 1750000,
                'unit' => 'TON',
                'order' => 1,
            ],
            [
                'name' => 'SANDSHEET B',
                'price_loco' => 1550000,
                'price_tergelar' => 1700000,
                'unit' => 'TON',
                'order' => 2,
            ],
            [
                'name' => 'HRS',
                'price_loco' => 1475000,
                'price_tergelar' => 1625000,
                'unit' => 'TON',
                'order' => 3,
            ],
            [
                'name' => 'ACWC',
                'price_loco' => 1275000,
                'price_tergelar' => 1450000,
                'unit' => 'TON',
                'order' => 4,
            ],
            [
                'name' => 'ACBC',
                'price_loco' => 1250000,
                'price_tergelar' => 1425000,
                'unit' => 'TON',
                'order' => 5,
            ],
            [
                'name' => 'AC Base',
                'price_loco' => 1225000,
                'price_tergelar' => 1375000,
                'unit' => 'TON',
                'order' => 6,
            ],
        ];

        foreach ($prices as $price) {
            \App\Models\AsphaltPrice::create($price);
        }
    }
}
