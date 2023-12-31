require("dotenv").config();
const colors = require("colors");
const { db } = require("./db/config");
const app = require("./app");
const initModel = require("./models/initModel");

// !! Aqui vamos a verificar si la base de datos esta conectada //
db.authenticate()
  .then(() => {
    console.log(" 🦁 Database authenticate 🌱 ".bgRed.bold);
  })
  .catch((err) => {
    console.log(err);
  });

// !! Este initModel lo hacemos para realizar nuestra base de datos !! //
initModel();

db.sync({ force: false })
  .then(() => console.log(" 🐮 Database synced 🌞 ".bgBlue.bold))
  .catch((err) => console.log(err));

// Aqui escuchamos nuestro puerto //
const PORT = process.env.PORT || 8080;

// == Aqui escuchamos nuestro puerto y lo mostramos por consola ☠️ //
app.listen(PORT, () => {
  console.log(
    ` 🦊 App running on port ${PORT} 🍔 `.bgGreen.black
  );
});
