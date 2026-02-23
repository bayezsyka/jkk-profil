<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::creating(function ($article) {
            if (!$article->slug) {
                $article->slug = Str::slug($article->title);
            }
        });

        static::updating(function ($article) {
            if ($article->isDirty('title') && !$article->isDirty('slug')) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    protected $fillable = [
        'category_id',
        'user_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'thumbnail',
        'status',
        'published_at',
        'seo_title',
        'seo_keywords',
        'views',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublished(Builder $query)
    {
        return $query->where('status', 'PUBLISHED')
            ->where('published_at', '<=', now());
    }

    protected function thumbnail(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                if (!$value) return null;
                // If it's already a complete URL, return it
                if (filter_var($value, FILTER_VALIDATE_URL)) {
                    return $value;
                }
                // If it already starts with /storage, return it
                if (str_starts_with($value, '/storage/')) {
                    return $value;
                }

                // Fix for legacy data: if it's just a filename, assume it's in 'articles' directory
                if (!str_contains($value, '/')) {
                    $value = 'articles/' . $value;
                }

                // Return the storage URL
                return \Illuminate\Support\Facades\Storage::disk('public')->url($value);
            }
        );
    }
}
