const connection = require("../db/dbConfig");

async function createEstadoEquipo(nombre, estado) {
	try {
		const insertQuery =
			"INSERT INTO EstadoEquipo (nombre, estado) VALUES (?, ?)";
		const insertParams = [nombre, estado];

		const result = await new Promise((resolve, reject) => {
			connection.query(insertQuery, insertParams, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		return {
			message: "Estado de equipo creado exitosamente",
			id: result.insertId,
		};
	} catch (error) {
		throw error;
	}
}

async function getEstadoEquipoById(estadoEquipoId) {
	try {
		const selectQuery = "SELECT * FROM EstadoEquipo WHERE id = ?";

		const estadoEquipo = await new Promise((resolve, reject) => {
			connection.query(
				selectQuery,
				[estadoEquipoId],
				(err, estadoEquipo) => {
					if (err) {
						reject(err);
					} else {
						resolve(estadoEquipo);
					}
				}
			);
		});
		if (!estadoEquipo || estadoEquipo.length === 0) {
			return null;
		}

		return estadoEquipo[0];
	} catch (error) {
		throw error;
	}
}

async function updateEstadoEquipoById(estadoEquipoId, updatedEstadoEquipoData) {
	try {
		const updateQuery =
			"UPDATE EstadoEquipo SET nombre = ?, estado = ? WHERE id = ?";
		const updateParams = [
			updatedEstadoEquipoData.nombre,
			updatedEstadoEquipoData.estado,
			estadoEquipoId,
		];

		await new Promise((resolve, reject) => {
			connection.query(updateQuery, updateParams, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		const updatedEstadoEquipo = await getEstadoEquipoById(estadoEquipoId);

		return {
			message: "Estado de equipo actualizado exitosamente",
			estadoEquipo: updatedEstadoEquipo,
		};
	} catch (error) {
		throw error;
	}
}

async function deleteEstadoEquipoById(estadoEquipoId) {
	try {
		const deleteQuery = "DELETE FROM EstadoEquipo WHERE id = ?";
		await new Promise((resolve, reject) => {
			connection.query(deleteQuery, [estadoEquipoId], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		return { message: "Estado de equipo eliminado exitosamente" };
	} catch (error) {
		throw error;
	}
}

async function getAllEstadoEquipos() {
	try {
		const getAllEstadoEquiposQuery = "SELECT * FROM EstadoEquipo";

		const estadoEquipos = await new Promise((resolve, reject) => {
			connection.query(getAllEstadoEquiposQuery, (err, estadoEquipos) => {
				if (err) {
					reject(err);
				} else {
					resolve(estadoEquipos);
				}
			});
		});
		return estadoEquipos;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createEstadoEquipo,
	getEstadoEquipoById,
	updateEstadoEquipoById,
	deleteEstadoEquipoById,
	getAllEstadoEquipos,
};
