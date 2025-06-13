const express = require('express');
const routes = express.Router();
const ingressoController = require("../controller/ingressoController");

routes.get("/relatorio", ingressoController.relatorio);
routes.get("/detalhar/:id", ingressoController.detalhar);
routes.get("/cadastrar", ingressoController.cadastrarGet);
routes.post("/cadastrar", ingressoController.cadastrarPost);
routes.get("/remover/:id", ingressoController.remover);
routes.get("/atualizar/:id", ingressoController.atualizarGet);

module.exports = routes;
