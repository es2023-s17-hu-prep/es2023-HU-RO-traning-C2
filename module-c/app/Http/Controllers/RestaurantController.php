<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Returns the restaurant details
     */
    public function show($id)
    {
        // fetching the restaurants endpoint
        info('Fetching the restaurants endpoint');
        $restaurantsResponse = Http::get('http://unsecure:5001/restaurants?restaurant_id=' . $id);

        // fetch failed
        if ($restaurantsResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // success
        info('Returning the restaurants');
        return new RestaurantResource($restaurantsResponse->collect());
    }

    /**
     * Creates an order
     */
    public function order(Request $request, $id)
    {
        info('Hitting the order create endpoint');

        // validate the incoming request
        $validator = Validator::make($request->all(), [
            '*.menuItemId' => 'required|string',
            '*.quantity' => 'required|numeric',
        ]);

        // if the validator fails
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // fetching the order create endpoint
        info('Fetching the order create endpoint');
        $orderResponse = Http::post('http://unsecure:5005/orders', [
            'user_id' => $request->user()['user_id'],
            'date' => now(),
            'restaurant_id' => $id,
            'order_items' => $request->collect()->map(fn ($m) => [
                'menu_id' => $m['menuItemId'],
                'quantity' => $m['quantity']
            ])
        ]);

        // fetch failed
        if ($orderResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // successful
        info('Successful');
        return response()->json(['message' => 'Order successfully placed'], 201);
    }

    /**
     * Creates a review
     */
    public function review(Request $request, $id)
    {
        info('Hitting the review create endpoint');

        // validate the incoming request
        $validator = Validator::make($request->all(), [
            'comment' => 'required|string',
            'rating' => 'required|numeric',
        ]);

        // if the validator fails
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // fetching the review create endpoint
        info('Fetching the review create endpoint');
        $orderResponse = Http::post('http://unsecure:5004/reviews', [
            'name' => $request->user()['name'],
            'date' => now(),
            'restaurant_id' => $id,
            'rating' => $request->get('rating'),
            'comment' => $request->get('comment'),
        ]);

        // fetch failed
        if ($orderResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        // successful
        info('Successful');
        return response()->json(['message' => 'Review successfully added'], 201);
    }
}
