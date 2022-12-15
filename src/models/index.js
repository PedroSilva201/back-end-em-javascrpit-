//importa o arquivo database/index.js
const database = require("../database");

const VacinaModel = require("./Vacina");
const RegistroModel = require("./Registro");

VacinaModel.hasMany(RegistroModel, {
	foreignKey: {
		name: "idvacina",
		allowNull: false,
	},
	sourceKey: "idvacina",
	onDelete: "restrict",
	onUpdate: "cascade",
	hooks: true, //usado para forçar o cascade no onDelete
});
RegistroModel.belongsTo(VacinaModel, {
	foreignKey: "idvacina",
	targetKey: "idvacina",
});

//cria as tabelas no SGBD se elas não existirem
database.sync();

// importa e exporta
module.exports = {
	UsuarioModel: require("./Usuario"),
	VacinaModel: require("./Vacina"),
	RegistroModel: require("./Registro"),
};
