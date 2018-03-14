/**
 * Provides access to all webserver policy submodules.
 */

const security = require('./security');
const requests = require('./requests');

/**
 * Loads all policies onto webserver.
 *
 * @param {object} server express instance
 * @return {Promise} resolves when all policies have been loaded
 */
module.exports = async (server) => {
  await security(server);
  await requests(server);
};
