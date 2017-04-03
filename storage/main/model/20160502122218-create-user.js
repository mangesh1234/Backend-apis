'use strict';

const maindb = require('../models');
// console.log(maindb.Sequelize);
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;

module.exports = {
  up: () => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.TEXT
      },
      salt: {
        type: Sequelize.TEXT
      },
      mobile: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      country: {
        type: Sequelize.TEXT
      },
      pincode: {
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.TEXT
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
        type: Sequelize.TEXT
      },
      ClientMasterId: {
      type: Sequelize.INTEGER
    },
     CompanyName: {
      type: Sequelize.TEXT
    },
      createdBy: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      updatedBy: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable('users');
  }
};
