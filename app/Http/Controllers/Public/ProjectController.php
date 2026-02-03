<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index($locale)
    {
        // dd('Controller reached');
        $projects = Project::with('images')
            ->orderBy('date', 'desc')
            ->paginate(12);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function show($locale, $id)
    {
        $project = Project::with('images')->findOrFail($id);

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }
}
