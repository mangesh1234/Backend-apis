'use strict';

const maindb = require('../models');
// console.log(maindb.Sequelize);
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;

module.exports = {
  up: () => {
    return queryInterface
      .createTable('usersRoles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id'
          }
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
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
        }
      })
      .then(() => {
        return queryInterface.addIndex(
          'usersRoles', ['roleId', 'userId'], {
            indexName: 'uniqueUser',
            indicesType: 'UNIQUE'
          });
      });
  },
  down: () => {
    return queryInterface.dropTable('usersRoles');
  }
};
