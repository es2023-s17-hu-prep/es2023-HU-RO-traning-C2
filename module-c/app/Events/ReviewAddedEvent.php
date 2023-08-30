<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Event for reviews added
 */
class ReviewAddedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $restaurantId;

    public function __construct($restaurantId)
    {
        $this->restaurantId = $restaurantId;
    }
}
