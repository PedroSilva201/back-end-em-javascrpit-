const { VacinaModel, RegistroModel } = require("../models");

class VacinaController {
	async create(req, res) {
		let { nome } = req.body;
		nome = (nome || "").toString().trim();
		if (nome === "") {
			return res.status(400).json({ error: ["Forneça o nome da vacina"] });
		}

		return await VacinaModel.create({ nome })
			.then((r) => {
				const { idvacina } = r.get();
				return res.status(200).json({ idvacina, nome });
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

	async update(req, res) {
		let { idvacina, nome } = req.body;
		idvacina = (idvacina || "").toString().replace(/[^\d]+/g, "");
		nome = (nome || "").toString().trim();
		if (idvacina === "") {
			return res
				.status(400)
				.json({ error: ["Forneça a identificação da vacina"] });
		}

		return await VacinaModel.findOne({ where: { idvacina } })
			.then(async (vacina) => {
				if (vacina) {
					await vacina.update({ nome });
					return res.status(200).json({ idvacina, nome });
				}
				return res.status(400).json({ error: ["Vacina não identificada"] });
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

	async remove(req, res) {
		let { idvacina } = req.body;
		idvacina = (idvacina || "").toString().replace(/[^\d]+/g, "");
		if (idvacina === "") {
			return res
				.status(400)
				.json({ error: ["Forneça a identificação da vacina"] });
		}

		return await VacinaModel.findOne({ where: { idvacina } })
			.then(async (vacina) => {
				if (vacina !== null) {
					const registro = await RegistroModel.findOne({ where: { idvacina } });
					if (!registro) {
						await vacina.destroy();
						return res.status(200).json({ idvacina });
					} else {
						return res.status(400).json({
							error: ["Não pode ser excluída por estar em algum registro"],
						});
					}
				} else {
					return res.status(400).json({ error: ["Registro inexistente"] });
				}
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
		return await VacinaModel.findAndCountAll({
			attributes: ["idvacina", "nome"],
			order: [["nome", "ASC"]],
			offset,
			limit,
		})
			.then((vacinas) => {
				return res.status(200).json({
					vacinas: vacinas.rows.map((item) => item.get()),
					count: vacinas.count,
				});
			})
			.catch((e) => {
				return res.status(400).json({ error: [e.message] });
			});
	}
}

module.exports = VacinaController;
