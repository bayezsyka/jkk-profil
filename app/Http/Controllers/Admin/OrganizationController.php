<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrganizationMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrganizationController extends Controller
{
    public function index()
    {
        $members = OrganizationMember::with('parent')
            ->orderBy('parent_id')
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Organization/Index', [
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:organization_members,id',
            'order' => 'nullable|integer',
        ]);

        OrganizationMember::create($validated);

        return redirect()->back()->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function update(Request $request, OrganizationMember $organizationMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:organization_members,id|not_in:' . $organizationMember->id,
            'order' => 'nullable|integer',
        ]);

        $organizationMember->update($validated);

        return redirect()->back()->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(OrganizationMember $organizationMember)
    {

        // Re-assign children to parent of the deleted member
        OrganizationMember::where('parent_id', $organizationMember->id)
            ->update(['parent_id' => $organizationMember->parent_id]);

        $organizationMember->delete();

        return redirect()->back()->with('success', 'Anggota berhasil dihapus.');
    }
}
