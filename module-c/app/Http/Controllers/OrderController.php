<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Places a new order for the current user
     */
    public function store(Request $request, OrderService $orderService, $restaurantId)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.quantity' => 'required|numeric|min:1',
            'items.*.menuItemId' => 'required|numeric',
        ]);

        try {
            $response = $orderService->placeOrder(
                $request->user()['user_id'],
                $restaurantId,
                collect($request->get('items'))->map(fn($item) => [
                    'menuId' => $item['menuItemId'],
                    'quantity' => $item['quantity']
                ])
            );
            return response(['message' => 'Order created'], 201);
        } catch (\Exception $e) {
            return response(['message' => 'Order failed'], 500);
        }
    }
}
