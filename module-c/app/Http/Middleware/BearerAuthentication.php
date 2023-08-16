<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class BearerAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasHeader("Authorization")) {
            $token = (string)$request->headers->get("Authorization");
            $response = Http::post("http://unsecure:5006/authenticate", [
                "token" => substr($token, strlen("Bearer "))
            ]);
            if ($response->status() === 200) {
                $user = new User;
                $user->id = $response["user_id"];
                $user->name = $response["name"];
                $user->email = $response["email"];
                auth()->setUser($user);
                return $next($request);
            }
        }

        return response(null, 401);
    }
}
