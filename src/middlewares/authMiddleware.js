const { Token } = require("../utils");
const { validateToken, decodeToken } = Token;

// verifica se o usuário possui autenticação
const authMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization)
		return res.status(401).json({ error: ["É necessário efetuar o login"] });

	const [, token] = authorization.split(" ");

	try {
		await validateToken(token);
		return next();
	} catch (error) {
		return res.status(401).json({ error: [error.message] });
	}
};

// verifica se o usuário é admin
const adminMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res.status(401).json({ error: ["É necessário efetuar o login"] });

	const [, token] = authorization.split(" ");
	try {
		const usuario = await validateToken(token);
		if (usuario.perfil && usuario.perfil === "admin") return next();
		throw new Error("Acesso autorizado apenas para usuário administrador");
	} catch (error) {
		return res.status(401).json({ error: [error.message] });
	}
};

const getToken = async (req) => {
	const { authorization } = req.headers;
	try {
		const [, token] = authorization.split(" ");
		return await decodeToken(token);
	} catch (error) {
		return null;
	}
};

module.exports = { authMiddleware, adminMiddleware, getToken };
