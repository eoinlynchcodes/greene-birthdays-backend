const knex = require('knex');

const config = require('../greene-birthdays-backend/knexfile');

const db = knex(config.development);

module.exports = db;