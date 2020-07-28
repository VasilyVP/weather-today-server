# weather-today-server
It's back-end part of the example application: https://weather.vasily.dev

Client part is in the weather-today-client repository.

## Technical story:
Server provides static assets and realizes application's api:
1) User's api: registration, sign in and sign out, delete user account;
2) Weather: provides raw weather data. It's two steps process:
    1. Request third party geolocation by IP service to define country and city of the client,
    2. Request third party weather service to receive weather forecast data for that location;
3) Authentication: based om JWT simple approach (no refresh token used).
4) Logging functionality:
    1. Morgan logger writes access errors to the file;
    2. App errors and other exceptions write's to another log file;
    3. PM2 write's application stdout stream.

## Server architecture:
1) AWS EC2: NGINX as proxy -> NodeJS with Express as app server under the PM2 management.
2) Mongo Atlas: it's remote MongoDB.