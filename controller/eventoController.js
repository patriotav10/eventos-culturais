const Evento = require("../models/Evento");
const Ingresso = require("../models/Ingresso");

class EventoController {

    static async relatorio(req, res) {
        try {
            const eventos = await Evento.find();
            const removido = req.query.removido === "1";
            res.render("eventos/relatorio", { eventos, removido });
        } catch (error) {
            res.status(500).send("Erro ao carregar relatório de eventos: " + error.message);
        }
    }

    static async detalhar(req, res) {
        const eventoId = req.params.id;

        try {
            const evento = await Evento.findById(eventoId);

            if (!evento) {
                return res.render("eventos/detalhar", { evento: null });
            }

            res.render("eventos/detalhar", { evento });
        } catch (error) {
            res.status(500).send("Erro ao buscar evento: " + error.message);
        }
    }

    static async cadastrarGet(req, res) {
        try {
            res.render("eventos/cadastrar", {evento: {},sucesso: false,atualizado: false});
        } catch (error) {
            res.status(500).send("Erro ao carregar página de cadastro: " + error.message);
        }
    }

    static async cadastrarPost(req, res) {
        const { _id, nome, data, local } = req.body;

        try {
            if (_id) {
                await Evento.findByIdAndUpdate(_id, { nome, data, local });
                const evento = await Evento.findById(_id);

                res.render("eventos/cadastrar", { evento, sucesso: false,atualizado: true });
            } else {
                
                const novoEvento = new Evento({ nome, data, local });
                await novoEvento.save();

                res.render("eventos/cadastrar", {
                evento: {},sucesso: true,atualizado: false });
            }
        } catch (error) {
            res.status(500).send("Erro ao salvar evento: " + error.message);
        }
    }

    static async remover(req, res) {
        try {
            const eventoId = req.params.id;

            const evento = await Evento.findById(eventoId);
            if (!evento) {
                return res.status(404).render("404");
            }

            await Ingresso.deleteMany({ evento: evento._id });

            await Evento.deleteOne({ _id: eventoId });

            res.redirect("/eventos/relatorio?removido=1");
        } catch (error) {
            res.status(500).send("Erro ao remover evento: " + error.message);
        }
    }

    static async atualizarGet(req, res) {
        try {
            const evento = await Evento.findById(req.params.id);

            if (!evento) {
                return res.status(404).render("404");
            }

            res.render("eventos/cadastrar", { evento,sucesso: false,atualizado: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar página de atualização: " + error.message);
        }
    }
}

module.exports = EventoController;
