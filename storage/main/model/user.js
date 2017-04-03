'use strict';

const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.TEXT
    },
    salt: {
      type: DataTypes.TEXT
    },
    mobile: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.TEXT
    },
    country: {
      type: DataTypes.TEXT
    },
    pincode: {
      type: DataTypes.INTEGER
    },
    dob: {
      type: DataTypes.TEXT
    },
    age: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.TEXT
    },
     ClientMasterId: {
      type: DataTypes.INTEGER
    },
     CompanyName: {
      type: DataTypes.TEXT
    },
    createdBy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        user.belongsToMany(models.role, {
          foreignKey: 'userId',
          through: 'usersRole',
          as: 'role'
        });
        // user.belongsTo(models.role);
      }
    },
    instanceMethods: {
      encryptPassword: function(password) {
        if (!password)
          return false;
        this.salt = crypto.randomBytes(16).toString('base64');
        const salt = new Buffer(this.salt, 'base64');
        this.hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
      },
      authenticate: function(password) {
        const salt = new Buffer(this.salt, 'base64');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        return this.hashedPassword === hashedPassword;
      }
    }
  });
  return user;
};
