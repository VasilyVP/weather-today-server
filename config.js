const envPath = process.env.cwd && process.env.cwd + '/.env';
const env = require('dotenv').config({ path: envPath }).parsed;


const logs = {
    "accessesWithErrorsLog": "/data/logs/accessesWithErrors.log",
    "errorsLog":"/data/logs/errors.log"
};

const MDB_URL = env.NODE_ENV === 'development' ? env.MDB_URL_DEV : env.MDB_URL_PROD;
const MDB_NAME = env.NODE_ENV === 'development' ? env.MDB_NAME_DEV : env.MDB_NAME_PROD;

module.exports = {
    ...env,
    ...logs,
    MDB_URL,
    MDB_NAME,
}
