/**
 * Security policies are configured in this module. In this
 * basic setup, helmet {@see https://helmetjs.github.io} is
 * used to automate most "good" security practices.
 */

const helmet = require('helmet');

async function policy(server) {
  /* Strips some identifiable information from HTTP headers,
   * minimizing the amount of information available to
   * attackers. Fingerprinting can easily overcome this,
   * however the less information supplied the better. */
  server.use(helmet.hidePoweredBy());

  /* Not a security policy, but part of the Helmet suite.
   * This tells browsers not to sniff response mimetypes
   * ensuring greater control over API responses. */
  server.use(helmet.noSniff());

  /* For privacy, only show address to same-origin. Useful
   * if executing redirects. May not be necessary for the
   * scope of this project. */
  server.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}

module.exports = policy;
