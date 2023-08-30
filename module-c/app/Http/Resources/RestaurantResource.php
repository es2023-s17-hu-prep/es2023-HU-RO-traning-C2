<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // fetch the menu items
        info('Fetch the menu items');
        $menuItems = Http::get('http://unsecure:5002/menu-items?restaurant_id=' . $this['restaurant_id']);

        if ($menuItems->failed()) {
            info('Fetch failed');
            $menuItems = [];
        } else {
            info('Fetch success');
            $menuItems = $menuItems->collect();
        }

        // fetch the menu items
        info('Fetch the ratings');
        $reviews = Http::get('http://unsecure:5004/reviews?restaurant_id=' . $this['restaurant_id']);

        if ($reviews->failed()) {
            info('Fetch failed');
            $reviews = [];
        } else {
            info('Fetch success');
            $reviews = $reviews->collect();
        }

        return [
            'id' => $this['restaurant_id'],
            'name' => $this['name'],
            'description' => $this['description'],
            'averageRating' => SearchResource::getAverageRating($this['restaurant_id']),
            'menuItems' => MenuItemResource::collection($menuItems),
            'ratings' => RatingResource::collection($reviews),
        ];
    }
}
