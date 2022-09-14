const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('next-blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
