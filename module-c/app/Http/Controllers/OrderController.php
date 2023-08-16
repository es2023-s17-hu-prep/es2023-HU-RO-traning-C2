<?php

namespace App\Http\Controllers;

use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    private function is_string_numeric(string $str): bool {
        for ($i = 0; $i < strlen($str); $i++)
            if (chr($str[$i]) < chr("0") || chr($str[$i]) > chr("9"))
                return false;
        return true;
    }

    public function create(Request $request, $restaurantId) {
        logger("POST /v1/restaurant/" . $restaurantId . "/order");

        // validation
        $items = $request->all();
        if (!is_array($items))
            return response(null, 400);
        try {
            foreach ($items as $order) {
                if (
                    !is_string($order["menuItemId"]) ||
                    strlen($order["menuItemId"]) > 255 ||
                    !$this->is_string_numeric($order["menuItemId"]) || 
                    !is_integer($order["quantity"])
                )
                    return response(null, 400);
            }
        } catch (ErrorException $ex) {
            return response(null, 400);
        }

        $response = Http::post("http://unsecure:5005/orders", [
            "restaurant_id" => $restaurantId,
            "user_id" => auth()->user()->id,
            "date" => now()->toString(),
            "order_items" => collect($items)->map(fn ($item) => [
                "menuId" => (int)$item["menuItemId"],
                "quantity" => (int)$item["quantity"]
            ])
        ]);
        if ($response->status() !== 200)
            return response(null, 400);
        return response(null, 201);
    }
}
