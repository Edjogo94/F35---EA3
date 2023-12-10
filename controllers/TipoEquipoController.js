const express = require("express");

const {
	createTipoEquipo,
	getTipoEquipoById,
	updateTipoEquipoById,
	deleteTipoEquipoById,
	getAllTipoEquipos,
} = require("../queries/TipoEquipoQueries");

const {
	validateTipoEquipoAttributes,
} = require("../validations/TipoEquipoValidations");
const { authenticateUser } = require("../validations/UserValidations");

const TipoEquipoController = express.Router();

TipoEquipoController.get("/list", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const tipoEquipos = await getAllTipoEquipos();
			res.status(200).json(tipoEquipos);
		} catch (error) {
			console.error("Error en la ruta /list", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso para hacer esto" });
	}
});

TipoEquipoController.post(
	"/create",
	validateTipoEquipoAttributes,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const { nombre, estado, descripcion } = req.body;
				const result = await createTipoEquipo(
					nombre,
					estado,
					descripcion
				);
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

TipoEquipoController.get(
	"/get/:tipoEquipoId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const tipoEquipoId = req.params.tipoEquipoId;
				const tipoEquipo = await getTipoEquipoById(tipoEquipoId);

				if (tipoEquipo) {
					res.status(200).json(tipoEquipo);
				} else {
					res.status(404).json({
						error: "Tipo de equipo no encontrado",
					});
				}
			} catch (error) {
				console.error("Error en la ruta /:tipoEquipoId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

TipoEquipoController.put(
	"/update/:tipoEquipoId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const tipoEquipoId = req.params.tipoEquipoId;
				const updatedTipoEquipoData = req.body;
				const result = await updateTipoEquipoById(
					tipoEquipoId,
					updatedTipoEquipoData
				);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:tipoEquipoId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

TipoEquipoController.delete(
	"/delete/:tipoEquipoId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const tipoEquipoId = req.params.tipoEquipoId;
				const result = await deleteTipoEquipoById(tipoEquipoId);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:tipoEquipoId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

module.exports = TipoEquipoController;
