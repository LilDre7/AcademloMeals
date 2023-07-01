const restaurant = require("../models/restaurants.model");
const reviews = require("../models/reviews.model");
const meals = require("../models/meals.model");
const orders = require("../models/orders.model");
const users = require("../models/users.model");

const initModel = () => {
  // Relación entre Restaurant y Meals
  restaurant.hasMany(meals, { foreignKey: "restaurantId" });
  meals.belongsTo(restaurant);

  // Relación entre Meals y Orders
  meals.hasMany(orders);
  orders.belongsTo(meals);

  // Relación entre Restaurant y Reviews
  restaurant.hasMany(reviews, {
    foreignKey: "restaurantId",
  });
  reviews.belongsTo(restaurant);

  // Relación entre Users y Orders
  users.hasMany(orders);
  orders.belongsTo(users);

  // Relación entre Users y Reviews
  users.hasMany(reviews);
  reviews.belongsTo(users);

  // Relacion entre restaurant y orders
  // restaurant.hasMany(orders);
  // orders.belongsTo(restaurant);
};

module.exports = initModel;
