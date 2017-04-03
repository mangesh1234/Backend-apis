'use strict';

module.exports = function(sequelize, DataTypes) {
  const permissions = sequelize.define('permissions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    module: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projectModules',
        key: 'id'
      }
    },
    create: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    modify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        permissions.belongsTo(models.projectModules, {
          foreignKey: 'module',
          as: 'modules'
        });
        permissions.belongsTo(models.role, {
          foreignKey: 'role',
          as: 'roles'
        });
      }
    }
  });
  return permissions;
};
