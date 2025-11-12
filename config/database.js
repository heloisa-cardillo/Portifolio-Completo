const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portfolio_db', 'root', '0412julius', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;