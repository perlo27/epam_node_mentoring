const Sequelize = require('sequelize');

const host = process.env.mode === 'docker' ? 'db' : 'localhost';

export default new Sequelize('postgres', 'postgres', null, {
  host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0
  }
});