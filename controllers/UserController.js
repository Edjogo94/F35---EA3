const express = require("express");
const {
	createUser,
	authenticateUserByEmailAndPassword,
} = require("../queries/UserQueries");
const {
	authenticateUser,
	validateUserAttributes,
	validateUserAttributesAuth,
} = require("../validations/UserValidations");
const UserController = express.Router();

UserController.post("/create", validateUserAttributes, async (req, res) => {
	try {
		const { nombre, email, password, rol } = req.body;
		const result = await createUser(nombre, email, password, rol);
		res.status(201).json(result);
	} catch (error) {
		console.error("Error en la ruta /create:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

UserController.post(
	"/authenticate",
	validateUserAttributesAuth,
	async (req, res) => {
		try {
			const { email, password } = req.body;

			// Autenticar al usuario
			const authResult = await authenticateUserByEmailAndPassword(
				email,
				password
			);

			if (authResult) {
				// Usuario autenticado, responder con el resultado de la autenticación
				res.status(200).json({
					message: "Autenticación exitosa",
					user: authResult.user,
					token: authResult.token,
				});
			} else {
				// Usuario no autenticado
				res.status(401).json({ error: "Credenciales inválidas" });
			}
		} catch (error) {
			console.error("Error en la ruta /authenticate:", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	}
);

// UserController.get("/protected", authenticateUser, (req, res) => {
// 	res.json({ message: "Ruta protegida", user: req.user });
// });

module.exports = UserController;
