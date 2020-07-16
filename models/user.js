const bcrypt = require('bcrypt');
const mongoConnect = require('./dbConnect');
const assert = require('assert');

let mdb;
mongoConnect()
    .then(connect => mdb = connect.db)
    .catch(err => console.error('MongoDB connection doesn\'t works: ', err));

class User {
    static async createNewUser(user) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(user.password, saltRounds);
        const dbUser = {
            ...user,
            password: hash
        }

        const r = await mdb.collection('users').insertOne(dbUser);
        assert.equal(1, r.insertedCount);

        return `${r.insertedCount} users added`;
    }
}

module.exports = User;