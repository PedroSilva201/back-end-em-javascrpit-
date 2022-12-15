const Sequelize = require("sequelize");
const database = require("../database");

const UsuarioModel = require("./Usuario");

const Registro = database.define(
	"registro",
	{
		idregistro: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		data: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			validade: {
				isDate: {
					args: true,
					msg: "Forneça a data de vacinação",
				},
			},
		},
		idusuario: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: UsuarioModel,
				key: "idusuario",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
			hooks: true, // força o sequelize a olhar aqui antes de deletar na tabela de origem
			validate: {
				foreignkey: async (idusuario, next) => {
					if (idusuario === "") {
						return next("Forneça a identificação do usuário");
					}
					const usuario = await UsuarioModel.findOne({ where: { idusuario } });
					if (usuario === null) {
						return next(`Usuário ${idusuario} não identificado`);
					}
					return next();
				},
			},
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Registro;
