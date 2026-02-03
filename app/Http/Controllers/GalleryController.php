<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index($locale)
    {
        $projects = Project::with('images')
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Gallery/Index', [
            'projects' => $projects,
        ]);
    }
}
