# weather-today-server
It's back-end part of the example application: https://weather.vasily.dev

Client part is in the weather-today-client repository.

Technical story:
Server provides static assets and realizes application's api:
1) User's api: registration, sign in and sign out, delete user account;
2) Weather: provides raw weather data. It's two steps process:
    a) Request third party geolocation by IP service to define country and city of the client,
    b) Request third party weather service to receive weather forecast data for that location;
3) Authentication: based om JWT simple approach (no refresh token used).

Also there is logging functionality: Morgan writes access errors to the file and app errors and other exceptions write's to another log file. In addition PM2 write's application stdout stream.

Server architecture:
1) AWS EC2: NGINX as proxy -> NodeJS with Express as app server under the PM2 management.
2) Mongo Atlas: it's remote MongoDB.