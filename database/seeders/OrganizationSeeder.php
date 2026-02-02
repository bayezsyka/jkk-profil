<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $director = \App\Models\OrganizationMember::create([
            'name' => 'Afif Zamroni',
            'role' => 'about.structure.roles.director',
        ]);

        $mgrBatching = \App\Models\OrganizationMember::create([
            'name' => 'Mashuri',
            'role' => 'about.structure.roles.mgr_batching',
            'parent_id' => $director->id,
        ]);

        $pm1 = \App\Models\OrganizationMember::create([
            'name' => 'Sudirman, ST.',
            'role' => 'about.structure.roles.pm',
            'parent_id' => $director->id,
        ]);

        $pm2 = \App\Models\OrganizationMember::create([
            'name' => 'Masruri, ST.',
            'role' => 'about.structure.roles.pm',
            'parent_id' => $director->id,
        ]);

        \App\Models\OrganizationMember::create([
            'name' => 'M Amien',
            'role' => 'about.structure.roles.admin',
            'parent_id' => $mgrBatching->id,
        ]);

        \App\Models\OrganizationMember::create([
            'name' => 'Casmadi',
            'role' => 'about.structure.roles.mgr_equipment',
            'parent_id' => $mgrBatching->id,
        ]);

        $mgrFinance = \App\Models\OrganizationMember::create([
            'name' => 'Dini Noviyanti',
            'role' => 'about.structure.roles.mgr_finance',
            'parent_id' => $pm1->id,
        ]);

        \App\Models\OrganizationMember::create([
            'name' => 'Adib',
            'role' => 'about.structure.roles.finance',
            'parent_id' => $mgrFinance->id,
        ]);

        \App\Models\OrganizationMember::create([
            'name' => 'Sahirul Faoji',
            'role' => 'about.structure.roles.executor',
            'parent_id' => $pm2->id,
        ]);
    }
}
