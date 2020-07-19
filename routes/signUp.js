const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Auth = require('../middleware/authentication');

router.post('/', [
    body('firstName').isLength({ max: 20 }),
    body('lastName').isLength({ max: 20 }),
    body('email').isEmail(),
    body('password').isLength({ max: 20 }),
], async (req, res, next) => {
    try {
        if (!validationResult(req).isEmpty()) throw new Error();

        const user = req.body;
        const msg = await User.createNewUser(user);

        await Auth.setJWTCookie({
            email: user.email,
            firstName: user.firstName
        }, res);

        res.json({
            code: 201,
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