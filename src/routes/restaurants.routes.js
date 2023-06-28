const express = require("express");

const router = express.Router();

// Importaciones de los controladores del restarante
const controlRest = require("../controllers/restaurant.controller");

// Importaciones del auth de los middlewares para proteger rutas
const auth = require("../middlewares/auth.middleware");

// Direccion en PostMan
// http://localhost:8080/api/v1/users

// Rutas para el restaurante 🌱

// == CREATE ✅
router.route("/").post(controlRest.createRestaurant);

// == GET ALL ✅
router.route("/").get(controlRest.getAllRestaurants);

// == GET FOR ID ✅
router.route("/:id").get(controlRest.getRestaurantById);

// == UPDATE FOR ID ✅
router
  .route("/:id")
  .patch(controlRest.updateRestaurantById);

// == DELETE FOR ID ✅
router
  .route("/:id")
  .delete(controlRest.deleteRestaurantById);

// == POST FOR REVIEWS OF ID ✅
router
  .route("/reviews/:id")
  .post(auth.protect, controlRest.createReview);

// == UPDATE FOR REVIEWS OF RESTAURANTID OF ID ✅
router
  .route("/reviews/:restaurantId/:id")
  .patch(auth.protect, controlRest.updateReview);

// == DELETE FOR REVIEWS OF RESTAURANTID OF ID ✅
router
  .route("/reviews/:restaurantId/:id")
  .delete(auth.protect, controlRest.deleteReview);

module.exports = router;
