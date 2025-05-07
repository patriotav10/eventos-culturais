const Cliente = require("../models/Cliente");

class ClienteController{

    static async relatorio(req, res) {
        const clientes = await Cliente.find();
        res.render("clientes/relatorio", { clientes });
    };
    
    static async detalhar(req, res) {
        const cpfCliente = req.params.cpf; 
    
        const cliente = await Cliente.findOne({ cpf: cpfCliente }); 
        
        if (!cliente) {
            return res.render("clientes/detalhar", { cliente: null }); 
        }
    
        res.render("clientes/detalhar", { cliente }); 
    };

    static async cadastrarGet(req, res) {
        res.render("clientes/cadastrar", { sucesso: false }); 
    };

    static async cadastrarPost(req, res) {
        const { nome, cpf, telefone } = req.body;
        const novoCliente = new Cliente({ nome, cpf, telefone });

        try {
            await novoCliente.save();
            res.render("clientes/cadastrar", { sucesso: true }); 
        } catch (error) {
            res.status(500).send("Erro ao salvar cliente: " + error.message);
        }
    };
    



}






module.exports = ClienteController;