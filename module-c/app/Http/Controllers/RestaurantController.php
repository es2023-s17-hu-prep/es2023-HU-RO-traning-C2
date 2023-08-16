<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantDetailResource;
use App\Http\Resources\SearchResource;
use Illuminate\Console\CacheCommandMutex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class RestaurantController extends Controller
{
    /**
     * Searches for restaurants
     */
    public function search(Request $request)
    {
        info('Hitting the search endpoint');

        // get the search term from the query param
        info('Getting the query from the query param');
        $searchTerm = strtolower($request->query('query', ''));

        // no search term provided
        if (!$searchTerm) {
            info('No search term provided');
            return response()->json(['message' => 'No search term provided'], 400);
        }

        // getting the restaurant data
        $restaurantsData = [];

        if (Cache::has('restaurant')) {
            info('The restaurants have been found in the cache');
            $restaurantsData = Cache::get('restaurant');
        } else {
            info('Fetch the restaurants');
            $restaurantsResponse = Http::get('http://localhost:5001/restaurants');

            // fetching was unsuccessful
            if ($restaurantsResponse->failed()) {
                info('Failed to fetch the restaurants');
            }

            $restaurantsData = $restaurantsResponse->collect();

            // cache the restaurants
            info('Cache the restaurants');
            Cache::put('restaurant', $restaurantsData, 60);
        }

        // filtering
        info('Search through the restaurants');
        $restaurants = $restaurantsData
            ->filter(fn ($r) => str_contains(strtolower($r['name']), $searchTerm))
            ->values();

        info('Return the restaurants');
        return SearchResource::collection($restaurants);
    }

    /**
     * Restaurant details
     */
    public function show(int $id)
    {
        info('Hitting the restaurant details endpoint');

        // fetching the restaurant endpoint
        info('Fetch the restaurant by id');
        $restaurantsResponse = Http::get('http://localhost:5001/restaurants?restaurant_id=' . $id);

        // fetch failed -> not found
        if ($restaurantsResponse->clientError()) {
            info('Restaurant not found');
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // fetch failed
        if ($restaurantsResponse->serverError()) {
            info('Failed to fetch the restaurant');
            return response()->noContent(400);
        }

        // success
        info('Return the restaurant');
        return new RestaurantDetailResource($restaurantsResponse->collect());
    }
}
