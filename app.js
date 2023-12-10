const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");
const TipoEquipoController = require("./controllers/TipoEquipoController");
const MarcaController = require("./controllers/MarcaController");
const InventarioController = require("./controllers/InventarioController");
const EstadoEquipoController = require("./controllers/EstadoEquipoController");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json("Hola!");
});

app.use("/user", UserController);
app.use("/tipo-equipo", TipoEquipoController);
app.use("/marca", MarcaController);
app.use("/inventario", InventarioController);
app.use("/estado-equipo", EstadoEquipoController);

app.get("*", (req, res) => {
	res.status(404).json("Not Found!");
});

module.exports = app;
