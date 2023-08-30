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
        $response = Http::post(
            sprintf("%s/authenticate", config('services.user.baseUrl')),
            ['token' => $request->bearerToken()]
        );

        if($response->failed()){
            return response(['message' => 'Unauthenticated'], 401);
        }

        $request->setUserResolver(fn () => json_decode($response->body()));

        return $next($request);
    }
}
