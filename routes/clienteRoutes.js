const express = require('express');
const routes = express.Router();
const clienteController = require("../controller/clienteController");


routes.get("/relatorio", clienteController.relatorio);
routes.get("/detalhar/:cpf", clienteController.detalhar);
routes.get("/cadastrar", clienteController.cadastrarGet);
routes.post("/cadastrar", clienteController.cadastrarPost);
routes.get("/remover/:cpf", clienteController.remover);
routes.get("/atualizar/:id", clienteController.atualizarGet);




module.exports = routes;