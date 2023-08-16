<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Authenticates users by email and password
     */
    public function authenticate(UserService $service, Request $request)
    {
        $request->validate(['email' => 'required|string', 'password' => 'required|string']);
        try {
            $response = $service->authenticate($request->get('email'), $request->get('password'));
            return response(json_decode($response->getBody()->getContents(), true), 200);
        } catch (ClientException $exception) {
            return response(json_decode($exception->getResponse()->getBody()->getContents(), true), 401);
        } catch (\Exception $exception){
            return response(['message' => 'Server Error'], 500);
        }
    }

    /**
     * Registers a new user, and logs it in
     */
    public function register(UserService $service, Request $request)
    {
        $request->validate(['email' => 'required|string|email', 'password' => 'required|string', 'name' => 'required|string']);
        try {
            $service->register($request->get('email'), $request->get('password'), $request->get('name'));
            $response = $service->authenticate($request->get('email'), $request->get('password'));
            return response(json_decode($response->getBody()->getContents(), true), 200);
        } catch (ClientException $exception) {
            $error = json_decode($exception->getResponse()->getBody()->getContents(), true);
            if($error['error'] === "Email already exists"){
                return response($error, 400);
            }
            return response($error, 401);
        } catch (\Exception $exception){
            return response(['message' => 'Server Error'], 500);
        }
    }
}
