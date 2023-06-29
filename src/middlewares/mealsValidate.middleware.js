const {
  validationResult,
  body,
} = require("express-validator");

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

exports.mealsValidate = [
  body("name")
    .not()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "El nombre es obligatorio debe tener min 3 caracteres y max 30"
    ),
  body("price")
    .not()
    .notEmpty()
    .isNumeric()
    .isLength({ min: 1, max: 9 })
    .withMessage(
      "El precio es obligatorio debe tener min 1 caracteres y max 9"
    ),
  validateFields,
];
