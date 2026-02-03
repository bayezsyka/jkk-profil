<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConcretePriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prices = [
            ['code' => 'B.0', 'name' => 'B.0', 'price' => 785000],
            ['code' => 'K-100', 'name' => 'K-100', 'price' => 800000],
            ['code' => 'K-125', 'name' => 'K-125', 'price' => 810000],
            ['code' => 'K-150', 'name' => 'K-150', 'price' => 830000],
            ['code' => 'K-175', 'name' => 'K-175', 'price' => 850000],
            ['code' => 'K-200', 'name' => 'K-200', 'price' => 865000],
            ['code' => 'K-225', 'name' => 'K-225', 'price' => 880000],
            ['code' => 'K-250', 'name' => 'K-250', 'price' => 895000],
            ['code' => 'K-275', 'name' => 'K-275', 'price' => 915000],
            ['code' => 'K-300', 'name' => 'K-300', 'price' => 930000],
            ['code' => 'K-350', 'name' => 'K-350', 'price' => 980000],
            ['code' => 'K-400', 'name' => 'K-400', 'price' => 1045000],
            ['code' => 'K-450', 'name' => 'K-450', 'price' => 1085000],
            ['code' => 'K-500', 'name' => 'K-500', 'price' => 1145000],
            ['code' => 'FC-10', 'name' => 'FC-10', 'price' => 825000],
            ['code' => 'FC-15', 'name' => 'FC-15', 'price' => 860000],
            ['code' => 'FC-20', 'name' => 'FC-20', 'price' => 895000],
            ['code' => 'FC-25', 'name' => 'FC-25', 'price' => 930000],
            ['code' => 'FC-30', 'name' => 'FC-30', 'price' => 985000],
            ['code' => 'FS-35', 'name' => 'FS-35', 'price' => 895000],
            ['code' => 'FS-38', 'name' => 'FS-38', 'price' => 960000],
            ['code' => 'FS-41', 'name' => 'FS-41', 'price' => 990000],
            ['code' => 'FS-45', 'name' => 'FS-45 (Fast Track 4 Hari)', 'price' => 1040000],
        ];

        foreach ($prices as $index => $price) {
            \App\Models\ConcretePrice::updateOrCreate(
                ['code' => $price['code']],
                [
                    'name' => $price['name'],
                    'price' => $price['price'],
                    'order' => $index + 1,
                ]
            );
        }
    }
}
