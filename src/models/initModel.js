const restaurant = require("../models/restaurants.model");
const reviews = require("../models/reviews.model");

const initModel = () => {
  restaurant.hasMany(reviews);
  reviews.belongsTo(restaurant);
};

module.exports = initModel;
