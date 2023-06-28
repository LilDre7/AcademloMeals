const catchAsync = require("../utils/catchAsync");
const User = require("../models/users.model");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generatejwt = require("../utils/jwt");

// == SIGNUP == //
exports.signup = catchAsync(async (req, res, next) => {
  // ** Crear usuario (enviar name, email, y password por req.body) (opcional el role) ** //
  const { name, email, password, role } = req.body;

  const userExisten = await User.findOne({
    where: {
      email: email,
    },
  });

  if (userExisten)
    next(
      new AppError(
        `Este email ya existe ${email} 🌞 Intenta con otro email 🌱 `,
        400
      )
    );

  if (role !== "normal " && role !== "admin")
    next(new AppError(`El rol ${role} no existe 🦊 `));

  // Encriptar la contraseña del usuario
  const salt = await bcrypt.genSalt(10);
  const bcryptpassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: bcryptpassword,
    role: role,
  });

  res.status(201).json({
    status: "success",
    message: "Usuario creado correctamente 🪅 ",
    data: {
      user,
    },
  });
});

// == LOGIN == //
exports.login = catchAsync(async (req, res, next) => {
  // ** Iniciar sesión (enviar email y password por req.body) ** //
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user)
    next(new AppError("El usuario buscado no exite 🦊"), 400);

  // Validar si la contraseña es correcta
  // De esta forma evaluamos que la contraseña sea correcta, esto se hace con validaciones de bcrypt
  if (!(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError(`La contraseña no es correcta 🦊`, 401)
    );
  }

  // Generar el token
  const token = await generatejwt(user.id);

  // Enviar la información del usuario
  res.status(200).json({
    status: "success",
    message: "Tu login fue exitoso 🐲",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      role: user.role,
    },
  });
});

// == UPDATE == //
exports.updateUser = catchAsync(async (req, res, next) => {
  // Obtener el ID del usuario que se va a actualizar
  const { id } = req.params;

  // ** Actualizar perfil de usuario (solo name y email) ** //
  const { name, email } = req.body;

  const updateUser = await User.findOne({
    where: {
      id,
    },
  });

  if (!updateUser)
    next(
      new AppError(
        "El usuario que quieres actualizar no existe 🦊",
        400
      )
    );

  try {
    const user = await updateUser.update({
      name: name,
      email: email,
    });

    res.status(200).json({
      status: "success",
      message: `Tu perfil se actualizó correctamente. Tu nuevo email: ${user.email} 🐮`,
      data: {
        user: user,
      },
    });
  } catch (error) {
    if (error.code === 23505)
      next(
        new AppError(
          "El correo que estás utilizando ya está en uso 🦊"
        )
      );
    else
      next(
        new AppError("Error al actualizar el usuario 🦊", 500)
      );
  }
});

// === DISABLE === //
exports.disableUser = catchAsync(async (req, res, next) => {
  // Obtener el ID del usuario que se va a actualizar
  const { id } = req.params;

  // ** Deshabilitar perfil de usuario ** //
  const disableUser = await User.findOne({
    where: {
      id,
    },
  });

  if (!disableUser)
    next(
      new AppError(
        `El usuario que quieres deshabilitar id: ${id} no existe 🦊 `,
        400
      )
    );

  await disableUser.update({ status: false });

  return res.status(200).json({
    status: "success",
    message: "La cuenta de usuario ha sido deshabilitada! 🐌",
    data: {
      user: disableUser,
    },
  });
});

// === GET ORDER BY USER === //
exports.getOrderByUser = catchAsync(async (req, res, next) => {
  // ** Obtener todas las ordenes hechas por el usuario ** //
  const user = await User.findAll();

  return res.status(200).json({
    status: "success",
    message: "Todas las ordenes del usuario 🍔 ",
    data: {
      user,
    },
  });
});

// === GET ORDER BY ID === //
exports.getOrderById = catchAsync(async (req, res, next) => {
  // ** Obtener detalles de una sola orden dado un ID ** //
  const { id } = req.params;

  const order = await User.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    return next(
      new AppError(
        `La orden con el ID: ${id} no existe 🦊 `,
        404
      )
    );
  }

  return res.status(200).json({
    status: "success",
    message: `La orden con el 🪅 ID: ${id} esta lista 🍔 `,
    data: {
      order: order,
    },
  });
});
