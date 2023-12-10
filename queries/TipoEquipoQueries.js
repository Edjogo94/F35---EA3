const connection = require("../db/dbConfig");

async function createTipoEquipo(nombre, estado, descripcion) {
	try {
		// Verificar si ya existe un tipo de equipo con el mismo nombre
		const checkTipoEquipoQuery =
			"SELECT * FROM TipoEquipo WHERE nombre = ?";

		const existingTipoEquipo = await new Promise((resolve, reject) => {
			connection.query(
				checkTipoEquipoQuery,
				[nombre],
				(err, existingTipoEquipo) => {
					if (err) {
						reject(err);
					} else {
						resolve(existingTipoEquipo);
					}
				}
			);
		});

		if (existingTipoEquipo && existingTipoEquipo.length > 0) {
			return {
				error: "Ya existe un tipo de equipo con este nombre",
			};
		}

		// Preparar la consulta de inserción del tipo de equipo
		const insertQuery =
			"INSERT INTO TipoEquipo (nombre, estado, descripcion) VALUES (?, ?, ?)";
		const insertParams = [nombre, estado, descripcion];

		// Ejecutar la consulta de inserción del tipo de equipo
		await new Promise((resolve, reject) => {
			connection.query(insertQuery, insertParams, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		return { message: "Tipo de equipo creado exitosamente" };
	} catch (error) {
		throw error;
	}  
}

async function getTipoEquipoById(tipoEquipoId) {
	try {
		const tipoEquipoQuery = "SELECT * FROM TipoEquipo WHERE id = ?";
		const tipoEquipo = await new Promise((resolve, reject) => {
			connection.query(
				tipoEquipoQuery,
				[tipoEquipoId],
				(err, tipoEquipo) => {
					if (err) {
						reject(err);
					} else {
						resolve(tipoEquipo);
					}
				}
			);
		});

		if (!tipoEquipo || tipoEquipo.length === 0) {
			return null; // Tipo de equipo no encontrado
		}

		return tipoEquipo[0];
	} catch (error) {
		throw error;
	}  
}

async function updateTipoEquipoById(tipoEquipoId, updatedTipoEquipoData) {
	try {
		// Obtener el tipo de equipo actual para comparar el nombre
		const currentTipoEquipo = await getTipoEquipoById(tipoEquipoId);

		if (!currentTipoEquipo) {
			return { error: "Tipo de equipo no encontrado" };
		}

		// Verificar si el nombre ha cambiado
		if (updatedTipoEquipoData.nombre !== currentTipoEquipo.nombre) {
			const checkTipoEquipoQuery =
				"SELECT * FROM TipoEquipo WHERE nombre = ?";
			const existingTipoEquipo = await new Promise((resolve, reject) => {
				connection.query(
					checkTipoEquipoQuery,
					[updatedTipoEquipoData.nombre],
					(err, existingTipoEquipo) => {
						if (err) {
							reject(err);
						} else {
							resolve(existingTipoEquipo);
						}
					}
				);
			});

			if (existingTipoEquipo && existingTipoEquipo.length > 0) {
				return {
					error: "Ya existe un tipo de equipo con este nombre",
				};
			}
		}

		// Actualizar el tipo de equipo en la base de datos
		const updateQuery =
			"UPDATE TipoEquipo SET nombre = ?, estado = ?, descripcion = ? WHERE id = ?";
		const updateParams = [
			updatedTipoEquipoData.nombre,
			updatedTipoEquipoData.estado,
			updatedTipoEquipoData.descripcion,
			tipoEquipoId,
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
		// Obtener el tipo de equipo actualizado
		const updatedTipoEquipo = await getTipoEquipoById(tipoEquipoId);

		return {
			message: "Tipo de equipo actualizado exitosamente",
			tipoEquipo: updatedTipoEquipo,
		};
	} catch (error) {
		throw error;
	}  
}

async function deleteTipoEquipoById(tipoEquipoId) {
	try {
		// Eliminar el tipo de equipo de la base de datos
		const deleteQuery = "DELETE FROM TipoEquipo WHERE id = ?";
		await new Promise((resolve, reject) => {
			connection.query(deleteQuery, [tipoEquipoId], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		return { message: "Tipo de equipo eliminado exitosamente" };
	} catch (error) {
		throw error;
	}  
}

async function getAllTipoEquipos() {
	try {
		const getAllTipoEquiposQuery = "SELECT * FROM TipoEquipo";
		const tipoEquipos = await new Promise((resolve, reject) => {
			connection.query(getAllTipoEquiposQuery, (err, tipoEquipos) => {
				if (err) {
					reject(err);
				} else {
					resolve(tipoEquipos);
				}
			});
		});
		return tipoEquipos;
	} catch (error) {
		throw error;
	}  
}

module.exports = {
	createTipoEquipo,
	getTipoEquipoById,
	updateTipoEquipoById,
	deleteTipoEquipoById,
	getAllTipoEquipos,
};
