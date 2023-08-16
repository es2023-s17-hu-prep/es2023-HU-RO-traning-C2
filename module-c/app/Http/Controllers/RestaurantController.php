<?php

namespace App\Http\Controllers;

use App\Services\MenuService;
use App\Services\OrderService;
use App\Services\RestaurantService;
use App\Services\ReviewService;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    /**
     * Gets the details of a restaurant by id
     */
    public function index(Request $request, RestaurantService $restaurantService, ReviewService $reviewService, MenuService $menuService, $restaurantId)
    {
        try {
            // Fetch the restaurant
            $restaurant = $restaurantService->fetchById($restaurantId);

            // Check if the restaurant exists
            if($restaurant === null){
                return response(['message' => 'Not found'], 404);
            }

            // Fetch the reviews and menus
            $reviews = collect($reviewService->fetchByRestaurantId($restaurantId));
            $menus = collect($menuService->fetchByRestaurantId($restaurantId));

            // Compose the response
            return [
                'id' => $restaurant['restaurant_id'],
                'name' => $restaurant['name'],
                'description' => $restaurant['description'],
                'averageRating' => $reviews->average(fn($r) => $r['rating']),
                'ratings' => $reviews->map(fn($review) => ['id' => $review['review_id'], 'reviewer' => $review['user_name'], 'rating' => $review['rating'], 'comment' => $review['comment']]),
                'menuItems' => $menus->map(fn($item) => ['id' => $item['menu_id'], 'name' => $item['dish_name'], 'price' => $item['price']])
            ];
        } catch (\Exception $e) {
            return response(['message' => 'Server Error'], 500);
        }
    }
}
