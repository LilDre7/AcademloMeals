const catchAsync = require("../utils/catchAsync");
const restaurant = require("../models/restaurants.model");
const AppError = require("../utils/appError");
const Review = require("../models/reviews.model");
const User = require("../models/users.model");

// == CREATE
exports.createRestaurant = catchAsync(
  // * Crear un nuevo restaurant(enviar name, address, rating (INT)) rating debe ser un valor del 1 al 5
  async (req, res, next) => {
    const { name, address, rating } = req.body;

    const restaurante = await restaurant.create({
      name: name,
      address: address,
      rating: rating,
    });

    if (!name || !address || !rating) {
      return next(
        new AppError(
          "Todos los campos son requeridos para crear un restaurante 🦊 ",
          400
        )
      );
    }

    return res.status(200).json({
      status: "success",
      message: "Se creo el restaurante correctamente 🧑🏾‍🍳🍳 ",
      data: {
        restaurante,
      },
    });
  }
);

// == GET ALL
exports.getAllRestaurants = catchAsync(
  // * Obtener todos los restaurants con status active
  async (req, res, next) => {
    const { status } = req.body;

    const lookRestaurant = await restaurant.findOne({
      where: { status: "active" },
    });

    if (!lookRestaurant)
      next(
        new AppError(
          "No se encontro ningun restaurante 🦊 ",
          400
        )
      );

    const allRestaurants = await restaurant.findAll({
      where: { status: "active" },
      attributes: ["id", "name", "address", "rating"],
      include: [
        {
          model: Review,
          where: { status: "active" },
          attributes: ["comment", "rating"],
          include: {
            model: User,
            where: { status: true },
            attributes: ["name", "email"],
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message:
        "Se obtuvieron todos los restaurantes correctamente 🧑🏾‍🍳🍔 ",
      data: {
        allRestaurants,
      },
    });
  }
);

// == GET FOR ID
exports.getRestaurantById = catchAsync(
  // * Obtener restaurant por id
  async (req, res, next) => {
    const { id } = req.params;

    const restaurantById = await restaurant.findOne({
      where: {
        id: id,
      },
    });

    if (!restaurantById)
      next(
        new AppError(
          `No existe el restaurante con el id:${id} 🦊 `
        )
      );

    res.status(200).json({
      status: "success",
      message: `Este es el restaurante con el id:${id} solicitado 🍳⚔️ `,
      data: {
        restaurantById,
      },
    });
  }
);

// == UPDATE FOR ID
exports.updateRestaurantById = catchAsync(
  // * Actualizar restaurant (name, address)
  async (req, res, next) => {
    const { id } = req.params;
    const { name, address } = req.body;

    const restaurantById = await restaurant.findOne({
      where: {
        id: id,
      },
    });

    if (!restaurantById)
      next(
        new AppError(
          `No existe el restaurante con el id:${id} 🦊 `
        )
      );

    const updateRestaurant = await restaurantById.update({
      name: name,
      address: address,
    });

    res.status(200).json({
      status: "success",
      message: `Se actualizo el restaurante con el id:${id} correctamente 🌞🐮 `,
      data: {
        updateRestaurant,
      },
    });
  }
);

// == DELETE FOR ID
exports.deleteRestaurantById = catchAsync(
  // * Deshabilitar restaurant.
  async (req, res, next) => {
    const { id } = req.params;

    const restaurantById = await restaurant.findOne({
      where: {
        id: id,
      },
    });

    if (!restaurantById)
      next(
        new AppError(
          `No existe el restaurante con el id:${id}  🦊 `
        )
      );

    const deleteRestaurant = await restaurantById.update({
      status: "inactive",
    });

    res.status(200).json({
      status: "success",
      message: `Se deshabilito el restaurante con el id:${id} correctamente 🛫 `,
      data: {
        deleteRestaurant,
      },
    });
  }
);

// == POST FOR REVIEWS OF ID
exports.createReview = catchAsync(
  // * Crear una nueva reseña en el restaurant, siendo :id el id del restaurant (enviar comment, rating (INT) en req.body)
  async (req, res, next) => {
    const { comment, rating } = req.body;
    const userId = req.sessionUser.id;
    const { id } = req.params;

    const restaurantById = await restaurant.findOne({
      where: {
        id,
      },
    });

    if (!restaurantById)
      next(
        new AppError(
          `No existe el id: ${id} al cual haras la reseña 🦊`
        ),
        400
      );

    const review = await Review.create({
      comment: comment,
      rating: rating,
      restaurantId: id,
      userId: userId,
    });

    console.log(review);

    res.status(200).json({
      status: "success",
      message: `Se creo la reseña correctamente 🧑🏾‍🍳 `,
      data: {
        review,
      },
    });
  }
);

// == UPDATE FOR REVIEWS OF ID
exports.updateReview = catchAsync(
  // ** Actualizar una reseña hecha en un restaurant, siendo :id el id del review y restaurantId el id del restaurant(comment, rating) SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA
  async (req, res, next) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const userId = req.sessionUser.id;

    const reviewById = await Review.findOne({
      where: {
        id: id,
      },
    });

    if (!reviewById)
      return next(
        new AppError(
          `No existe el review con el id: ${id} 🦊`,
          400
        )
      );

    const updateReview = await reviewById.update({
      comment: comment,
      rating: rating,
    });

    res.status(200).json({
      status: "success",
      message: `Se actualizó la reseña correctamente con el id: ${id} 🐹🥗`,
      data: {
        updateReview,
      },
    });
  }
);

// == DELETE FOR REVIEWS OF RESTAURANTID OF ID
exports.deleteReview = catchAsync(
  // ** Actualizar una reseña hecha en un restaurant a status deleted, siendo :id el id del review y restaurantId el id del restaurant. SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.sessionUser.id;
    const restaurantId = req.params.restaurantId;

    const reviewById = await Review.findOne({
      where: {
        id,
        userId,
        restaurantId,
      },
    });

    if (!reviewById)
      next(
        new AppError(
          `No existe el review con el id ${id} o el restaurant: ${restaurantId} no existe en nuestra base de datos 🦊 `
        ),
        404
      );

    await reviewById.update({
      status: "inactive",
    });

    res.status(200).json({
      status: "success",
      message: `Se deshabilito la reseña correctamente con el id: ${id} 🪅🍳 `,
    });
  }
);
