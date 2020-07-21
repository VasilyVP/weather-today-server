const MongoClient = require('mongodb').MongoClient;
const config = require('../data/config.json');

const url = config.MDB_URL;
const dbName = config.DB_NAME;

const options = {
    useUnifiedTopology: true
};

module.exports = () => {
    return new Promise((resolve, reject) => {
        new MongoClient(url, options).connect()
            .then(client => {
                resolve({
                    client: client,
                    db: client.db(dbName)
                })
            })
            .catch(err => reject(err));
    })
}