const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res, next) => {
    const user = req.body;
    try {
        const msg = await User.createNewUser(user);
        res.json({
            code: 200,
            msg: msg
        });
    } catch (err) {
        if (err.code === 11000) {
            responseObj = {
                code: 11000,
                msg: `Email: ${err.keyValue.email} is already exist`
            }
        } else {
            responseObj = {
                code: 500,
                msg: 'Internal server error'
            }
        }
        res.json(responseObj);
    }
});

module.exports = router;