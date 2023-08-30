<?php

use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * Auth endpoints
 */
Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);

/**
 * Protected endpoints
 */
Route::middleware('auth.header')->group(function () {
    Route::get('search', [SearchController::class, 'search']);

    // restaurant endpoints
    Route::prefix('restaurant/{id}')->group(function () {
        Route::get('/', [RestaurantController::class, 'show']);
        Route::post('/order', [RestaurantController::class, 'order']);
        Route::post('/review', [RestaurantController::class, 'review']);
    });
});
