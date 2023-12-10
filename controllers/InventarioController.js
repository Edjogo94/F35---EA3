const express = require("express");
const {
	createInventario,
	getInventarioBySerial,
	updateInventarioBySerial,
	deleteInventarioBySerial,
	getAllInventario,
} = require("../queries/InventarioQueries");

const {
	validateInventarioAttributes,
} = require("../validations/InventarioValidations");
const { authenticateUser } = require("../validations/UserValidations");

const InventarioController = express.Router();

InventarioController.get("/list", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador" || req.user.rol === "docente") {
		try {
			const inventario = await getAllInventario();
			res.status(200).json(inventario);
		} catch (error) {
			console.error("Error en la ruta /list", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso para hacer esto" });
	}
});

InventarioController.post(
	"/create",
	validateInventarioAttributes,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const result = await createInventario(req.body);
				res.status(201).json(result);
			} catch (error) {
				console.error("Error en la ruta /create:", error.message);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({
				error: "No tienes permiso para hacer esto",
			});
		}
	}
);

InventarioController.get("/get/:serial", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador" || req.user.rol === "docente") {
		try {
			const serial = req.params.serial;
			const inventario = await getInventarioBySerial(serial);

			if (inventario) {
				res.status(200).json(inventario);
			} else {
				res.status(404).json({
					error: "Equipo no encontrado",
				});
			}
		} catch (error) {
			console.error("Error en la ruta /:serial", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso de hacer esto" });
	}
});

InventarioController.put(
	"/update/:serial",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const serial = req.params.serial;
				const result = await updateInventarioBySerial(serial, req.body);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:serial", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

InventarioController.delete(
	"/delete/:serial",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const serial = req.params.serial;
				const result = await deleteInventarioBySerial(serial);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:serial", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

module.exports = InventarioController;
