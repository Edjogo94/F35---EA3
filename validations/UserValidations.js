const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const dotenv = require("dotenv");
dotenv.config();

const verifyToken = promisify(jwt.verify);

const authenticateUser = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ error: "Token no proporcionado" });
	}
	const tokenWithoutBearer = token.replace("Bearer ", "");

	try {
		// Verifica el token
		const decoded = await verifyToken(
			tokenWithoutBearer,
			process.env.JWT_SECRET
		);

		// Agrega la información del usuario al objeto de solicitud para su uso posterior en la ruta
		req.user = decoded;

		// Continúa con la siguiente función middleware o controlador
		next();
	} catch (error) {
		console.error("Error al verificar el token:", error);
		return res.status(401).json({ error: "Token inválido" });
	}
};

function validateUserAttributes(req, res, next) {
	const { nombre, email, password, rol } = req.body;

	// Verificar que todos los atributos requeridos estén presentes
	if (!nombre || !email || !password || !rol) {
		return res
			.status(400)
			.json({ error: "Todos los atributos son obligatorios" });
	}

	// Si todos los atributos están presentes, continuar con la siguiente función (controlador)
	next();
}

function validateUserAttributesAuth(req, res, next) {
	const { email, password } = req.body;

	// Verificar que todos los atributos requeridos estén presentes
	if (!email || !password) {
		return res
			.status(400)
			.json({ error: "Todos los atributos son obligatorios" });
	}

	// Si todos los atributos están presentes, continuar con la siguiente función (controlador)
	next();
}

module.exports = {
	authenticateUser,
	validateUserAttributes,
	validateUserAttributesAuth,
};
