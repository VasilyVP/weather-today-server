const express = require('express');
const router = express.Router();
const Weather = require('../models/weather')

/* GET weather.json */
router.get('/', (req, res, next) => {
    Weather.getWeather((err, weatherStr) => {
        if (err) return next(err);
        res.send(weatherStr);
    });    
});

module.exports = router;