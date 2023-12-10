function validateInventarioAttributes(req, res, next) {
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
	} = req.body;

	// Verificar que todos los atributos requeridos estén presentes
	if (
		!serial ||
		!modelo ||
		!fecha_compra ||
		!precio ||
		!usuario_id ||
		!marca_id ||
		!estado_equipo_id ||
		!tipo_equipo_id
	) {
		return res
			.status(400)
			.json({ error: "Todos los atributos son obligatorios" });
	}

	// Si todos los atributos están presentes, continuar con la siguiente función (controlador)
	next();
}

module.exports = { validateInventarioAttributes };
