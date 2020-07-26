const express = require('express');
const router = express.Router();
const Weather = require('../models/weather')

/* GET weather.json */
router.get('/', async (req, res, next) => {
    try {
        
        console.log(req.ip);

        const weatherObj = await Weather.getWeather(req.ip);
        res.send(weatherObj);
    } catch (err) {

        console.log('router:');
        console.log(err);

        next(err);
    }
});

module.exports = router;