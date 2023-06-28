const catchAsync = require("../utils/catchAsync");
const restaurant = require("../models/restaurants.model");
const AppError = require("../utils/appError");

// == CREATE
exports.createRestaurant = catchAsync(
  async (req, res, next) => {}
);

// == GET ALL
exports.getAllRestaurants = catchAsync(
  async (req, res, next) => {}
);

// == GET FOR ID
exports.getRestaurantById = catchAsync(
  async (req, res, next) => {}
);

// == UPDATE FOR ID
exports.updateRestaurantById = catchAsync(
  async (req, res, next) => {}
);

// == DELETE FOR ID
exports.deleteRestaurantById = catchAsync(
  async (req, res, next) => {}
);

// == POST FOR REVIEWS OF ID
exports.createReview = catchAsync(
  async (req, res, next) => {}
);

// == POST FOR REVIEWS OF ID
exports.updateReview = catchAsync(
  async (req, res, next) => {}
);

// == DELETE FOR REVIEWS OF RESTAURANTID OF ID
exports.deleteReview = catchAsync(
  async (req, res, next) => {}
);
