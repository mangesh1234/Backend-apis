'use strict';

const maindb = require('../models');
// console.log(maindb.Sequelize);
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;

module.exports = {
  up: () => {
    return queryInterface
      .createTable('roles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        project: {
          type: Sequelize.INTEGER,
          references: {
            model: 'projects',
            key: 'id'
          }
        },
        createdBy: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        updatedBy: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addIndex(
          'roles', ['name', 'project'], {
            indexName: 'uniqueRole',
            indicesType: 'UNIQUE'
          });
      });
  },
  down: () => {
    return queryInterface.dropTable('roles');
  }
};
