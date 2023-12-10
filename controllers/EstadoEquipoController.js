const express = require("express");
const {
	createEstadoEquipo,
	getEstadoEquipoById,
	updateEstadoEquipoById,
	deleteEstadoEquipoById,
	getAllEstadoEquipos,
} = require("../queries/EstadoEquipoQueries");

const {
	validateEstadoEquipoAttributes,
} = require("../validations/EstadoEquipoValidations");
const { authenticateUser } = require("../validations/UserValidations");

const EstadoEquipoController = express.Router();

EstadoEquipoController.get("/list", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const estadoEquipos = await getAllEstadoEquipos();
			res.status(200).json(estadoEquipos);
		} catch (error) {
			console.error("Error en la ruta /list", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso para hacer esto" });
	}
});

EstadoEquipoController.post(
	"/create",
	validateEstadoEquipoAttributes,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const { nombre, estado } = req.body;
				const result = await createEstadoEquipo(nombre, estado);
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

EstadoEquipoController.get(
	"/get/:estadoEquipoId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const estadoEquipoId = req.params.estadoEquipoId;
				const estadoEquipo = await getEstadoEquipoById(estadoEquipoId);

				if (estadoEquipo) {
					res.status(200).json(estadoEquipo);
				} else {
					res.status(404).json({
						error: "Estado de equipo no encontrado",
					});
				}
			} catch (error) {
				console.error("Error en la ruta /:estadoEquipoId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

EstadoEquipoController.put(
	"/update/:estadoEquipoId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const estadoEquipoId = req.params.estadoEquipoId;
				const updatedEstadoEquipoData = req.body;
				const result = await updateEstadoEquipoById(
					estadoEquipoId,
					updatedEstadoEquipoData
				);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:estadoEquipoId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

EstadoEquipoController.delete(
	"/delete/:estadoEquipoId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const estadoEquipoId = req.params.estadoEquipoId;
				const result = await deleteEstadoEquipoById(estadoEquipoId);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:estadoEquipoId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

module.exports = EstadoEquipoController;
