'use strict';
const umzag = require('umzug');
const maindb = require('./main/model');

const migratemaindb = new umzag({
  storage:'sequelize',
  storageOptions:{
    sequelize:maindb.sequelize
  },
  migrations:{
    path:'storage/main/migration'
  }
});
module.exports = () => {
  return migratemaindb.up();
};