/**
 * The Webserver at its core is an express instance, with
 * each aspect of its configuration grouped together into
 * webserver submodules, such as policies and routes.
 */

const express = require('express');

const policies = require('./policies');
const routes = require('./routes');

/**
 * Configures and launches an instance of the API webserver.
 *
 * @param {object} config options
 * @param {object} orm a connected and authenticated DAO instance
 * @param {object} orm.models a collection of ORM models
 * @return {Promise} result of express.listen
 */
async function initialize (config, orm) {
  const server = express();

  /* Load webserver submodules. Order is critical. */
  await policies(server);
  await routes(server, orm, { DEBUG: config.DEBUG });

  return new Promise(resolve => server.listen(config.server.port, resolve));
}

module.exports = {
  initialize,
};
