const Sequelize = require("sequelize");
const database = require("../database");

const Vacina = database.define(
	"vacina",
	{
		idvacina: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
			notEmpty: true,
			unique: {
				args: true,
				msg: "Essa vacina já existe no cadastro",
			},
			validate: {
				notEmpty: {
					args: true,
					msg: "Forneça o nome da vacina",
				},
			},
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Vacina;
