<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Cache;

class MenuService extends Service
{
    /**
     * Fetch menu items by a restaurant id
     * @param $id
     * @return array|mixed
     */
    public function fetchByRestaurantId($id)
    {
        try {
            return Cache::remember('menu_' . $id, 10, function () use ($id) {
                $result = $this->get(config('services.menu.baseUrl') . '/menu-items?restaurant_id=' . $id, [
                    'headers' => ['Content-Type' => 'application/json']
                ]);
                return json_decode($result->getBody()->getContents(), true);
            });
        } catch (\Exception) {
            return [];
        }
    }
}
