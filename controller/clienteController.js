const Cliente = require("../models/Cliente");
const Ingresso = require("../models/Ingresso");

class ClienteController {

    static async relatorio(req, res) {
        try {
            const clientes = await Cliente.find();
            const removido = req.query.removido === "1";
            res.render("clientes/relatorio", { clientes, removido });
        } catch (error) {
            res.status(500).send("Erro ao carregar relatório: " + error.message);
        }
    }


    static async detalhar(req, res) {
        const cpfCliente = req.params.cpf;

        try {
            const cliente = await Cliente.findOne({ cpf: cpfCliente });

            if (!cliente) {
                return res.render("clientes/detalhar", { cliente: null });
            }

            res.render("clientes/detalhar", { cliente });
        } catch (error) {
            res.status(500).send("Erro ao buscar cliente: " + error.message);
        }
    }

    static async cadastrarGet(req, res) {
        try {
            res.render("clientes/cadastrar", { cliente: null, sucesso: false, atualizado: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar a página: " + error.message);
        }
    }   


    static async cadastrarPost(req, res) {
    const { _id, nome, cpf, telefone } = req.body;

        try {
            if (_id) {
                await Cliente.findByIdAndUpdate(_id, { nome, telefone });

                return res.render("clientes/cadastrar", {cliente: { _id, nome, cpf, telefone },sucesso: false, atualizado: true});
            }

            const novoCliente = new Cliente({ nome, cpf, telefone });
            await novoCliente.save();

            res.render("clientes/cadastrar", { cliente: {}, sucesso: true, atualizado: false  });

        } catch (error) {
            res.status(500).send("Erro ao salvar cliente: " + error.message);
        }
    }


    static async remover(req, res) {
        try {
            const cpfCliente = req.params.cpf;

            const cliente = await Cliente.findOne({ cpf: cpfCliente });

            if (!cliente) {
                return res.status(404).render("404");
            }

            await Ingresso.deleteMany({ cliente: cliente._id });

            await Cliente.deleteOne({ cpf: cpfCliente });

            res.redirect("/clientes/relatorio?removido=1");

        } catch (error) {
            res.status(500).send("Erro ao deletar cliente: " + error.message);
        }
    }


    static async atualizarGet(req, res) {
        try {
            const cliente = await Cliente.findById(req.params.id);
            if (!cliente) {
                return res.status(404).render("404");
            }
            res.render("clientes/cadastrar", { cliente, sucesso: false, atualizado: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar cliente para atualização: " + error.message);
        }
    }

}

module.exports = ClienteController;
