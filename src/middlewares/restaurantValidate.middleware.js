const { validationResult, body } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

exports.validateRestaurant = [
  body("name")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 50 })
    .withMessage("Tu nombre debe ser obligatorio."),
  body("address")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 50 })
    .withMessage("Tu dirección debe ser obligatoria"),
  body("rating")
    .not()
    .isEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage(
      "El rating debe ser obligatorio y debe ser un numero entre 1 y 5"
    ),
  validateFields,
];
