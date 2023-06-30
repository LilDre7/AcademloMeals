const express = require("express");

const router = express.Router();

// Este es la importacion para los controllers
const order = require("../controllers/orders.controller");

// Importando el auth de los middlewars
const auth = require("../middlewares/auth.middleware");

// Direccion en PostMan
// http://localhost:8080/api/v1/orders

// Rutas para las ordenes de los usuarios 🌱

router.use(auth.protect);

// == CREATE ORDER
router.route("/").post(order.createOrder);

// == GET ALL ORDERS OF USERS
router.route("/:me").get(auth.protect, order.getOrderUser);

// == UPDATE ORDER BY ID
router.route("/:id").patch(order.udpateOrder);

// == DELETE ORDER BY ID
router.route("/:id").delete(order.deleteOrder);

module.exports = router;
