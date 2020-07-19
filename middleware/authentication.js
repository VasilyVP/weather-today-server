const JWT = require('jsonwebtoken');
const validator = require('validator');

const secret = 'secret key'; // just 'simple' string for this simple app

class Authentication {
    static async getJWT(user) {
        return new Promise((resolve, reject) => {
            JWT.sign(user, secret, {
                expiresIn: '12h'
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }

    static setTokenCookie(res, token) {
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 12*60*60*1000 // 12 hours
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
        
        if (jwt && validator.isJWT(jwt)) {
            const user = await Authentication.verifyJWT(jwt);
            req.user = user;
        }
        next();
    }
}

module.exports = Authentication;