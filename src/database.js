require('dotenv').config();

const { DB_PASSWORD, DB_NAME, DB_CLUSTER, DB_USERNAME } = process.env;

const dbIdentity = `${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${dbIdentity}?retryWrites=true&w=majority`;

module.exports = { dbIdentity, connectionString };
