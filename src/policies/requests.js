/**
 * Requests webserver submodule.
 *
 * Parses user HTTP requests into easily readable formats,
 * supporting various content types.
 */

const bodyParser =  require('body-parser');

async function policy(server) {
  /* urlencoded is standard for HTML POST forms (separate module can
   * can be imported to handle multipart forms), however for an API,
   * we are probably more interested in JSON. */
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
}

module.exports = policy;
