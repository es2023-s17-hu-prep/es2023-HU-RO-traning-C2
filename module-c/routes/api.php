<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\RestaurantsController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware("throttle:api")->group(function () {
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/register", [AuthController::class, "register"]);

    Route::middleware("auth.bearer")->group(function () {
        Route::get("/search", [RestaurantsController::class, "search"]);
        Route::get("/restaurant/{restaurantId}", [RestaurantsController::class, "get"]);
        Route::post("/restaurant/{restaurantId}/review", [ReviewController::class, "create"]);
        Route::post("/restaurant/{restaurantId}/order", [OrderController::class, "create"]);
    });
});