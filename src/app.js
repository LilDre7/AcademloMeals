const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

// ** Config ** //
const app = express();

app.use(express.json());

// Cors es para que el servidor pueda comunicarse con el front
app.use(cors());

// Morgan sirve para ver las peticiones en consola
// Este if es para tener a morgan solo en desarrollo de la app
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ** Utils ** //
const AppError = require("./utils/appError");

// Middleware de erroes
const globalErrorHandler = require("./controllers/error.controller");

// ** Ruta principales ** //
// app.use("/api/v1/");

// ** Routes ** //
const userRoutes = require("./routes/users.routes");
const restaurantsRoute = require("./routes/restaurants.routes");
// const mealsRoute = require("./routes/meals.routes");
// const ordersRoute = require("./routes/orders.routes");

// Router for users
app.use("/api/v1/users", userRoutes);

// Router for restaurant
app.use("/api/v1/restaurants", restaurantsRoute);

// Router for meals
// app.use("/api/v1/meals", mealsRoute);

// Router for orders
// app.use("/api/v1/orders", ordersRoute);

// ** Middleware de errores ** //

app.use("*", (req, res, next) => {
  // !! Para todas las rutas que no sea correctas
  return next(
    new AppError(
      `La ruta es incorrecta o no valida ${req.originalUrl} 🚑 `,
      404,
      "fail"
    )
  );
});

// ** Middleware de errores ** //
app.use(globalErrorHandler);

// ** Export ** //
module.exports = app;
