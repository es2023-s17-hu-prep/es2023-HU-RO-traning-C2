<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        info('Getting the bearer token');
        // get the token from the header
        $token = $request->bearerToken();

        // if no token found
        if (!$token) {
            info('No token found in the header');
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // calling the auth endpoint
        info('Calling the authenticate endpoint');
        $response = Http::post('http://localhost:5006/authenticate', ['token' => $token]);

        // token is invalid
        if ($response->failed()) {
            info('Invalid token');
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // set the user resolver and return next
        $request->setUserResolver(fn () => $response->collect());
        info('Valid token');
        return $next($request);
    }
}
