<?php

namespace Database\Seeders;

use App\Models\ConcretePrice;
use Illuminate\Database\Seeder;

class ConcretePriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prices = [
            ['code' => 'B.0', 'name' => 'B.0', 'price' => 785000, 'order' => 1],
            ['code' => 'K-100', 'name' => 'K-100', 'price' => 800000, 'order' => 2],
            ['code' => 'K-125', 'name' => 'K-125', 'price' => 810000, 'order' => 3],
            ['code' => 'K-150', 'name' => 'K-150', 'price' => 830000, 'order' => 4],
            ['code' => 'K-175', 'name' => 'K-175', 'price' => 850000, 'order' => 5],
            ['code' => 'K-200', 'name' => 'K-200', 'price' => 865000, 'order' => 6],
            ['code' => 'K-225', 'name' => 'K-225', 'price' => 880000, 'order' => 7],
            ['code' => 'K-250', 'name' => 'K-250', 'price' => 895000, 'order' => 8],
            ['code' => 'K-275', 'name' => 'K-275', 'price' => 915000, 'order' => 9],
            ['code' => 'K-300', 'name' => 'K-300', 'price' => 930000, 'order' => 10],
            ['code' => 'K-350', 'name' => 'K-350', 'price' => 980000, 'order' => 11],
            ['code' => 'K-400', 'name' => 'K-400', 'price' => 1045000, 'order' => 12],
            ['code' => 'K-450', 'name' => 'K-450', 'price' => 1085000, 'order' => 13],
            ['code' => 'K-500', 'name' => 'K-500', 'price' => 1145000, 'order' => 14],
            ['code' => 'FC-10', 'name' => 'FC-10', 'price' => 825000, 'order' => 15],
            ['code' => 'FC-15', 'name' => 'FC-15', 'price' => 860000, 'order' => 16],
            ['code' => 'FC-20', 'name' => 'FC-20', 'price' => 895000, 'order' => 17],
            ['code' => 'FC-25', 'name' => 'FC-25', 'price' => 930000, 'order' => 18],
            ['code' => 'FC-30', 'name' => 'FC-30', 'price' => 985000, 'order' => 19],
            ['code' => 'FS-35', 'name' => 'FS-35', 'price' => 895000, 'order' => 20],
            ['code' => 'FS-38', 'name' => 'FS-38', 'price' => 960000, 'order' => 21],
            ['code' => 'FS-41', 'name' => 'FS-41', 'price' => 990000, 'order' => 22],
            ['code' => 'FS-45', 'name' => 'FS-45 (Fast Track 4 Hari)', 'price' => 1040000, 'order' => 23],
        ];

        foreach ($prices as $price) {
            ConcretePrice::updateOrCreate(
                ['code' => $price['code']],
                $price
            );
        }
    }
}
