<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

/**
 * Public routes
 */
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

/**
 * Protected routes
 */
Route::middleware('auth.bearer')->group(function () {
    Route::get('/search', [RestaurantController::class, 'search']);
    Route::get('/restaurant/{id}', [RestaurantController::class, 'show']);
    Route::post('/restaurant/{restaurantId}/review', [ReviewController::class, 'store']);
    Route::post('/restaurant/{restaurantId}/order', [OrderController::class, 'store']);
});
