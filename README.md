# weather-today-server
It's back-end part of the example application: https://weather.vasily.dev

Client part is in the weather-today-client repository.

Technical story:
Server provides static assets and realizes application api's:
1) User api: registration, sign in and sign out, delete user account;
2) Weather: serve raw weather data. It's two steps process:
    a) Third party IP geolocation request to define country and city of the client
    b) Third party weather service request to receive weather forecast data for that location;
3) Authentication: based om JWT simple approach (no refresh token used).

Also there is logging functionality: by Morgan with access erros writes to file and app errors and other exceptions writes to another log file. In addition PM2 writes application stdout stream.

Server architecture:
1) AWS EC2: NGINX -> NodeJS with Express under the PM2 management.
2) Mongo Atlas: remote MongoDB.