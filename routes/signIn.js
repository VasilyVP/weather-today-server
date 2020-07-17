const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res, next) => {
    const user = req.body;
    try {
        const userData = await User.getUserDataByEmail(user.email);
        if (!userData) res.json({
            code: 401,
            msg: 'User not found'
        });

        const result = await User.checkPassword(user.password, userData.password);        
        if (result) {

            /* need add jwt */

            res.json({
                code: 200,
                msg: 'Passwords Ok',
                user: {
                    firstName: userData.firstName,
                    email: userData.email
                }
            });
        } else {
            res.json({
                code: 401,
                msg: 'Wrong password'
            })
        }
    } catch (err) {
        if (err.code === 'ERR_ASSERTION') {
            res.json({
                code: 401,
                msg: 'No user ' + user.email
            })
        } else {
            res.json({
                code: 500,
                msg: 'Internal server error'
            });
        }
    }
});

module.exports = router;