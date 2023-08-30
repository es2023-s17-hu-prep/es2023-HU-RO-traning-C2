<?php

namespace App\Listeners;

use App\Events\OrderPlacedEvent;
use App\Events\ReviewAddedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;

class ClearCache
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Clear cache belonging to the specified restaurant
     */
    public function handle(OrderPlacedEvent | ReviewAddedEvent $event): void
    {
        $id = $event->restaurantId;
        logger('Clearing cache for restaurant', ['id' => $id]);
        Cache::forget('restaurants');
        Cache::forget('restaurant_' . $id);
        Cache::forget('reviews_' . $id);
        Cache::forget('menu_' . $id);
        Cache::forget('orders_' . $id);
    }
}
