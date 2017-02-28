'use strict';

module.exports = function(sequelize, DataTypes) {
  const admin = sequelize.define('admin', {
    email: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    role: DataTypes.TEXT
  
  });
  return admin;
};
