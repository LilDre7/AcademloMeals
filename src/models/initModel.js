const restaurant = require("../models/restaurants.model");
const reviews = require("../models/reviews.model");
const meals = require("../models/meals.model");

const initModel = () => {
  // Relacionar restaurant con reviews
  restaurant.hasMany(reviews);
  reviews.belongsTo(restaurant);

  // Relacionar restaurant con meals
  restaurant.hasMany(meals);
  meals.belongsTo(restaurant);
};

module.exports = initModel;
