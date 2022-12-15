const router = require("express").Router();
const { VacinaController } = require("../controllers");
const { authMiddleware, adminMiddleware } = require("../middlewares");
const { create, update, remove, list } = new VacinaController();

// a rota é validade por authMiddleware - precisa estar logado
// curl -X GET -d "offset=0&limit=4" http://localhost:3100/vacina/list
router.get("/list", authMiddleware, list);

// a rota é validade por adminMiddleware - verifica se o usuário é admin
// curl -X POST -d "nome=Covid 1a dose" http://localhost:3100/vacina/create
router.post("/create", adminMiddleware, create);

// curl -X PUT -d "idvacina=Covid dose única" http://localhost:3100/vacina/update
router.put("/update", adminMiddleware, update);

// curl -X DELETE -d "idvacina=1" http://localhost:3100/vacina/remove
router.delete("/remove", adminMiddleware, remove);

router.use((req, res) => {
	res.status(400).json({ error: ["Operação desconhecida com a vacina"] });
});

module.exports = router;
