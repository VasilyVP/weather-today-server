const { debugConnection } = require('../utils/utils');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');


const options = {
    useUnifiedTopology: true
};

module.exports = () => {
    return new Promise((resolve, reject) => {
        new MongoClient(config.MDB_URL, options).connect()
            .then(client => {
                debugConnection('MongoDB connected to ', config.MDB_NAME);

                resolve({
                    client: client,
                    db: client.db(config.MDB_NAME)
                })
            })
            .catch(err => reject(err));
    })
}
