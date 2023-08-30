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
        // get the token from the header
        $token = $request->bearerToken();

        // fetching the token endpoint
        info('Fetching the token endpoint');
        $tokenResponse = Http::post('http://unsecure:5006/authenticate', ['token' => $token]);

        // fetch failed
        if ($tokenResponse->failed()) {
            info('Fetch failed');
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->setUserResolver(fn () => $tokenResponse->collect());

        return $next($request);
    }
}
