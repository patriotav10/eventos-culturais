const express = require('express');
const routes = express.Router();
const eventoController = require("../controller/eventoController");


routes.get("/relatorio", eventoController.relatorio);
routes.get("/detalhar/:id", eventoController.detalhar);
routes.get("/cadastrar", eventoController.cadastrarGet);
routes.post("/cadastrar", eventoController.cadastrarPost);
routes.get("/remover/:id", eventoController.remover);
routes.get("/atualizar/:id", eventoController.atualizarGet);

module.exports = routes;