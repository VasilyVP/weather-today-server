const express = require('express');
const router = express.Router();
const Weather = require('../models/weather')

/* GET weather.json */
router.get('/', async (req, res, next) => {
    try {
        const weatherObj = await Weather.getWeather(req.ip);
        res.send(weatherObj);
    } catch (err) {
        res.json({
            code: 500,
            msg: 'Internal server error'
        });
    }
});

module.exports = router;