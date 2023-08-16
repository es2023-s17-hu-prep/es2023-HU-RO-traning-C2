<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Create a review
     */
    public function store(Request $request, int $restaurantId)
    {
        info('Create a new review');
        // validate the request
        $validator = Validator::make($request->all(), [
            'rating' => 'required|numeric',
            'comment' => 'required|string|min:4|max:1024'
        ]);

        // failed validation
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // create the review
        info('Posting the review');
        $response = Http::post('http://localhost:5004/reviews', [
            "restaurant_id" => $restaurantId,
            "name" => $request->user()['name'],
            "date" => now(),
            "rating" => $request->get('rating'),
            "comments" => $request->get('comment')
        ]);

        // failed review post
        if ($response->failed()) {
            info('The review service is inaccessible.');
            return response()->noContent(400);
        }

        // success
        info('Successful review');
        return response()->json(['message' => 'Review successfully added'], 201);
    }
}
