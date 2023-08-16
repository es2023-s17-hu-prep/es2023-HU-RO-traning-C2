<?php

use Egulias\EmailValidator\EmailValidator;
use Faker\Core\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Concerns\FilterEmailValidation;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

function get_user_from_bearer(string $bearer)
{

    /// Find out how to get the token from the bearer
    $token = "somehow";
    $resp = Http::accept('application/json')->post(
        "http://unsafe:5006/authenticate",
        [
            "token" => $token,
        ]
    );
    return $resp->json();
}

Route::prefix("/v1")->group(function () {
    Route::post("/login", function (Request $request) {

        if (is_null($request->email) || is_null($request->password)) {
            return response(['error' => 'Invalid Request'], 400);
        }
        $resp = Http::accept('application/json')->post(
            "http://unsecure:5006/authenticate",
            [
                "email" => $request->email,
                "password" => $request->password,
            ]
        );
        $json = $resp->json();

        if (!$resp->successful()) {
            return response(['error' => 'Unauthorized'], 401);
        }

        return response(["token" => $json["token"]], 201);
    });

    Route::post("/register", function (Request $request) {

        if (is_null($request->email) || is_null($request->password) || is_null($request->name)) {
            return response(['error' => 'Invalid Request'], 400);
        }
        $resp = Http::accept('application/json')->post(
            "http://unsecure:5006/register",
            [
                "name" => $request->name,
                "email" => $request->email,
                "password" => $request->password,
            ]
        );
        $json = $resp->json();

        if (!$resp->successful()) {
            return response(['error' => 'Invalid Request'], 400);
        }

        $resp = Http::accept('application/json')->post(
            "http://unsecure:5006/authenticate",
            [
                "email" => $request->email,
                "password" => $request->password,
            ]
        );
        $json = $resp->json();

        if (!$resp->successful()) {
            return response(['error' => 'Invalid Request'], 400);
        }


        return response(["token" => $json["token"]], 201);
    });



    Route::get("/restaurant/{id}", function (Request $request, string $id) {
        $response = [];

        $information = Http::get(
            "http://unsecure:5001/restaurants?restaurant_id=" . $id,
        );

        if (!$information->successful()) {
            return response(['error' => 'Restaurant not found'], 404);
        }


        $response["name"] = $information["name"];
        $response["description"] = $information["description"];

        $ratings_response = Http::get(
            "http://unsecure:5004/reviews?restaurant_id=" . $id,
        );



        if ($ratings_response->successful()) {
            $ratings = [];

            $total = 0;
            $count = 0;
            foreach ($ratings_response->json() as $key => $value) {
                $ratings[$key] = [
                    "id" => $value["review_id"],
                    "reviewer" => $value["user_name"],
                    "rating" => $value["rating"],
                    "comment" => $value["comment"],
                ];
                $total = $total + $value["rating"];
                $count = $count + 1;
            }
            $response["ratings"] = $ratings;
            $response["averageRating"] = $total / $count;
        }
        $menu_response = Http::get(
            "http://unsecure:5002/menu-items?restaurant_id=" . $id,

        );

        if ($menu_response->successful()) {
            $menu = [];

            foreach ($menu_response->json() as $key => $value) {
                $menu[$key] = [
                    "id" => $value["menu_id"],
                    "name" => $value["dish_name"],
                    "price" => $value["price"],
                ];
            }
            $response["menuItems"] = $menu;
        }

        return response()->json($response);
    });

    Route::post("/restaurant/{id}/review", function (Request $request, string $id) {
        $bearer = $request->header("Authorization");
        return response()->json(get_user_from_bearer($bearer));

        $resp = Http::accept('application/json')->post(
            "http://unsecure:5004/reviews",
            [
                "review_id" => 6,
                "restaurant_id" => $id,
                "user_name" => "asdfasdf",
                "rating" => $request->rating,
                "comment" => $request->comment
            ]
        );
        if ($resp->successful()) {
            return response("Review successfully added", 201);
        }
        return response("Invalid request", 200);
    });

    Route::post("/restaurant/{id}/order", function (Request $request, string $id) {
        $items = [];

        foreach ($request->json()->order_items as $key => $value) {
            $items[$key] = [
                "menuId" => $value["menuItemId"],
                "quantity" => $value["quantity"]
            ];
        }

        $resp = Http::accept('application/json')->post(
            "http://unsecure:5005/orders",
            [
                ///TODO: find out how to split a string so I can get the token and find the user
                "user_id" => 1,
                //find out how to get the current date
                "date" => new Date(),
                "restaurant_id" => $id,
                "order_items" => $items
            ]
        );
        if ($resp->successful()) {
            return response("Review successfully added", 201);
        }
        return response("Invalid request", 200);
    });
});

// {
//     "email": "linda.martinez@example.com",
//     "password": "lindamar"
// }