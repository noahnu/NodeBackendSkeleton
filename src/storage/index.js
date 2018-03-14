/**
 * Configures the Data Access Object to manage persistent data
 * for the application.
 */

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

/**
 * Initializes a sequelize instance, loads models, and connects
 * using the passed in credentials.
 *
 * @param {object} options
 * @param {boolean} options.DEBUG indicates application is in DEBUG mode
 * @param {object} options.storage database configuration options
 */
async function initialize ({ DEBUG, storage }) {
  const { host, user, password, name, dialect } = storage;
  const orm = new Sequelize(name, user, password, {
    host,
    dialect,
  });

  /* Automatically import models by searching the current
   * directory for the .model.js suffix. Since associations
   * are added after processing these files, the order the files
   * are read in is not critical. */
  fs.readdirSync(__dirname).forEach((fileName) => {
    /* Skip files which do not match the expected suffix. */
    if (fileName.endsWith('.model.js')) {
      orm.import(path.resolve(__dirname, fileName));
    }
  });

  /* Associations */
  /* TODO: Add any table associations here
   * (or in a submodule to be imported). */

  await orm.authenticate();

  /* A forced sync may potentially drop all data in the database. */
  await orm.sync({ force: DEBUG && storage.sync });

  return orm;
}

module.exports = {
  initialize,
};
