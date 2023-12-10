const connection = require("../db/dbConfig");

function executeMultiqueries(sqlQuery) {
	// Ejecuta la consulta
	for (const query of sqlQuery.split(";")) {
		connection.query(query, (err, results) => {
			if (err) {
				console.error("Error al ejecutar el schema:", err);
			} else {
				console.log("ok");
			}
		});
	}
	// Cierra la conexión después de realizar la consulta
	connection.end();
}

module.exports = executeMultiqueries;
