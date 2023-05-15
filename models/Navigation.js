const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Navigation extends Model {}

Navigation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    navigate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'navigation',
  }
);

module.exports = Navigation;