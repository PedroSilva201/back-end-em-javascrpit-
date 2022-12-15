const router = require("express").Router();
const { UsuarioController } = require("../controllers");
const { authMiddleware, adminMiddleware } = require("../middlewares");
const { create, login, updatemail, updatesenha, updateperfil, list } =
	new UsuarioController();

// curl -X POST -d "mail=teste@teste.com&senha=123456" http://localhost:3100/usuario/create
router.post("/create", create);

// curl -X POST -d "mail=teste@teste.com&senha=123456" http://localhost:3100/usuario/login
router.post("/login", login);

// a rota é validade por authMiddleware - precisa estar logado
// curl -X PUT -d "mail=tester@teste.com" http://localhost:3100/usuario/update/mail
router.put("/update/mail", authMiddleware, updatemail);

// curl -X PUT -d "senha=123457" http://localhost:3100/usuario/update/senha
router.put("/update/senha", authMiddleware, updatesenha);

// a rota é validade por adminMiddleware - verifica se o usuário é admin
// curl -X GET -d "offset=0&limit=4" http://localhost:3100/usuario/list
router.get("/list", adminMiddleware, list);

// curl -X PUT -d "idusuario=1&perfil=admin" http://localhost:3100/usuario/update/perfil
router.put("/update/perfil", adminMiddleware, updateperfil);

router.use((req, res) => {
	res.status(400).json({ error: ["Operação desconhecida com o usuário"] });
});

module.exports = router;
