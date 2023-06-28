const express = require("express");

const router = express.Router();

// Importaciones de los controladores del usuario
const userControl = require("../controllers/users.controller");

// Direccion en PostMan
// http://localhost:8080/api/v1/users

// Rutas para el usuario
router.route("/signup").post(userControl.signup);

router.route("/login").post(userControl.login);

// == Estas routas son protegidas por un JWT de autenticacion == //

router.route("/:id").patch(userControl.updateUser);

router.route("/:id").delete(userControl.disableUser);

router.route("/:orders").get(userControl.getOrderByUser);

router.route("/orders/:id").get(userControl.getOrderById);

module.exports = router;
