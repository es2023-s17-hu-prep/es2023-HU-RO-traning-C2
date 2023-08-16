<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Create an order
     */
    public function store(Request $request, int $restaurantId)
    {
        info('Create a new order');
        // validate the request
        $validator = Validator::make($request->all(), [
            '*.menuItemId' => 'required|string',
            '*.quantity' => 'required|numeric|gt:-1'
        ]);

        // failed validation
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // transform the menu items
        $menuItems = collect($request->all())->map(function ($i) {
            return [
                'menuId' => $i['menuItemId'],
                'quantity' => $i['quantity'],
            ];
        });

        // post the order
        info('Making the order');
        $response = Http::post('http://localhost:5005/orders', [
            "restaurant_id" => $restaurantId,
            "user_id" => $request->user()['user_id'],
            "date" => now(),
            'order_items' => $menuItems
        ]);

        // post failed
        if ($response->failed()) {
            info('The order service is inaccessible.');
            return response()->noContent(400);
        }

        // success
        info('Successful order');
        return response()->json(['message' => 'Order successfully placed'], 201);
    }
}
