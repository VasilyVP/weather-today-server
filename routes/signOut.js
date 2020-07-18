const router = require('express').Router();
//const Auth = require('../middleware/authentication');

router.get('/', (req, res, next) => {
    res.clearCookie('jwt');
    res.end();
})

module.exports = router;