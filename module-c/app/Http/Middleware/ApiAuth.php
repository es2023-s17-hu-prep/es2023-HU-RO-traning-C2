<?php

namespace App\Http\Middleware;

use App\Services\UserService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ApiAuth
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $this->userService->checkToken(Str::remove('Bearer ', $request->header("Authorization")));
        if(!$user) {
            return \response(['message' => 'Invalid token'], 401);
        }
        $request->setUserResolver(function () use ($user) {
            return $user;
        });
        return $next($request);
    }
}
