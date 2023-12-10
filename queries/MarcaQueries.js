const connection = require("../db/dbConfig");

async function createMarca(nombre, estado) {
	try {
		const insertQuery = "INSERT INTO Marca (nombre, estado) VALUES (?, ?)";
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
			message: "Marca creada exitosamente",
			id: result.insertId,
		};
	} catch (error) {
		throw error;
	} 
}

async function getMarcaById(marcaId) {
	try {
		const selectQuery = "SELECT * FROM Marca WHERE id = ?";
		const marca = await new Promise((resolve, reject) => {
			connection.query(selectQuery, [marcaId], (err, marca) => {
				if (err) {
					reject(err);
				} else {
					resolve(marca);
				}
			});
		});
		if (!marca || marca.length === 0) {
			return null;
		}

		return marca[0];
	} catch (error) {
		throw error;
	} 
}

async function updateMarcaById(marcaId, updatedMarcaData) {
	try {
		const updateQuery =
			"UPDATE Marca SET nombre = ?, estado = ? WHERE id = ?";
		const updateParams = [
			updatedMarcaData.nombre,
			updatedMarcaData.estado,
			marcaId,
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
		const updatedMarca = await getMarcaById(marcaId);

		return {
			message: "Marca actualizada exitosamente",
			marca: updatedMarca,
		};
	} catch (error) {
		throw error;
	} 
}

async function deleteMarcaById(marcaId) {
	try {
		const deleteQuery = "DELETE FROM Marca WHERE id = ?";

		await new Promise((resolve, reject) => {
			connection.query(deleteQuery, [marcaId], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		return { message: "Marca eliminada exitosamente" };
	} catch (error) {
		throw error;
	} 
}

async function getAllMarcas() {
	try {
		const getAllMarcasQuery = "SELECT * FROM Marca";
		const marcas = await new Promise((resolve, reject) => {
			connection.query(getAllMarcasQuery, (err, marca) => {
				if (err) {
					reject(err);
				} else {
					resolve(marca);
				}
			});
		});
		return marcas;
	} catch (error) {
		throw error;
	} 
}

module.exports = {
	createMarca,
	getMarcaById,
	updateMarcaById,
	deleteMarcaById,
	getAllMarcas,
};
