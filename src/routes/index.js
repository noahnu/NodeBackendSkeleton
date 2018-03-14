/**
 * Routes webserver submodule.
 *
 * Responsible for mapping URI paths to handlers.
 * Authorization middleware would be added here (specifically in
 * a submodule imported here).
 */

module.exports = async (server, orm, { DEBUG }) => {
  /**
   * A template route, to check for database connectivity.
   */
  server.get('/database', async (req, res) => {
    if (!DEBUG) {
      return res.code(404).end();
    }

    return res.json(await orm.models.TableName.findAll())
  });
};
