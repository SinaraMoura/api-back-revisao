const { json } = require('express');
const express = require('express');
const router = express.Router();
const { cadastrarTarefa, atualizarTarefa, listarTarefas, detalharTarefas, deletarTarefa } = require('../controllers/todos');
const { cadastrarUsuarios, login, listarUsuarios } = require('../controllers/usuarios')
const verificaLogin = require('../middleware/verificaLogin');

router.get('/', listarUsuarios)
router.post('/usuarios', cadastrarUsuarios);
router.post('/login', login);


router.use(verificaLogin);
router.post('/cadastrarTarefa', cadastrarTarefa);

router.put('/atualizarTarefa/:id', atualizarTarefa);
router.get("/listarTarefa", listarTarefas)
router.get("/detalharTarefa/:id", detalharTarefas)
router.delete("/deletarTarefa/:id", deletarTarefa)


module.exports = router;