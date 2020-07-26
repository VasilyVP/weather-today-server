const express = require('express');
const router = express.Router();
const Weather = require('../models/weather')

/* GET weather.json */
router.get('/', async (req, res, next) => {
    try {
        const weatherObj = await Weather.getWeather(req.ip);
        res.send(weatherObj);
    } catch (err) {
        next(err);
    }
});

module.exports = router;