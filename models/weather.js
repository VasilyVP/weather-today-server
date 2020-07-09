const fs = require('fs');

class Weather {
    static getWeather(cb) {
        fs.readFile(__dirname + '/../data/weather.json', 'utf8', (err, data) => {
            if (err) return cb(err);
            
            cb(null, data);
        });
    }
}

module.exports = Weather;