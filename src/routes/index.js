const router = require("express").Router();

router.use("/usuario", require("./usuario"));
router.use("/vacina", require("./vacina"));
router.use("/registro", require("./registro"));

router.use((req, res) => {
	res.status(400).json({ error: ["Operação desconhecida"] });
});

module.exports = router;
