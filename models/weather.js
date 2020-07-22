const unirest = require('unirest');
const GeoAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');
const config = require('../data/private/config.json');

class Weather {
    static async getWeather(ip) {
        const result = await Weather.getCoordsByIP(ip);
        const { latitude, longitude, city, country_code2 } = result;

        return new Promise((resolve, reject) => {
            unirest.get(config.WEATHER_API)
                .query({
                    "units": "metric",
                     //"lat": latitude,
                     //"lon": longitude,
                    "q": `${city},${country_code2}`
                })
                .headers({
                    "x-rapidapi-host": config.RAPID_API_HOST,
                    "x-rapidapi-key": config.RAPID_API_KEY,
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
            const ipApi = new GeoAPI(config.GEO_API_KEY);

            if (process.env.NODE_ENV !== 'production') ip = config.TEST_IP;

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