<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsphaltPrice extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price_loco',
        'price_tergelar',
        'unit',
        'description',
        'order',
    ];

    protected $casts = [
        'price_loco' => 'decimal:0',
        'price_tergelar' => 'decimal:0',
    ];
}
