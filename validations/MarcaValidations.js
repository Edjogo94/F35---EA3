function validateMarcaAttributes(req, res, next) {
	const { nombre, estado } = req.body;

	// Verificar que todos los atributos requeridos estén presentes
	if (!nombre || !estado) {
		return res
			.status(400)
			.json({ error: "Todos los atributos son obligatorios" });
	}

	// Si todos los atributos están presentes, continuar con la siguiente función (controlador)
	next();
}

module.exports = { validateMarcaAttributes };
