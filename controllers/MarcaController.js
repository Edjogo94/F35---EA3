const express = require("express");
const {
	createMarca,
	getMarcaById,
	updateMarcaById,
	deleteMarcaById,
	getAllMarcas,
} = require("../queries/MarcaQueries");

const { validateMarcaAttributes } = require("../validations/MarcaValidations");
const { authenticateUser } = require("../validations/UserValidations");

const MarcaController = express.Router();

MarcaController.get("/list", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const marcas = await getAllMarcas();
			res.status(200).json(marcas);
		} catch (error) {
			console.error("Error en la ruta /list", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso para hacer esto" });
	}
});

MarcaController.post("/create", validateMarcaAttributes, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const { nombre, estado } = req.body;
			const result = await createMarca(nombre, estado);
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
});

MarcaController.get("/get/:marcaId", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const marcaId = req.params.marcaId;
			const marca = await getMarcaById(marcaId);

			if (marca) {
				res.status(200).json(marca);
			} else {
				res.status(404).json({ error: "Marca no encontrada" });
			}
		} catch (error) {
			console.error("Error en la ruta /:marcaId", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso de hacer esto" });
	}
});

MarcaController.put("/update/:marcaId", authenticateUser, async (req, res) => {
	if (req.user.rol === "administrador") {
		try {
			const marcaId = req.params.marcaId;
			const updatedMarcaData = req.body;
			const result = await updateMarcaById(marcaId, updatedMarcaData);
			res.status(200).json(result);
		} catch (error) {
			console.error("Error en la ruta /:marcaId", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.status(403).json({ error: "No tienes permiso de hacer esto" });
	}
});

MarcaController.delete(
	"delete/:marcaId",
	authenticateUser,
	async (req, res) => {
		if (req.user.rol === "administrador") {
			try {
				const marcaId = req.params.marcaId;
				const result = await deleteMarcaById(marcaId);
				res.status(200).json(result);
			} catch (error) {
				console.error("Error en la ruta /:marcaId", error);
				res.status(500).json({ error: "Error interno del servidor" });
			}
		} else {
			res.status(403).json({ error: "No tienes permiso de hacer esto" });
		}
	}
);

module.exports = MarcaController;
