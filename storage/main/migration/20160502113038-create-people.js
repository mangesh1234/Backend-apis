'use strict';

const maindb = require('../models');
// console.log(maindb.Sequelize);
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;

module.exports = {
  up: () => {
    return queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      stakeholder: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      url: {
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
    });
  },
  down: () => {
    return queryInterface.dropTable('projects');
  }
};
