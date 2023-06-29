const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurants.model");
const Meals = require("../models/meals.model");
const AppError = require("../utils/appError");
const { where } = require("sequelize");

// == CREATE ✅
exports.createMeal = catchAsync(async (req, res, next) => {
  // ** Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)
  const { id } = req.params;
  const { name, price } = req.body;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
  });

  if (!restaurant)
    next(
      new AppError(
        `El id: ${id} no se encontro o no existe 🦊 `
      ),
      400
    );

  const meal = await Meals.create({
    name: name,
    price: price,
    restaurantId: id,
  });

  res.status(200).json({
    status: "success",
    message:
      "Comida creada con exito, disfruta de tu comida! 🥗🧑🏾‍🍳 ",
    data: {
      meal,
    },
  });
});

// == GET FOR STATUS ✅
exports.getMealStatus = catchAsync(
  async (req, res, next) => {
    // ** Obtener todas las comidas con status active
    const { id } = req.params;

    const allMeals = await Meals.findAll({
      where: {
        status: "active",
      },
      include: [
        {
          model: Restaurant,
          attributes: ["name", "id", "address", "rating"],
        },
      ],
    });

    if (!allMeals || allMeals === 0)
      next(
        AppError(
          "No hay comidas en el sistema disponibles 🦊",
          400
        )
      );

    res.status(200).json({
      status: "success",
      message:
        "Todas las comidas disponibles en el sistema  🌞⚔️ ",
      data: {
        allMeals: allMeals,
        count: allMeals.length,
      },
    });
  }
);

// == GET FOR ID ✅
exports.getMealById = catchAsync(async (req, res, next) => {
  // ** Obtener por id una comida con status active
  const { id } = req.params;

  const allmealforId = await Meals.findOne({
    where: {
      status: "active",
      id,
    },
    include: [
      {
        model: Restaurant,
        attributes: ["name", "id", "address", "rating"],
      },
    ],
  });

  if (!allmealforId)
    next(
      new AppError(
        `El id: ${id} que estas buscando no existe 🦊`
      ),
      404
    );

  res.status(200).json({
    status: 200,
    message:
      "Aqui esta tu comida espero la disfrutes! 🍳⚔️ ",
    data: {
      allmealforId: allmealforId,
    },
  });
});

// == UPDATE BY ID ✅
exports.updateMealById = catchAsync(
  async (req, res, next) => {
    // ** Actualizar comida (name, price)
    const { id } = req.params;
    const { name, price } = req.body;

    const meal = await Meals.findOne({
      where: {
        id,
      },
    });

    if (!meal)
      next(
        new AppError(
          `No se encontro la comida con el id: ${id} 🦊 `
        ),
        404
      );

    const updateMeal = await meal.update({
      name,
      price,
    });

    res.status(200).json({
      status: "success",
      message:
        "La comida con el id: ${id} ha sido actualizada 🍔🐹 ",
      data: {
        meal: updateMeal,
      },
    });
  }
);

// == DELETE BY ID ✅
exports.deleteMealById = catchAsync(
  async (req, res, next) => {
    // ** Deshabilitar comida
    const { id } = req.params;
    const { status } = req.body;

    const meal = await Meals.findOne({
      where: {
        id,
        status: "active",
      },
    });

    if (!meal)
      next(
        new AppError(
          `No se encontro la comida con el id: ${id} 🦊 `
        )
      );

    const updateMeal = await meal.update({
      status: "cancelled",
    });

    res.status(200).json({
      status: "success",
      message:
        "Tu comida ha sido eliminada ✅ Gracias! 🌞 ",
      data: {
        meal: updateMeal,
      },
    });
  }
);
