<?php

namespace App\Http\Controllers;

use App\Services\ReviewService;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Stores a new review
     */
    public function store(Request $request, ReviewService $reviewService, $restaurantId)
    {
        // Validate the request
        $request->validate([
            'rating' => 'required|numeric',
            'comment' => 'required|string'
        ]);

        try {
            // Call the review service with the appropriate data
            $reviewService->submitReview($request->user()['name'], $restaurantId, $request->get('rating'), $request->get('comment'));
            return response(['message' => 'Review created'], 201);
        } catch (\Exception $e) {
            return response(['message' => 'Review failed'], 500);
        }
    }
}
