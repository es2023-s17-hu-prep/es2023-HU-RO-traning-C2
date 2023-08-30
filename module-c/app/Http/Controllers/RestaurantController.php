<?php

namespace App\Http\Controllers;

use App\Events\OrderPlacedEvent;
use App\Events\ReviewAddedEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class RestaurantController extends Controller
{
    /**
     * Search for a restaurant
     */
    public function search(Request $request)
    {
        $query = $request->query('query');
        logger('Search for restaurants', ['query' => $query]);

        $restaurants = $this->fetchRestaurants();
        $orders = $this->fetchOrdersForAllRestaurants($restaurants->pluck('restaurant_id'));

        // Map the response
        return $restaurants->filter(fn($r) => !$query || Str::contains($r->name, $query, true))->map(fn($r) => [
            'id' => $r->restaurant_id,
            'name' => $r->name,
            'description' => $r->description,
            'visited' => $orders->get($r->restaurant_id)?->count() > 0 ?? false,
            'averageRating' => $this->getAverageRating($r->restaurant_id)
        ])->values();
    }

    /**
     * Show a restaurant's details
     */
    public function show($restaurantId)
    {
        logger('Show restaurant details', ['restaurantId' => $restaurantId]);

        $restaurant = $this->fetchRestaurantById($restaurantId);
        if ($restaurant === null) {
            return response(['message' => 'Not found'], 404);
        }

        return [
            'id' => $restaurant->restaurant_id,
            'name' => $restaurant->name,
            'description' => $restaurant->description,
            'averageRating' => $this->getAverageRating($restaurantId),
            'ratings' => $this->fetchReviewsForRestaurant($restaurantId)->map(fn($r) => [
                'id' => $r->review_id,
                'reviews' => $r->user_name,
                'rating' => $r->rating,
                'comment' => $r->comment
            ]),
            'menuItems' => $this->fetchMenuItemsForRestaurant($restaurantId)->map(fn($i) => [
                'id' => $i->menu_id,
                'name' => $i->dish_name,
                'price' => $i->price
            ])
        ];
    }

    /**
     * Submit a review
     */
    public function review($restaurantId, Request $request)
    {
        logger('Review a restaurant', ['restaurantId' => $restaurantId]);
        $data = $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'required|string'
        ]);

        $response = Http::post(sprintf("%s/reviews", config('services.review.baseUrl')), [
            ...$data,
            'review_id' => Str::uuid(),
            'restaurant_id' => (int)$restaurantId,
            'date' => Carbon::now()->format('Y-m-d'),
            'user_name' => $request->user()->name
        ]);

        if ($response->failed()) {
            logger('Review failed', ['restaurantId' => $restaurantId]);
            return response(['message' => 'Invalid request'], 400);
        }

        // Emit event
        ReviewAddedEvent::dispatch($restaurantId);

        logger('Review saved', ['restaurantId' => $restaurantId]);
        return response(['message' => 'Review successfully added'], 201);
    }

    /**
     * Make an order
     */
    public function order($restaurantId, Request $request)
    {
        logger('Order from a restaurant', ['restaurantId' => $restaurantId]);
        $data = $request->validate([
            'items' => 'required|array',
            'items.*.menuItemId' => 'required|string',
            'items.*.quantity' => 'required|numeric|min:1',
        ]);

        $response = Http::post(sprintf("%s/orders", config('services.order.baseUrl')), [
            'order_items' => collect($data['items'])->map(fn($i) => [
                'menuId' => $i['menuItemId'],
                'quantity' => $i['quantity']
            ]),
            'restaurant_id' => (int)$restaurantId,
            'date' => Carbon::now()->format('Y-m-d'),
            'user_id' => $request->user()->user_id
        ]);

        // Check for errors
        if ($response->failed()) {
            logger('Order failed', ['restaurantId' => $restaurantId]);
            return response(['message' => 'Invalid request'], 400);
        }

        // Emit event
        OrderPlacedEvent::dispatch($restaurantId);

        logger('Order saved', ['restaurantId' => $restaurantId]);
        return response(['message' => 'Order successfully placed'], 201);
    }

    /**
     * Get the orders for all restaurants by id
     */
    private function fetchOrdersForAllRestaurants(\Illuminate\Support\Collection $ids)
    {
        return $ids->map(fn($id) => $this->fetchOrdersForRestaurant($id))
            ->filter(fn($r) => $r->count() > 0)
            ->keyBy(fn($r) => $r[0]->restaurant_id);
    }

    /**
     * Get the orders for a restaurant by id
     */
    private function fetchOrdersForRestaurant($id)
    {
        // Cache the response
        return Cache::remember('orders_' . $id, 30, function () use ($id) {
            logger('Fetching the orders for a restaurant', ['id' => $id]);
            $response = Http::get(sprintf("%s/orders", config('services.order.baseUrl')), ['restaurant_id' => $id]);

            // Check if the response failed
            if ($response->failed()) {
                logger('Failed to fetch orders for a restaurant', ['id' => $id]);
                return collect([]);
            }

            logger('Fetched the orders for a restaurant', ['id' => $id]);
            return collect(json_decode($response->body()));
        });
    }

    /**
     * Get the reviews for a restaurant by id
     */
    private function fetchReviewsForRestaurant($id)
    {
        // Cache the response
        return Cache::remember('reviews_' . $id, 30, function () use ($id) {
            logger('Fetching the reviews for a restaurant', ['id' => $id]);
            $response = Http::get(sprintf("%s/reviews", config('services.review.baseUrl')), ['restaurant_id' => $id]);

            // Check if the response failed
            if ($response->failed()) {
                logger('Failed to fetch reviews for a restaurant', ['id' => $id]);
                return collect([]);
            }

            logger('Fetched the reviews for a restaurant', ['id' => $id]);
            return collect(json_decode($response->body()));
        });
    }

    /**
     * Get the average rating of a restaurant by id
     * @param $restaurant_id
     * @return int
     */
    private function getAverageRating($restaurant_id)
    {
        $reviews = $this->fetchReviewsForRestaurant($restaurant_id);
        return $reviews->average(fn($r) => $r->rating);
    }

    /**
     * Get all the restaurants
     */
    private function fetchRestaurants()
    {
        // Cache the restaurants
        return Cache::remember('restaurants', 30, function () {
            logger('Fetch all restaurants');
            $response = Http::get(config('services.restaurant.baseUrl') . '/restaurants');

            if ($response->failed()) {
                logger('Fetch all restaurants failed');
                return collect([]);
            }

            return collect(json_decode($response->body()));
        });
    }

    private function fetchRestaurantById($id)
    {
        // Cache the restaurants
        return Cache::remember('restaurant_' . $id, 30, function () use ($id) {
            logger('Fetch restaurant', ['id' => $id]);
            $response = Http::get(config('services.restaurant.baseUrl') . '/restaurants', ['restaurant_id' => $id]);

            if ($response->failed()) {
                logger('Fetch restaurant failed', ['id' => $id]);
                return null;
            }

            return json_decode($response->body());
        });
    }

    /**
     * Gets the menu items of a restaurants
     */
    private function fetchMenuItemsForRestaurant($id)
    {
        // Cache the response
        return Cache::remember('menu_' . $id, 30, function () use ($id) {
            logger('Fetching the menu items for a restaurant', ['id' => $id]);
            $response = Http::get(sprintf("%s/menu-items", config('services.menu.baseUrl')), ['restaurant_id' => $id]);

            // Check if the response failed
            if ($response->failed()) {
                logger('Failed to fetch menu items for a restaurant', ['id' => $id]);
                return collect([]);
            }

            logger('Fetched the menu items for a restaurant', ['id' => $id]);
            return collect(json_decode($response->body()));
        });
    }
}
