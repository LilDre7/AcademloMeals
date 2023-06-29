const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Restaurant = require("../models/restaurants.model");
const Meals = require("../models/meals.model");

exports.createMeal = catchAsync(async (req, res, next) => {
  // ** Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)
});

exports.getMealStatus = catchAsync(
  async (req, res, next) => {
    // ** Obtener todaslas comidas con status active
  }
);

exports.getMealById = catchAsync(async (req, res, next) => {
  // ** Obtener por id una comida con status active
});

exports.updateMealById = catchAsync(
  async (req, res, next) => {
    // ** Actualizar comida (name, price)
  }
);

exports.deleteMealById = catchAsync(
  async (req, res, next) => {
    // ** Deshabilitar comida
  }
);
