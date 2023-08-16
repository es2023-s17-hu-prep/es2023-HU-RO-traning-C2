<?php

namespace App\Services;

class UserService extends Service
{
    /**
     * Authenticates a user by email and password
     * @param $email
     * @param $password
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \Exception
     */
    public function authenticate($email, $password) {
        return $this->post(config('services.user.baseUrl') . '/authenticate', [
            'body' => json_encode(compact('email', 'password')),
            'headers' => ['Content-Type' => 'application/json']
        ]);
    }

    /**
     * Checks if a JWT is valid by calling the service endpoint
     * @param $token
     * @return false|mixed
     */
    public function checkToken($token) {
        try {
            $response = $this->post(config('services.user.baseUrl') . '/authenticate', [
                'body' => json_encode(compact('token',)),
                'headers' => ['Content-Type' => 'application/json']
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            $this->logger->warning('Invalid token');
            return false;
        }
    }

    /**
     * Registers a new user
     * @param $email
     * @param $password
     * @param $name
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \Exception
     */
    public function register($email, $password, $name)
    {
        return $this->post(config('services.user.baseUrl') . '/register', [
            'body' => json_encode(compact('email', 'password', 'name')),
            'headers' => ['Content-Type' => 'application/json']
        ]);
    }
}
