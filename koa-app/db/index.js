const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
import config from '../config';

export const db = {};

const sequelize = new Sequelize('postgres', 'postgres', null, {
  host: config.postgresHost,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0
  }
});


fs
  .readdirSync(__dirname + '/models')
  .filter(file => file.indexOf('mock') === -1)
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, '/models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default sequelize;