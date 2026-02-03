<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('concrete_prices', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // e.g., K-100
            $table->string('name'); // e.g., K-100
            $table->decimal('price', 12, 0); // e.g., 800000
            $table->string('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concrete_prices');
    }
};
