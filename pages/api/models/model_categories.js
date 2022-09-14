const sequelize = require('../connection');
const { DataTypes } = require('sequelize');

const model = sequelize.define(
  'categories',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    deleted_id: DataTypes.INTEGER,
    parent_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  }
);

module.exports = model;
