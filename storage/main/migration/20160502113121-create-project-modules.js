'use strict';

const maindb = require('../models');
// console.log(maindb.Sequelize);
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;

module.exports = {
  up: () => {
    return queryInterface
      .createTable('projectModules', {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        projectId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'projects',
            key: 'id'
          }
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        updatedBy: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        createdBy: {
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
          'projectModules', ['name', 'projectId'], {
            indexName: 'uniqueModule',
            indicesType: 'UNIQUE'
          });
      });
  },
  down: () => {
    return queryInterface.dropTable('projectModules');
  }
};
