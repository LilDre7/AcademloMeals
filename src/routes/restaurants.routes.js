const express = require("express");

const router = express.Router();

// Importaciones de los controladores del restarante
const controlRest = require("../controllers/restaurant.controller");

// Importaciones del auth de los middlewares para proteger rutas
const auth = require("../middlewares/auth.middleware");

// Importaciones del middleware de las validaciones para el post
const validate = require("../middlewares/restaurantValidate.middleware");

// Direccion en PostMan
// http://localhost:8080/api/v1/users

// Rutas para el restaurante 🌱

// === auth.restrictTo() --> 🐹

// == CREATE ✅
router.route("/").post(
  // auth.restrictTo("admin"), //  🐹
  validate.validateRestaurant,
  controlRest.createRestaurant
);

// == GET ALL ✅
router.route("/").get(controlRest.getAllRestaurants);

// == GET FOR ID ✅
router.route("/:id").get(controlRest.getRestaurantById);

// == UPDATE FOR ID ✅
router.route("/:id").patch(
  // auth.restrictTo("admin"), //  🐹
  controlRest.updateRestaurantById
);

// == DELETE FOR ID ✅
router.route("/:id").delete(
  // auth.restrictTo("admin"), //  🐹
  controlRest.deleteRestaurantById
);

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
