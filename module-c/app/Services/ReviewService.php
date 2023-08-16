<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ReviewService extends Service
{
    /**
     * Fetches multiple restaurant's reviews
     * @param $ids
     * @return array|\Illuminate\Support\Collection
     */
    public function fetchByRestaurantIds($ids)
    {
        try {
            return Cache::remember('reviews_' . json_encode($ids), 10, function () use ($ids) {
                return collect($ids)->map(fn($id) => $this->fetchByRestaurantId($id))->filter(fn($r) => count($r) > 0)->keyBy(fn($restaurant) => $restaurant[0]['restaurant_id']);
            });
        } catch (\Exception) {
            return [];
        }
    }

    /**
     * Fetches the reviews of a given restaurant
     * @param $id
     * @return array|mixed
     */
    public function fetchByRestaurantId($id)
    {
        try {
            return Cache::remember('review_' . $id, 10, function () use ($id) {
                $result = $this->get(config('services.review.baseUrl') . '/reviews?restaurant_id=' . $id, [
                    'headers' => ['Content-Type' => 'application/json']
                ]);
                return json_decode($result->getBody()->getContents(), true);
            });
        } catch (\Exception) {
            return [];
        }
    }

    /**
     * Stores a new review
     * @param $userName
     * @param $restaurantId
     * @param $rating
     * @param $comment
     * @return mixed
     * @throws \Exception
     */
    public function submitReview($userName, $restaurantId, $rating, $comment)
    {
        $result = $this->post(config('services.review.baseUrl') . '/reviews', [
            'headers' => ['Content-Type' => 'application/json'],
            'body' => json_encode([
                'review_id' => Str::uuid(),
                // The restaurant id has to be an integer
                'restaurant_id' => (int) $restaurantId,
                'user_name' => $userName,
                'date' => Carbon::now()->format("Y-m-d"),
                'rating' => $rating,
                'comment' => $comment
            ])
        ]);
        return json_decode($result->getBody()->getContents(), true);
    }
}
