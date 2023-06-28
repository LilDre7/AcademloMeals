const express = require("express");

const router = express.Router();

// Importaciones de los controladores del restarante
const controlRest = require("../controllers/restaurant.controller");

// Direccion en PostMan
// http://localhost:8080/api/v1/users

// Rutas para el restaurante 🌱

// == CREATE
router.route("/").post(controlRest.createRestaurant);

// == GET ALL
router.route("/").get(controlRest.getAllRestaurants);

// == GET FOR ID
router.route("/:id").get(controlRest.getRestaurantById);

// == UPDATE FOR ID
router.route("/:id").put(controlRest.updateRestaurantById);

// == DELETE FOR ID
router.route("/:id").delete(controlRest.deleteRestaurantById);

// == POST FOR REVIEWS OF ID
router.route("/reviews/:id").post(controlRest.createReview);

// == PATCH FOR REVIEWS OF RESTAURANTID OF ID
router
  .route("/reviews/:restaurantId/:id")
  .patch(controlRest.updateReview);

// == DELETE FOR REVIEWS OF RESTAURANTID OF ID
router
  .route("/reviews/:restaurantId/:id")
  .delete(controlRest.deleteReview);

module.exports = router;
