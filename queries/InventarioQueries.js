const connection = require("../db/dbConfig");

async function createInventario(data) {
	try {
		const {
			serial,
			modelo,
			descripcion,
			color,
			fecha_compra,
			precio,
			usuario_id,
			marca_id,
			estado_equipo_id,
			tipo_equipo_id,
		} = data;

		const insertQuery = `
            INSERT INTO Inventario 
            (serial, modelo, descripcion, color, fecha_compra, precio, usuario_id, marca_id, estado_equipo_id, tipo_equipo_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		const insertParams = [
			serial,
			modelo,
			descripcion,
			color,
			fecha_compra,
			precio,
			usuario_id,
			marca_id,
			estado_equipo_id,
			tipo_equipo_id,
		];

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
			message: "Equipo creado exitosamente",
			serial: result.insertId,
		};
	} catch (error) {
		throw error;
	}
}

async function getInventarioBySerial(serial) {
	try {
		const selectQuery = "SELECT * FROM Inventario WHERE serial = ?";
		const inventario = await new Promise((resolve, reject) => {
			connection.query(selectQuery, [serial], (err, inventario) => {
				if (err) {
					reject(err);
				} else {
					resolve(inventario);
				}
			});
		});
		if (!inventario || inventario.length === 0) {
			return null;
		}

		return inventario[0];
	} catch (error) {
		throw error;
	}
}

async function updateInventarioBySerial(serial, updatedInventarioData) {
	try {
		const updateQuery = `
            UPDATE Inventario 
            SET modelo = ?, descripcion = ?, color = ?, fecha_compra = ?, precio = ?, 
                usuario_id = ?, marca_id = ?, estado_equipo_id = ?, tipo_equipo_id = ? 
            WHERE serial = ?`;

		const {
			modelo,
			descripcion,
			color,
			fecha_compra,
			precio,
			usuario_id,
			marca_id,
			estado_equipo_id,
			tipo_equipo_id,
		} = updatedInventarioData;

		const updateParams = [
			modelo,
			descripcion,
			color,
			fecha_compra,
			precio,
			usuario_id,
			marca_id,
			estado_equipo_id,
			tipo_equipo_id,
			serial,
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
		const updatedInventario = await getInventarioBySerial(serial);

		return {
			message: "Equipo actualizado exitosamente",
			inventario: updatedInventario,
		};
	} catch (error) {
		throw error;
	}
}

async function deleteInventarioBySerial(serial) {
	try {
		const deleteQuery = "DELETE FROM Inventario WHERE serial = ?";
		await new Promise((resolve, reject) => {
			connection.query(deleteQuery, [serial], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		return { message: "Equipo eliminado exitosamente" };
	} catch (error) {
		throw error;
	}
}

async function getAllInventario() {
	try {
		const getAllInventarioQuery = "SELECT * FROM Inventario";

		const inventario = await new Promise((resolve, reject) => {
			connection.query(getAllInventarioQuery, (err, inventario) => {
				if (err) {
					reject(err);
				} else {
					resolve(inventario);
				}
			});
		});
		return inventario;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createInventario,
	getInventarioBySerial,
	updateInventarioBySerial,
	deleteInventarioBySerial,
	getAllInventario,
};
