'use strict';

module.exports = function(sequelize, DataTypes) {
  const projectModules = sequelize.define('projectModules', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projectId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdBy: {
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
        projectModules.belongsTo(models.project);
      }
    },
    paranoid: true
  });
  return projectModules;
};
