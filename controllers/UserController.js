const express = require("express");

const {
	createUser,
	authenticateUserByEmailAndPassword,
	deleteUserById,
	updateUserById,
	getUserById,
} = require("../queries/UserQueries");

const {
	authenticateUser,
	validateUserAttributes,
	validateUserAttributesAuth,
} = require("../validations/UserValidations");

const UserController = express.Router();

UserController.get("/list", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const users = await getAllUsers();
			res.status(200).json(users);
		} catch (error) {
			console.error("Error en la ruta /", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso para hacer esto" });
	}
});

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

UserController.get("/:userId", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const userId = req.params.userId;
			const user = await getUserById(userId);

			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ error: "Usuario no encontrado" });
			}
		} catch (error) {
			console.error("Error en la ruta /:userId", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso de hacer esto" });
	}
});

UserController.put("/:userId", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const userId = req.params.userId;
			const updatedUserData = req.body;
			const result = await updateUserById(userId, updatedUserData);
			res.status(200).json(result);
		} catch (error) {
			console.error("Error en la ruta /:userId", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso de hacer esto" });
	}
});

UserController.delete("/:userId", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const userId = req.params.userId;
			const result = await deleteUserById(userId);
			res.status(200).json(result);
		} catch (error) {
			console.error("Error en la ruta /:userId", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso de hacer esto" });
	}
});

module.exports = UserController;
