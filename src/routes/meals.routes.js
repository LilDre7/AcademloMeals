const express = require("express");
const { route } = require("./users.routes");

const router = express.Router();

// Importacion para el controller de las rutas
const meals = require("../controllers/meals.controller");

// Direccion en PostMan
// http://localhost:8080/api/v1/meals

// Rutas para meals 🌱

// == CREATE
router.route("/").post(meals.createMeal);

// == GET FOR STATUS
router.route("/").get(meals.getMealStatus);

// == GET FOR ID
router.route("/:id").get(meals.getMealById);

// == UPDATE BY ID
router.route("/:id").patch(meals.updateMealById);

// == DELETE BY ID
router.route("/:id").delete(meals.deleteMealById);

module.exports = router;
