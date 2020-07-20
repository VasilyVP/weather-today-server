const router = require('express').Router();
const User = require('../models/user');

let responseObj;

router.get('/', async (req, res, next) => {
    try {
       if (!req.user) throw Error();

       const count = await User.deleteUser(req.user.email);
       responseObj = {
           code: 200,
           msg: `${count} user(s) deleted`
       };
    } catch (err) {
        responseObj = {
            code: 401,
            msg: 'Unauthorized'
        };
    } finally {
        res.send(responseObj);
    }
})

module.exports = router;