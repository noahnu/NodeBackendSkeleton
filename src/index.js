/**
 * Application entry for a template of a backend demo.
 *
 * This is the only file which imports the configuration file.
 * All other modules and functions must have the necessary configuration
 * parameters passed as function arguments. This is to encourage modularity.
 */

const webserver = require('./webserver');
const configuration = require('../config');
const storage = require('./storage');

Promise.resolve().then(async function () {
  const config = await configuration();

  /* The initialized and connected DAO is passed as an argument
   * to any modules or functions that require database access. Models
   * are manipulated via an ORM scheme, via orm.models. */
  const orm = await storage.initialize(config);
  await webserver.initialize(config, orm);

  console.log(`Listening on http://localhost:${config.server.port}.`);
});
