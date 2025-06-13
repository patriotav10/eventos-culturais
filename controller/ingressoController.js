const Ingresso = require("../models/Ingresso");
const Cliente = require("../models/Cliente");
const Evento = require("../models/Evento");

class IngressoController {

    static async relatorio(req, res) {
        try {
            const ingressos = await Ingresso.find().populate("cliente").populate("evento");
            const removido = req.query.removido === "1";
            res.render("ingressos/relatorio", { ingressos, removido });
        } catch (error) {
            res.status(500).send("Erro ao carregar relatório: " + error.message);
        }
    }


    static async detalhar(req, res) {
        const ingressoId = req.params.id;
        
            try {
                const ingresso = await Ingresso.findById(ingressoId).populate("cliente").populate("evento");
        
                res.render("ingressos/detalhar", { ingresso });
            } catch (error) {
                res.status(500).send("Erro ao buscar ingresso: " + error.message);
            }
    }

    static async cadastrarGet(req, res) {
        try {
            const clientes = await Cliente.find();
            const eventos = await Evento.find();
            res.render("ingressos/cadastrar", { clientes, eventos, ingresso: null, sucesso: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar dados: " + error.message);
        }
    }

  static async cadastrarPost(req, res) {
    const { _id, cliente, evento, valor } = req.body;

        try {
            const clientes = await Cliente.find();
            const eventos = await Evento.find();

            if (_id) {
                await Ingresso.findByIdAndUpdate(_id, { valor });
                const ingresso = await Ingresso.findById(_id).populate('cliente').populate('evento');

                return res.render("ingressos/cadastrar", { clientes, eventos, ingresso, sucesso: true });
                
            } else {
                const ingresso = new Ingresso({ cliente, evento, valor });
                await ingresso.save();

                return res.render("ingressos/cadastrar", { clientes, eventos, ingresso: null, sucesso: true });
            }
        } catch (error) {
            res.status(500).send("Erro ao salvar ingresso: " + error.message);
        }
    }




    static async remover(req, res) {
        try {
            const id = req.params.id;

            const ingresso = await Ingresso.findById(id);
            if (!ingresso) {
                return res.status(404).render("404");
            }

            await Ingresso.findByIdAndDelete(id);

            res.redirect("/ingressos/relatorio?removido=1");
        } catch (error) {
            res.status(500).send("Erro ao remover ingresso: " + error.message);
        }
    }


    static async atualizarGet(req, res) {
       
        try {
            const ingressoId = req.params.id;
            const ingresso = await Ingresso.findById(ingressoId).populate("cliente").populate("evento");
            const clientes = await Cliente.find();
            const eventos = await Evento.find();

            if (!ingresso) {
                return res.status(404).render("404");
            }

            res.render("ingressos/cadastrar", { clientes, eventos, ingresso, sucesso: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar ingresso para atualização: " + error.message);
        }
    }



}

module.exports = IngressoController;
