<?php

namespace App\Http\Resources;

use Faker\Core\Number;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;

class SearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $id = $this['restaurant_id'];
        $username = $request->user()['name'];
        $visited = false;

        // check if the user visited this endpoint
        info('Fetch the reservations');
        $reservationResponse = Http::get('http://localhost:5003/reservation-details?restaurant_id=' . $id);

        if ($reservationResponse->failed()) {
            info('Failed to fetch the reservations');
        } else {
            info('Check if the user visited the restaurant');
            $visited = $reservationResponse->collect()->filter(fn ($r) => $r['user_name'] == $username)->count() > 0;
        }

        return [
            'id' => $id,
            'name' => $this['name'],
            'description' => $this['description'],
            'averageRating' => RestaurantDetailResource::averageRating($id),
            'visited' => $visited,
        ];
    }
}
