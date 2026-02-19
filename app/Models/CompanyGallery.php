<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyGallery extends Model
{
    protected $fillable = [
        'title',
        'image_path',
        'order',
    ];
}
