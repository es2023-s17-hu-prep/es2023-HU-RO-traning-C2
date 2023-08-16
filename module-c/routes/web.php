<?php

use Illuminate\Support\Facades\Route;

// --------------
// Public routes
// --------------

// Login
Route::post('login', [\App\Http\Controllers\AuthController::class, 'authenticate']);

// Sign Up
Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);



// --------------
// Private (protected) routes
// --------------

Route::middleware('api-auth')->group(function (){
    // Search
    Route::get('search', [\App\Http\Controllers\SearchController::class, 'index']);

    // Restaurant details
    Route::get('restaurant/{restaurantId}', [\App\Http\Controllers\RestaurantController::class, 'index']);

    // Review create
    Route::post('restaurant/{restaurantId}/reviews', [\App\Http\Controllers\ReviewController::class, 'store']);

    // Order create
    Route::post('restaurant/{restaurantId}/order', [\App\Http\Controllers\OrderController::class, 'store']);
});
