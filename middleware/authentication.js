const JWT = require('jsonwebtoken');

const secret = 'secret key'; // just 'simple' string for this simple app

class Authentication {
    static async getJWT(user) {
        return new Promise((resolve, reject) => {
            JWT.sign(user, secret, {
                //expiresIn: '1h'
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }

    static setTokenCookie(res, token) {
        res.cookie('jwt', token, {
            httpOnly: true,
        })
    }

    static async setJWTCookie(user, res) {
        const token = await Authentication.getJWT(user);
        Authentication.setTokenCookie(res, token);
    }

    static async verifyJWT(jwt) {
        return new Promise((resolve, reject) => {
            JWT.verify(jwt, secret, (err, user) => {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    static async authentication(req, res, next) {
        const jwt = req.cookies.jwt;
        if (jwt) {
            const user = await Authentication.verifyJWT(jwt);
            req.user = user;
        }
        next();
    }
}

module.exports = Authentication;