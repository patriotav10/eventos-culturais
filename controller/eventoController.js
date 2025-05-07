const Evento = require("../models/Evento");

class EventoController{

    static async relatorio(req, res) {
        const eventos = await Evento.find();
        res.render("eventos/relatorio", { eventos });
    };
    
    static async detalhar(req, res) {
        const eventoId = req.params.id; 
        
        const evento = await Evento.findById(eventoId); 
        
        if (!evento) {
            return res.render("eventos/detalhar", { evento: null }); 
        }

        res.render("eventos/detalhar", { evento }); 
    };

    static async cadastrarGet(req, res) {
        res.render("eventos/cadastrar", { sucesso: false });
    };

    static async cadastrarPost(req, res) {
        const { nome, data, local } = req.body;
        const novoEvento = new Evento({ nome, data, local });

        try {
            await novoEvento.save();
            res.render("eventos/cadastrar", { sucesso: true }); 
        } catch (error) {
            res.status(500).send("Erro ao salvar evento: " + error.message);
        }
    };
}






module.exports = EventoController;