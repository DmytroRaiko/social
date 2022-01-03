const config = require('./config');

module.exports = require('knex')({
  client: 'pg',
  connection: {
    user: config.dbUser,
    host: config.dbHost,
    database: config.db,
    password: config.dbPass,
    port: config.dbPort,
  },
});
