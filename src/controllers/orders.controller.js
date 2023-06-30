const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Order = require("../models/orders.model");
const Meal = require("../models/meals.model");
// const Restaurant = require("../models/restaurants.model");

// == CREATE ORDER
exports.createOrder = catchAsync(async (req, res, next) => {
  // TODO:Crear una nueva orden (enviar quantity y mealId por req.body)
  const { quantity, mealId } = req.body;
  // Traer el id del va realizar el pedido del usuario
  const { id } = req.sessionUser;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: "active",
    },
  });

  if (!meal)
    next(
      new AppError(
        "No se pudo crear la orden intente nuevamente 🦊",
        404
      )
    );

  const order = await Order.create({
    mealId,
    userId: id,
    totalPrice: quantity * meal.price,
    quantity,
  });

  res.status(200).json({
    status: "success",
    message: "Orden creada con exito felicidades 🍔🐹",
    data: {
      order,
      totalPrice: quantity * meal.price,
    },
  });
});

// == GET ALL ORDERS OF USERS
exports.getOrderUser = catchAsync(
  async (req, res, next) => {
    // ** Obtener todas las órdenes del usuario
    const { id } = req.sessionUser;

    const orders = await Order.findAll({
      where: {
        userId: id,
        status: "active",
      },
      include: [
        {
          model: Meal,
          attributes: ["name", "price"],
        },
        // {
        //   model: Restaurant,
        //   attributes: ["name", "address"],
        // },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Ordenes obtenidas con exito 🍔🥗🍳 ",
      data: {
        orders,
      },
    });
  }
);

// == UPDATE ORDER BY ID
exports.udpateOrder = catchAsync(async (req, res, next) => {
  // ** Marcar una orden por id con status completed
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id: id,
      status: "active",
    },
  });

  // Validar que la orden este con status active antes de realizar la operación, enviar error en caso de que no tenga este status.
  if (order === null)
    next(
      new AppError(
        "La order ya fue completada o cancelada 🦊"
      ),
      404
    );

  await order.update({
    status: "completed",
  });

  res.status(200).json({
    data: {
      status: "success",
      message:
        "Orden completada con exito disfrutar de tu orden 🍔🍳 ",
      order: order,
    },
  });
});

// == DELETE ORDER BY ID
exports.deleteOrder = catchAsync(async (req, res, next) => {
  // ** Marcar una orden por id con status cancelled
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id: id,
      status: "active",
    },
  });

  // Validar que la orden este con status active antes de realizar la operación, enviar error en caso de que no tenga este status.
  if (order === null)
    next(
      new AppError(
        "La order ya fue completada o cancelada 🦊"
      ),
      404
    );

  await order.update({
    status: "cancelled",
  });

  res.status(200).json({
    data: {
      status: "success",
      message: "La order fue cancelada con exito ⚔️🍳 ",
      order: order,
    },
  });
});
