<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    /**
     * Authenticates a user by email and password
     */
    public function authenticate(Request $request)
    {
        logger('Authenticating a user');
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $result = $this->login($data);

        if($result instanceof Response){
            return $result;
        }

        return response(['token' => $result], 200);
    }

    /**
     * Makes a login call to the upstream service
     */
    public function login($data)
    {
        $response = Http::post(
            sprintf("%s/authenticate", config('services.user.baseUrl')),
            $data
        );

        if($response->failed()){
            logger('Authentication failed');
            return response(['message' => 'Unauthorized'], 401);
        }

        $responseData = json_decode($response->body());
        logger('Authentication successful');
        return $responseData->token;
    }

    /**
     * Registers a new user, and returns the token for them
     */
    public function register(Request $request)
    {
        // Create a new user
        logger('Registration request');
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'name' => 'required|string'
        ]);

        $response = Http::post(
            sprintf("%s/register", config('services.user.baseUrl')),
            $data
        );

        if($response->failed()){
            logger('Registration failed failed');
            $response = json_decode($response->body(), true);
            return response($response, 400);
        }
        logger('Registration successful');

        // Log the user in
        $loginData = $this->login($data);
        if($loginData instanceof Response){
            return $loginData;
        }
        return response(['token' => $loginData], 201);
    }
}
