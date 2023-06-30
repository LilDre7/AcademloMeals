const restaurant = require("../models/restaurants.model");
const reviews = require("../models/reviews.model");
const meals = require("../models/meals.model");
const orders = require("../models/orders.model");
const users = require("../models/users.model");

const initModel = () => {
  restaurant.hasMany(meals, { foreignKey: "restaurantId" });
  meals.belongsTo(restaurant);

  meals.hasMany(orders);
  orders.belongsTo(meals);

  restaurant.hasMany(reviews, {
    foreignKey: "restaurantId",
  });
  reviews.belongsTo(restaurant);

  //TODO: Revisar la relacion de restaurant con user
  // users.hasMany(orders);
  // orders.belongsTo(users);

  users.hasMany(reviews);
  reviews.belongsTo(users);
};

module.exports = initModel;
