const config = require('./config');

module.exports = require('knex')({
  client: 'pg',
  connection: {
    user: config.database.dbUser,
    host: config.database.dbHost,
    database: config.database.db,
    password: config.database.dbPass,
    port: config.database.dbPort,
  },
});
