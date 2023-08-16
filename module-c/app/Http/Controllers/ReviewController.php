<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ReviewController extends Controller
{
    public function create(Request $request, $restaurantId) {
        logger("POST /v1/restaurant/" . $restaurantId . "/review");
        $details = $request->validate([
            "rating" => "required|numeric",
            "comment" => "required|string|max:500"
        ]);

        $response = Http::post("http://unsecure:5004/reviews", [
            "restaurant_id" => $restaurantId,
            "name" => auth()->user()->name,
            "date" => now()->toString(),
            "rating" => $details["rating"],
            "comments" => $details["comment"]
        ]);
        if ($response->status() !== 200)
            return response(null, 400);
        cache()->clear();
        return response(null, 201);
    }
}
