'use strict';

module.exports = {
  development: {
    storage: {
      main:{
        host: 'localhost',
        dialect: 'sqlite',
        storage: 'database.sqlite',
        databse:'database_development',
        password:null,
        username:null,
        collate: 'utf8_general_ci'
      }   
    },
      project: {
      name: 'services-dev',
      port: '9004',
      secrets: 'services - secret'
    }
  }
};