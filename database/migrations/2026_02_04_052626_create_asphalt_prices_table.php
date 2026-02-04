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
        Schema::create('asphalt_prices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price_loco', 12, 0);
            $table->decimal('price_tergelar', 12, 0);
            $table->string('unit')->default('TON');
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
        Schema::dropIfExists('asphalt_prices');
    }
};
