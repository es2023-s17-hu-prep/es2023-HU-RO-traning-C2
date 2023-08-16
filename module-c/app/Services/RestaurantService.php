<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Cache;

class RestaurantService extends Service
{
    /**
     * Returns all restaurants
     * @return mixed
     * @throws \Exception
     */
    public function all()
    {
        return Cache::remember('restaurants', 10, function () {
            $result = $this->get(config('services.restaurant.baseUrl') . '/restaurants', [
                'headers' => ['Content-Type' => 'application/json']
            ]);
            return json_decode($result->getBody()->getContents(), true);
        });
    }

    /**
     * Fetches a restaurant by id
     * @param $restaurantId
     * @return mixed|null
     */
    public function fetchById($restaurantId)
    {
        try {
            return Cache::remember('restaurant_' . $restaurantId, 10, function () use ($restaurantId) {
                $result = $this->get(config('services.restaurant.baseUrl') . '/restaurants?restaurant_id=' . $restaurantId, [
                    'headers' => ['Content-Type' => 'application/json']
                ]);
                return json_decode($result->getBody()->getContents(), true);
            });
        } catch (\Exception) {
            return null;
        }
    }
}
