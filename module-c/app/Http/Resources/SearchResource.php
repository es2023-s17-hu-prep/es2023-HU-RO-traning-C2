<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;

class SearchResource extends JsonResource
{
    public static function getAverageRating($id)
    {
        // fetching the reviews endpoint
        info('Fetching the reviews endpoint');
        $reviewsResponse = Http::get('http://unsecure:5004/reviews?restaurant_id=' . $id);

        // fetch failed
        if ($reviewsResponse->failed()) {
            info('Fetch failed');
            return 0;
        }

        // calculate the average rating
        $reviewsResponse = $reviewsResponse->collect();

        $sum = 0;
        foreach ($reviewsResponse as $review) {
            $sum += $review['rating'];
        }

        // return the average rating
        return $sum /= $reviewsResponse->count();
    }

    public static function getVisited($id, $userId)
    {
        // fetching the reservations endpoint
        info('Fetching the reservations endpoint');
        $reservationsResponse = Http::get('http://unsecure:5005/orders?restaurant_id=' . $id);

        // fetch failed
        if ($reservationsResponse->failed()) {
            info('Fetch failed');
            return false;
        }

        // check
        return $reservationsResponse->collect()->some(fn ($r) => $r['user_id'] == $userId);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this['restaurant_id'],
            'name' => $this['name'],
            'description' => $this['description'],
            'averageRating' => $this->getAverageRating($this['restaurant_id']),
            'visited' => $this->getVisited($this['restaurant_id'], $request->user()['user_id']),
        ];
    }
}
