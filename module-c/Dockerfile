FROM webdevops/php-nginx-dev:8.2
WORKDIR /app
COPY ./ ./
RUN composer install
RUN chown -R application:application /app
