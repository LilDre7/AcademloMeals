const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const Restaurant = db.define("restaurants", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    // El rating es de 1 a 5 👁️
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Restaurant;
