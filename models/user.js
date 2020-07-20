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

    static async getUserDataByEmail(email) {
        const docs =  await mdb.collection('users').find({ email: email }).toArray();
        assert.equal(1, docs.length);

        return docs[0];
    }

    static async checkPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    static async deleteUser(email) {
        const r = await mdb.collection('users').deleteOne({ email: email });
        assert.equal(1, r.deletedCount);

        return r.deletedCount;
    }
}

module.exports = User;