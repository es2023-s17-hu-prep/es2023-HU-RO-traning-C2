<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\RestaurantService;
use App\Services\ReviewService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    /**
     * Searches for restaurants by a query string. If the query string is empty, it returns all the restaurants
     */
    public function index(Request $request, RestaurantService $restaurantService, ReviewService $reviewService, OrderService $orderService)
    {
        try {
            // Fetch data
            $restaurants = collect($restaurantService->all());
            $reviews = $reviewService->fetchByRestaurantIds($restaurants->pluck('restaurant_id'));
            $orders = $orderService->fetchByRestaurantIds($restaurants->pluck('restaurant_id'));

            // Filter restaurants, and compose response
            return $restaurants->filter(fn($r) => str_contains(Str::lower($r['name']), Str::lower($request->query('query'))))
                ->map(function ($restaurant) use ($reviews, $orders, $request) {
                    return [
                        'id' => $restaurant['restaurant_id'],
                        'name' => $restaurant['name'],
                        'description' => $restaurant['description'] ?? "Lorem",
                        'averageRating' => collect($reviews[$restaurant['restaurant_id']] ?? [])->average(fn($r) => $r['rating']),
                        'visited' => collect($orders[$restaurant['restaurant_id']] ?? [])->some(fn($order) => $order['user_id'] == $request->user()['user_id'])
                    ];
                })->values();
        } catch (\Exception $e) {
            return response(['message' => 'Server Error'], 500);
        }
    }
}
