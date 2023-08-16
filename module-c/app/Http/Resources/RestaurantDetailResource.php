<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;

class RestaurantDetailResource extends JsonResource
{
    public static function averageRating(int $restaurantId)
    {
        info('Fetch the reviews');
        // fetch the review
        $reviewResponse = Http::get('http://localhost:5004/reviews?restaurant_id=' . $restaurantId);

        // calculate the average rating
        $averageRating = 0;
        if ($reviewResponse->failed()) {
            info('Failed to fetch the reviews');
        } else {
            info('Calculating the average rating');
            $ratings = $reviewResponse->collect()->map(fn ($r) => $r['rating']);

            if ($ratings->count() > 0) {
                foreach ($ratings as $r) {
                    $averageRating += $r;
                }

                $averageRating /= $ratings->count();
                $averageRating = round($averageRating, 1);
            }
        }

        return $averageRating;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $id = $this['restaurant_id'];

        // menu items
        info('Fetch the menu items');
        $menuResponse = Http::get('http://localhost:5002/menu-items?restaurant_id=' . $id);
        $menuItems = [];

        if ($menuResponse->failed()) {
            info('Failed to fetch menu items');
        } else {
            $menuItems = $menuResponse->collect();
        }

        // ratings
        info('Fetch the ratings');
        $reviewResponse = Http::get('http://localhost:5004/reviews?restaurant_id=' . $id);
        $ratings = [];

        if ($reviewResponse->failed()) {
            info('Failed to fetch the ratings');
        } else {
            $ratings = $reviewResponse->collect();
        }

        return [
            'name' => $this['name'],
            'description' => $this['description'],
            'averageRating' => $this->averageRating($id),
            'menuItems' => MenuItemResource::collection($menuItems),
            'ratings' => RatingResource::collection($ratings),
        ];
    }
}
