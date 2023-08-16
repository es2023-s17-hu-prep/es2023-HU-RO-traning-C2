<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Log\Logger;

abstract class Service
{
    protected Client $client;
    protected Logger $logger;

    public function __construct(Logger $logger, Client $client)
    {
        $this->logger = $logger;
        $this->client = $client;
    }

    public function post(...$params)
    {
        try {
            $this->logger->debug('Sending post request');
            return $this->client->post(...$params);
        } catch (\Exception $exception) {
            $this->logger->error($exception);
            throw $exception;
        }
    }

    public function get(...$params)
    {
        try {
            $this->logger->debug('Sending get request');
            return $this->client->get(...$params);
        } catch (\Exception $exception) {
            $this->logger->error($exception);
            throw $exception;
        }
    }
}
