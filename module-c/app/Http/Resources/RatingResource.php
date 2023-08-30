<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'review_id' => $this['review_id'],
            'reviewer' => $this['user_name'],
            'rating' => $this['rating'],
            'comment' => $this['comment'],
        ];
    }
}
