<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConcretePriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prices = \App\Models\ConcretePrice::orderBy('order')->get();

        return \Inertia\Inertia::render('Admin/ConcretePrices/Index', [
            'prices' => $prices,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(\Illuminate\Http\Request $request, \App\Models\ConcretePrice $concretePrice)
    {
        $validated = $request->validate([
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ]);

        $concretePrice->update($validated);

        return redirect()->back()->with('success', 'Harga berhasil diperbarui.');
    }
}
