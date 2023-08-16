<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class RestaurantsController extends Controller
{
    public function search(Request $request) {
        logger("GET /v1/search");

        $query = Str::lower($request->query("query"));
        if (strlen($query) > 255)
            return [];
        if (cache()->has("search-" . $query))
            return response(cache()->get("search-" . $query));
        cache()->add(
            "search-" . $query, 
            collect(Http::get("http://unsecure:5001/restaurants")->json())
                ->filter(fn ($restaurant) => 
                    Str::contains(Str::lower($restaurant["name"]), $query)
                )
                ->map(function ($restaurant) {
                    if (cache()->has("reviews-" . $restaurant["restaurant_id"]))
                        $reviews = cache()->get("reviews-" . $restaurant["restaurant_id"]);
                    else {
                        $response = Http
                            ::withQueryParameters(["restaurant_id" => $restaurant["restaurant_id"]])
                            ->get("http://unsecure:5004/reviews");
                        if ($response->status() !== 200)
                            return response("reviews service is not working", 500);
                        cache()->add("reviews-" . $restaurant["restaurant_id"], collect($response->json()));
                        $reviews = cache()->get("reviews-" . $restaurant["restaurant_id"]);
                    }
                    $averageRating = 0;
                    foreach ($reviews as $review)
                        $averageRating += $review["rating"];
                    $averageRating /= $reviews->count();

                    return [
                        "id" => $restaurant["restaurant_id"],
                        "name" => $restaurant["name"],
                        "description" => $restaurant["cuisine"] . " food, located at " . $restaurant["location"],
                        "averageRating" => $averageRating,
                        "visited" => false
                    ];
                })
                ->values()
            );
        return response(cache()->get("search-" . $query));
    }

    public function get(Request $request, $restaurantId) {
        logger("GET /v1/restaurant/" . $restaurantId);
        if (cache()->has("restaurant-" . $restaurantId))
            return cache()->get("restaurant-" . $restaurantId);
        $response = Http::get("http://unsecure:5001/restaurants");
        if ($response->status() !== 200)
            return response("restaurants service is not working", 500);
        foreach ($response->json() as $restaurant) {
            if ($restaurant["restaurant_id"] == $restaurantId) {
                if (cache()->has("reviews-" . $restaurantId))
                    $reviews = cache()->get("reviews-" . $restaurantId);
                else {
                    $response = Http
                        ::withQueryParameters(["restaurant_id" => $restaurant["restaurant_id"]])
                        ->get("http://unsecure:5004/reviews");
                    if ($response->status() !== 200)
                        return response("reviews service is not working", 500);
                    cache()->add("reviews-" . $restaurantId, collect($response->json()));
                    $reviews = cache()->get("reviews-" . $restaurantId);
                }

                $averageRating = 0;
                foreach ($reviews as $review)
                    $averageRating += $review["rating"];
                $averageRating /= $reviews->count();

                $response = Http
                    ::withQueryParameters(["restaurant_id" => $restaurant["restaurant_id"]])
                    ->get("http://unsecure:5002/menu-items");
                if ($response->status() !== 200)
                    return response("menu service is not working", 500);
                $menuItems = collect($response->json());

                cache()->add("restaurant-" . $restaurantId, [
                    "name" => $restaurant["name"],
                    "averageRating" => $averageRating,
                    "description" => $restaurant["cuisine"] . " food, located at " . $restaurant["location"],
                    "menuItems" => $menuItems->map(fn ($menuItem) => [
                        "id" => $menuItem["menu_id"],
                        "name" => $menuItem["dish_name"],
                        "price" => $menuItem["price"]
                    ]),
                    "ratings" => $reviews->map(fn ($review) => [
                        "id" => $review["review_id"],
                        "reviewer" => $review["user_name"],
                        "rating" => $review["rating"],
                        "comment" => $review["comment"]
                    ])
                ]);
                return cache()->get("restaurant-" . $restaurantId);
            }
        }
        return response("not found", 404);
    }
}
