<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'title',
        'location',
        'date',
        'category',
        'subcategory',
        'description',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }
}
