//const fs = require('fs');
const unirest = require('unirest');
const GeoAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

class Weather {
    static async getWeather(ip) {
        const result = await Weather.getCoordsByIP(ip);
        const { latitude, longitude, city, country_code2 } = result;

        return new Promise((resolve, reject) => {
            unirest.get("https://community-open-weather-map.p.rapidapi.com/forecast")
                .query({
                    "units": "metric",
                     //"lat": latitude,
                     //"lon": longitude,
                    "q": `${city},${country_code2}`
                })
                .headers({
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": "e65f82894emshe65a07dd4868420p1fb4d1jsn49ad1fd7ccf3",
                    "useQueryString": true
                })
                .then(res => {
                    resolve(res.body);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static async getCoordsByIP(ip) {
        return new Promise((resolve, reject) => {
            const ipApi = new GeoAPI('1f073ba52a6b47e48206ca52db993d8b');

            if (process.env.NODE_ENV !== 'production') ip = '46.39.55.218';

            const params = new GeolocationParams();
            params.setIPAddress(ip);

            ipApi.getGeolocation(
                geoObj => {
                    if (geoObj.latitude) resolve(geoObj);
                    else reject('Can\'t receive geo data by IP');
                }, params
            );
        });
    }
}

module.exports = Weather;