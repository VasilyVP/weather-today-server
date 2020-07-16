const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'weather_today';

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