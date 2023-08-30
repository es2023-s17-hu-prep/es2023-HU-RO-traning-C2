<?php

use Illuminate\Http\Request;
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

Route::post('login', [\App\Http\Controllers\AuthController::class, 'authenticate']);
Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);

Route::middleware('auth.api')->group(function () {
    Route::get('search', [\App\Http\Controllers\RestaurantController::class, 'search']);
    Route::get('restaurant/{restaurantId}', [\App\Http\Controllers\RestaurantController::class, 'show']);
    Route::post('restaurant/{restaurantId}/review', [\App\Http\Controllers\RestaurantController::class, 'review']);
    Route::post('restaurant/{restaurantID}/order', [\App\Http\Controllers\RestaurantController::class, 'order']);
});
