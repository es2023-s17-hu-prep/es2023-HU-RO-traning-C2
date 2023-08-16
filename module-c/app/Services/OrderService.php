<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Cache;

class OrderService extends Service
{
    /**
     * Fetch orders for multiple restaurants
     * @param $ids
     * @return array|\Illuminate\Support\Collection
     */
    public function fetchByRestaurantIds($ids) {
        try {
            return Cache::remember('orders_' . json_encode($ids), 10, function () use ($ids) {
                return collect($ids)->map(fn($id) => $this->fetchByRestaurantId($id))->filter(fn($r) => count($r) > 0)->keyBy(fn($restaurant) => $restaurant[0]['restaurant_id']);
            });
        } catch (\Exception) {
            return [];
        }
    }

    /**
     * Fetch orders by restaurant id
     * @param $id
     * @return array|mixed
     */
    public function fetchByRestaurantId($id) {
        try {
            return Cache::remember('order_' . $id, 10, function () use ($id) {
                $result = $this->get(config('services.order.baseUrl') . '/orders?restaurant_id=' . $id, [
                    'headers' => ['Content-Type' => 'application/json']
                ]);
                return json_decode($result->getBody()->getContents(), true);
            });
        } catch (\Exception) {
            return [];
        }
    }

    /**
     * Place an order
     * @param $userId
     * @param $restaurantId
     * @param $items
     * @return void
     */
    public function placeOrder($userId, $restaurantId, $items)
    {
        $result = $this->post(config('services.order.baseUrl') . '/orders', [
            'headers' => ['Content-Type' => 'application/json'],
            'body' => json_encode([
                'restaurant_id' => (int) $restaurantId,
                'user_id' => $userId,
                'date' => Carbon::now()->format("Y-m-d"),
                'order_items' => $items
            ])
        ]);
        return json_decode($result->getBody()->getContents(), true);
    }
}
