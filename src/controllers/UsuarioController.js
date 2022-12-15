const { UsuarioModel } = require("../models");
const { Token } = require("../utils");
const { generateToken } = Token;
const { getToken } = require("../middlewares");

class UsuarioController {
	async create(req, res) {
		let { mail, senha } = req.body;
		mail = (mail || "").toString().trim();
		senha = (senha || "").toString().trim();

		return await UsuarioModel.create({ mail, senha, perfil: "user" })
			.then((r) => {
				const { idusuario, mail, perfil } = r.get();
				return res.status(200).json({ idusuario, mail, perfil });
			})
			.catch((err) => {
				try {
					if( err.message ){
						return res.status(400).json({ error: [err.message] });
					}
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					console.log("e:", e.message);
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async login(req, res) {
		let { mail, senha } = req.body;
		mail = (mail || "").toString().trim();
		senha = (senha || "").toString().trim();
		if (mail === "") {
			return res
				.status(400)
				.json({ error: ["Forneça o e-mail do seu cadastro"] });
		}
		if (senha === "") {
			return res
				.status(400)
				.json({ error: ["Forneça a sua senha de cadastro"] });
		}

		return await UsuarioModel.findOne({
			where: { mail },
		})
			.then(async (usuario) => {
				if (usuario) {
					if (usuario.comparePassword(senha, usuario.senha)) {
						const token = await generateToken({
							idusuario: usuario.idusuario,
							mail: usuario.mail,
							perfil: usuario.perfil,
						});

						return res.json({
							token,
							idusuario: usuario.idusuario,
							mail: usuario.mail,
							perfil: usuario.perfil,
						});
					} else
						return res
							.status(400)
							.json({ error: ["Dados de login não conferem"] });
				} else
					return res.status(400).json({ error: ["Usuário não identificado"] });
			})
			.catch((e) => {
				return res.status(400).json({ error: [e.message] });
			});
	}

	async updatemail(req, res) {
		const token = await getToken(req);
		let { mail } = req.body;
		mail = (mail || "").toString().trim();

		return await UsuarioModel.findOne({ where: { idusuario: token.idusuario } })
			.then(async (usuario) => {
				if (usuario) {
					await usuario.update({ mail });
					return res.status(200).json({
						idusuario: usuario.idusuario,
						mail: usuario.mail,
					});
				}
				return res.status(400).json({ error: ["Usuário não identificado"] });
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async updatesenha(req, res) {
		const token = await getToken(req);
		let { senha } = req.body;
		senha = (senha || "").toString().trim();

		return await UsuarioModel.findOne({ where: { idusuario: token.idusuario } })
			.then(async (usuario) => {
				if (usuario) {
					await usuario.update({ senha });
					return res.status(200).json({
						idusuario: usuario.idusuario,
					});
				}
				return res.status(400).json({ error: ["Usuário não identificado"] });
			})
			.catch((err) => {
				try {
					if( err.message ){
						return res.status(400).json({ error: [err.message] });
					}
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async updateperfil(req, res) {
		const token = await getToken(req);
		if (token.perfil !== "admin") {
			return res
				.status(401)
				.json({ error: ["Sem autorização para realizar essa operação"] });
		}

		let { idusuario, perfil } = req.body;
		idusuario = (idusuario || "").toString().replace(/[^\d]+/g, "");
		if (idusuario === "") {
			return res
				.status(401)
				.json({ error: ["Forneça a identificação do usuário"] });
		}

		return await UsuarioModel.findOne({ where: { idusuario } })
			.then(async (usuario) => {
				if (usuario) {
					await usuario.update({ perfil });
					return res
						.status(200)
						.json({ idusuario, mail: usuario.mail, perfil: usuario.perfil });
				}
				return res.status(400).json({ error: ["Usuário não identificado"] });
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async list(req, res) {
		let { limit, offset } = req.body;
		return await UsuarioModel.findAndCountAll({
			attributes: ["idusuario", "mail", "perfil"],
			order: [["mail", "ASC"]],
			offset,
			limit,
		})
			.then((usuarios) => {
				return res.status(200).json({
					usuarios: usuarios.rows.map((item) => item.get()),
					count: usuarios.count,
				});
			})
			.catch((e) => {
				return res.status(400).json({ error: [e.message] });
			});
	}
}

module.exports = UsuarioController;
