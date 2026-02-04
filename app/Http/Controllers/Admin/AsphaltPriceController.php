<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AsphaltPrice;
use Inertia\Inertia;

class AsphaltPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prices = AsphaltPrice::orderBy('order')->get();

        return Inertia::render('Admin/AsphaltPrices/Index', [
            'prices' => $prices,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AsphaltPrice $asphaltPrice)
    {
        $validated = $request->validate([
            'price_loco' => 'required|numeric|min:0',
            'price_tergelar' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ]);

        $asphaltPrice->update($validated);

        return redirect()->back()->with('success', 'Harga aspal berhasil diperbarui.');
    }
}
