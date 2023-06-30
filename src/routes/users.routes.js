const express = require("express");

const router = express.Router();

// Importaciones de los controladores del usuario
const userControl = require("../controllers/users.controller");

// Importanciones de los middlewares 🦊
const auth = require("../middlewares/auth.middleware");

// Imprtacion para validar el user CREATE 🥷🏾
const validateUser = require("../middlewares/userValidate.middleware");

// Importando la existencia de un usuario de un middleware

// Direccion en PostMan
// http://localhost:8080/api/v1/users

// Rutas para el usuario
// == CREATE ✅
router
  .route("/signup")
  .post(validateUser.validateUser, userControl.signup);

// == LOGIN ✅
router.route("/login").post(userControl.login);

// == Estas routas son protegidas por un JWT de autenticacion == //

// Proteccion para las rutas del usuario
router.use(auth.protect);

// == UDAPTE ✅
router
  .route("/:id")
  .patch(auth.protectAccountOwner, userControl.updateUser);

// == DISABLE ✅
router
  .route("/:id")
  .delete(auth.protectAccountOwner, userControl.disableUser);

// == GET USER BY ID == ALL ORDERS ✅
router.route("/:orders").get(userControl.getOrderByUser);

// == GET ORDER BY ID == ORDER FOR ID ✅
router.route("/orders/:id").get(userControl.getOrderById);

// == UPDATE PASSWORD FOR ID
router
  .route("/password/:id")
  .patch(
    auth.protect,
    validateUser.validateUserId,
    validateUser.validateNewPassword,
    userControl.updatePassword
  );

module.exports = router;
