/**
 * Sample model. Note that the DAO (Sequelize) may
 * create multiple tables/sequences to represent the
 * entirety of this model.
 *
 * In this example, the model is composed of a single
 * UUID attribute.
 */

const uuidv4 = require('uuid/v4');

module.exports = (orm, DataTypes) => {
  const TableName = orm.define('TableName', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
  }, {
    indexes: [],
  });

  return TableName;
};
