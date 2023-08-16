<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(Request $request) {
        logger("POST /v1/login");
        $credentials = $request->validate([
            "email" => "required|email|max:255",
            "password" => "required|max:255"
        ]);

        $response = Http::post("http://unsecure:5006/authenticate", $credentials);
        if ($response->status() === 401)
            return response("Unauthorized", 401);
        return response([
            "token" => $response->json("token")
        ]);
    }

    public function register(Request $request) {
        logger("POST /v1/register");
        $credentials = $request->validate([
            "email" => "required|email|max:255",
            "password" => "required|max:255",
            "name" => "required|max:255"
        ]);

        $response = Http::post("http://unsecure:5006/register", [
            "name" => $credentials["name"],
            "email" => $credentials["email"],
            "password" => $credentials["password"]
        ]);
        if ($response->status() !== 201)
            return response(null, 400);

        $response = Http::post("http://unsecure:5006/authenticate", $credentials);
        return response([
            "token" => $response->json("token")
        ]);
    }
}
