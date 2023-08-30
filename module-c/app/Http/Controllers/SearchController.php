<?php

namespace App\Http\Controllers;

use App\Http\Resources\SearchResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SearchController extends Controller
{
    /**
     * Search endpoint
     */
    public function search(Request $request)
    {
        // get the query param
        $query = $request->query('query');

        // fetching the restaurants endpoint
        info('Fetching the restaurants endpoint');
        $restaurantsResponse = Http::get('http://unsecure:5001/restaurants?query=' . $query);

        // fetch failed
        if ($restaurantsResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Unable to access the microservice'], 500);
        }

        // success
        info('Returning the restaurants');
        return SearchResource::collection(
            $restaurantsResponse
                ->collect()
                ->filter(fn ($r) => !$query || str_contains(strtolower($r['name']), strtolower($query)))
        );
    }
}
