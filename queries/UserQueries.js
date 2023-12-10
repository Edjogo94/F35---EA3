const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../db/dbConfig");

const dotenv = require("dotenv");
dotenv.config();

async function createUser(nombre, email, password, rol) {
	try {
		// Verificar si ya existe un usuario con el mismo correo electrónico
		const checkUserQuery = "SELECT * FROM Usuario WHERE email = ?";
		const [existingUser] = await connection.query(checkUserQuery, [email]);

		if (existingUser && existingUser.length > 0) {
			return {
				error: "Ya existe un usuario con este correo electrónico",
			};
		}

		// Encriptar la contraseña antes de almacenarla en la base de datos
		const hashedPassword = await bcrypt.hash(password, 10);

		// Preparar la consulta de inserción del usuario
		const insertQuery =
			"INSERT INTO Usuario (nombre, email, password, rol, estado) VALUES (?, ?, ?, ?, ?)";
		const insertParams = [nombre, email, hashedPassword, rol, "Activo"];

		// Ejecutar la consulta de inserción del usuario
		connection.query(insertQuery, insertParams, (err) => {
			if (err) {
				console.error("Error al crear un usuario:", err);
			} else {
				console.log("Usuario creado exitosamente");
			}
		});

		// Generar un token JWT después de crear el usuario
		const token = jwt.sign({ email, rol }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		// Cerrar la conexión después de realizar la consulta
		connection.end();

		return { message: "Usuario creado exitosamente", token };
	} catch (error) {
		console.error("Error al crear un usuario:", error);
		throw error;
	}
}

async function authenticateUserByEmailAndPassword(email, password) {
	try {
		// Obtener el usuario por email de la base de datos
		const userQuery = "SELECT * FROM Usuario WHERE email = ?";
		const [user] = await connection.query(userQuery, [email]);

		if (!user || user.length === 0) {
			return null; // Usuario no encontrado
		}

		// Verificar la contraseña
		const passwordMatch = await bcrypt.compare(password, user[0].password);

		if (!passwordMatch) {
			return null; // Contraseña incorrecta
		}

		// Generar un token JWT después de autenticar al usuario
		const token = jwt.sign(
			{ email, rol: user[0].rol },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		// Devolver el usuario autenticado y el token
		return { user: user[0], token };
	} catch (error) {
		throw error;
	}
}

async function getUserById(userId) {
	try {
		const userQuery = "SELECT * FROM Usuario WHERE id = ?";
		const [user] = await connection.query(userQuery, [userId]);

		if (!user || user.length === 0) {
			return null; // Usuario no encontrado
		}

		return user[0];
	} catch (error) {
		throw error;
	}
}

async function updateUserById(userId, updatedUserData) {
	try {
		// Obtener el usuario actual para comparar el correo electrónico
		const currentUser = await getUserById(userId);

		if (!currentUser) {
			return { error: "Usuario no encontrado" };
		}

		// Verificar si el correo electrónico ha cambiado
		if (updatedUserData.email !== currentUser.email) {
			const checkUserQuery = "SELECT * FROM Usuario WHERE email = ?";
			const [existingUser] = await connection.query(checkUserQuery, [
				updatedUserData.email,
			]);

			if (existingUser && existingUser.length > 0) {
				return {
					error: "Ya existe un usuario con este correo electrónico",
				};
			}
		}

		// Encriptar la contraseña si ha cambiado
		let hashedPassword = currentUser.password; // Utilizar la contraseña actual por defecto

		if (
			updatedUserData.password &&
			updatedUserData.password !== currentUser.password
		) {
			hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
		}

		// Actualizar el usuario en la base de datos
		const updateQuery =
			"UPDATE Usuario SET nombre = ?, email = ?, password = ?, rol = ?, estado = ? WHERE id = ?";
		const updateParams = [
			updatedUserData.nombre,
			updatedUserData.email,
			hashedPassword,
			updatedUserData.rol,
			updatedUserData.estado,
			userId,
		];

		await connection.query(updateQuery, updateParams);

		// Obtener el usuario actualizado
		const updatedUser = await getUserById(userId);

		return {
			message: "Usuario actualizado exitosamente",
			user: updatedUser,
		};
	} catch (error) {
		throw error;
	}
}

async function deleteUserById(userId) {
	try {
		// Eliminar el usuario de la base de datos
		const deleteQuery = "DELETE FROM Usuario WHERE id = ?";
		await connection.query(deleteQuery, [userId]);

		return { message: "Usuario eliminado exitosamente" };
	} catch (error) {
		throw error;
	}
}

async function getAllUsers() {
	try {
		const getAllUsersQuery = "SELECT * FROM Usuario";
		const [users] = await connection.query(getAllUsersQuery);
		return users;
	} catch (error) {
		throw error;
	}
}
module.exports = {
	createUser,
	authenticateUserByEmailAndPassword,
	getUserById,
	updateUserById,
	deleteUserById,
	getAllUsers,
};
