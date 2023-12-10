const fs = require("fs");
const executeMultiqueries = require("../utils/queries");

// Lee el archivo SQL
const sqlQuery = fs.readFileSync("./db/schema.sql", "utf8");

// Ejecuta la consulta
executeMultiqueries(sqlQuery)