<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Login endpoint
     */
    public function login(Request $request)
    {
        info('Login request');
        // validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // on failed validation
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // call the auth endpoint
        info('Calling the authenticate endpoint');
        $response = Http::post('http://localhost:5006/authenticate', $request->only(['email', 'password']));

        // auth failed
        if ($response->failed()) {
            info('Invalid login credentials');
            return response()->noContent(401);
        }

        // success
        info('Successful login');
        return response()->json(['token' => $response['token']]);
    }

    /**
     * Register endpoint
     */
    public function register(Request $request)
    {
        info('Create a user');
        // validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:4|max:128',
            'email' => 'required|email',
            'password' => ['required', Password::default()]
        ]);

        // failed validation
        if ($validator->fails()) {
            info('Failed validator');
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        // create the user
        info('Posting the user');
        $response = Http::post('http://localhost:5006/register', $request->only(['name', 'email', 'password']));

        // email already exists
        if ($response->clientError()) {
            info('The email already exists');
            return response()->json(['message' => 'This email address already exists'], 409);
        }

        // inaccessible
        if ($response->failed()) {
            info('The user service is inaccessible.');
            return response()->noContent(400);
        }

        // --- login ---

        // call the auth endpoint
        info('Calling the authenticate endpoint');
        $response = Http::post('http://localhost:5006/authenticate', $request->only(['email', 'password']));

        // auth failed
        if ($response->failed()) {
            info('The user service is inaccessible.');
            return 'log';
            return response()->noContent(400);
        }

        // success
        info('Successful registration');
        return response()->json(['token' => $response->collect()['token']], 201);
    }
}
