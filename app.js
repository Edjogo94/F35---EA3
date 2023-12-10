const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json("Hola!");
});

app.use("/user", UserController);

app.get("*", (req, res) => {
	res.status(404).json("Not Found!");
});


module.exports = app;
