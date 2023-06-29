const express = require("express");

const router = express.Router();

// Importacion para el controller de las rutas
const meals = require("../controllers/meals.controller");

// Importar el auth del middleware para hacer unas autenticaciones
const auth = require("../middlewares/auth.middleware");

// Importando el middleware de las validaciones para el POST
const validate = require("../middlewares/mealsValidate.middleware");

// Direccion en PostMan
// http://localhost:8080/api/v1/meals

// Rutas para meals 🌱

// == CREATE ✅
router
  .route("/:id")
  .post(
    validate.mealsValidate,
    auth.protect,
    auth.restrictTo("admin"),
    meals.createMeal
  );

// == GET FOR STATUS ✅
router.route("/").get(meals.getMealStatus);

// == GET FOR ID ✅
router.route("/:id").get(meals.getMealById);

// == UPDATE BY ID ✅
router
  .route("/:id")
  .patch(
    auth.protect,
    auth.restrictTo("admin"),
    meals.updateMealById
  );

// == DELETE BY ID ✅
router
  .route("/:id")
  .delete(
    auth.protect,
    auth.restrictTo("admin"),
    meals.deleteMealById
  );

module.exports = router;
