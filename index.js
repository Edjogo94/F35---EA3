const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const server = app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on("error", (err) => {
	console.error("Error al iniciar el servidor:", err.message);
});
