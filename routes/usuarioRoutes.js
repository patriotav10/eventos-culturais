const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/usuarioController');
const autenticar = require('../middleware/autenticar');

router.get('/login', UsuarioController.loginGet);
router.post('/login', UsuarioController.loginPost);
router.get('/logout', UsuarioController.logout);

router.get('/cadastrar', UsuarioController.cadastrarGet);
router.post('/cadastrar', UsuarioController.cadastrarPost);

router.get('/relatorio', autenticar, UsuarioController.relatorio);
router.get('/detalhar/:id', autenticar, UsuarioController.detalhar);
router.get('/atualizar/:id', autenticar, UsuarioController.atualizarGet);
router.get('/remover/:id', autenticar, UsuarioController.remover);

module.exports = router;
