const sequelize = require("../config/database");

const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");
console.log("SEQUELIZE TYPE:", typeof sequelize);
console.log("SEQUELIZE KEYS:", Object.keys(sequelize));
const basename = path.basename(__filename);
const db = {};

// Cargar modelos (factory pattern)
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.endsWith(".js")
  )
  .forEach((file) => {
    console.log("CARGANDO MODELO:", file);

    const modelFactory = require(path.join(__dirname, file));

    console.log("TIPO:", typeof modelFactory);

    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exportar
db.sequelize = sequelize;

module.exports = db;
