<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Login user endpoint
     */
    public function login(Request $request)
    {
        info('Hitting the login endpoint');

        // validate the incoming request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // if the validator fails
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // fetching the login endpoint
        info('Fetching the login endpoint');
        $loginResponse = Http::post('http://unsecure:5006/authenticate', $request->only(['email', 'password']));

        // fetch failed
        if ($loginResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // login successful
        info('Login successful');
        return response()->json(['token' => $loginResponse['token']]);
    }

    /**
     * Create a new user endpoint
     */
    public function register(Request $request)
    {
        info('Hitting the register endpoint');

        // validate the incoming request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        // if the validator fails
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // fetching the register endpoint
        info('Fetching the register endpoint');
        $registerResponse = Http::post('http://unsecure:5006/register', $request->only(['email', 'password', 'name']));

        // fetch failed
        if ($registerResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Email already exists'], 409);
        }

        // logging in
        info('Fetching the login endpoint');
        $loginResponse = Http::post('http://unsecure:5006/authenticate', $request->only(['email', 'password']));

        // login successful
        info('Login successful');
        return response()->json(['token' => $loginResponse['token']], 201);
    }
}
