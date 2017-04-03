'use strict';

module.exports = function(sequelize, DataTypes) {
  const role = sequelize.define('role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    project: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id'
      },
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
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        role.belongsTo(models.project, {
          foreignKey: 'project',
          as: 'projects'
        });
        role.hasMany(models.permissions, {
          foreignKey: 'role'
        });
        role.belongsToMany(models.user, {
          foreignKey: 'roleId',
          through: 'usersRole',
          as: 'role'
        });
        role.hasMany(models.usersRole, {
          foreignKey: 'roleId'
        });
      },
      paranoid: true
    }
  });
  return role;
};
