const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const Review = db.define("reviews", {
  id: {
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = Review;
