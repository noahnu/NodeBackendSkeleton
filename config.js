/**
 * Loads application configuration from environment
 * variables and supplied environment file.
 */

const dotenv = require('dotenv');
const portfinder = require('portfinder');

/**
 * Returns true if a string matches a "truthy"
 * value.
 *
 * @param {string} key Environment variable name
 * @param {*} defaultValue Default value if variable isn't defined
 */
const envToBoolean = (key, defaultValue) => {
  if (!Object.hasOwnProperty.call(process.env, key)) {
    return defaultValue;
  }

  const truthy = ['true', 't', 'yes', 'y', '1']
    .includes(process.env[key].toLowerCase());

  return truthy;
};

module.exports = async () => {
  /* Import settings from a config file if it exists. */
  dotenv.config({
    path: process.env.CONFIG_PATH || './.env',
  });

  /* Settings for webserver. */
  const server = {
    port: process.env.PORT || 8000,
    port_auto: envToBoolean('PORT_AUTO', false),
  };

  /* Settings for DAO/persistent storage. */
  const storage = {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || 'postgres',
    sync: envToBoolean('DB_SYNC', true),
  };

  /* Override webserver port if PORT_AUTO is true. */
  if (server.port_auto) server.port = await portfinder.getPortPromise();

  return {
    DEBUG: process.env.NODE_ENV !== 'production',
    server,
    storage,
  };
};
