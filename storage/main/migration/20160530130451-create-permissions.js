'use strict';

const maindb = require('../models');
// console.log(maindb.Sequelize);
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;

module.exports = {
  up: () => {
    return queryInterface
      .createTable('permissions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        role: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'roles',
            key: 'id'
          }
        },
        module: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'projectModules',
            key: 'id'
          }
        },
        create: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        read: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        modify: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        delete: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
        }
      })
      .then(() => {
        return queryInterface.addIndex(
          'permissions', ['module', 'role'], {
            indexName: 'permissionKey',
            indicesType: 'UNIQUE'
          }
        );
      });
  },
  down: () => {
    return queryInterface.dropTable('permissions');
  }
};
