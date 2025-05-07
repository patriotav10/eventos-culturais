
const express = require('express');
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jcpn1:UraOLlJb9LCYYIGm@cluster0.xoc0kpz.mongodb.net/posto?retryWrites=true&w=majority&appName=Cluster0");

app.set("view engine", "ejs");

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));


const Cliente = require("./models/Cliente");
const Evento = require("./models/Evento");
const Ingresso = require("./models/Ingresso");

// ======================= ROTAS ===========================

app.get("/", function(req, res) {
    res.render("index"); 
});

const clienteRoutes = require("./routes/clienteRoutes");
app.use("/clientes",clienteRoutes);

const eventoRoutes = require("./routes/eventoRoutes");
app.use("/eventos",eventoRoutes);


app.get("/ingressos/cadastrar", async (req, res) => {
    try {
        const clientes = await Cliente.find();
        const eventos = await Evento.find();
        res.render("ingressos/cadastrar", { clientes, eventos, sucesso: false });
    } catch (error) {
        res.status(500).send("Erro ao carregar dados: " + error.message);
    }
});
  

app.post("/ingressos", async (req, res) => {
    const { cliente, evento, valor } = req.body;
    
    const novoIngresso = new Ingresso({cliente,evento, valor});

    try {
        await novoIngresso.save();

        const clientes = await Cliente.find();
        const eventos = await Evento.find();

        res.render("ingressos/cadastrar", { clientes, eventos, sucesso: true });
    } catch (error) {
        res.status(500).send("Erro ao salvar ingresso: " + error.message);
    }
});


app.get("/ingressos/relatorio", async (req, res) => {
    const ingressos = await Ingresso.find().populate("cliente").populate("evento");
    res.render("ingressos/relatorio", { ingressos });
});
  


app.get("/ingressos/detalhar/:id", async (req, res) => {
    const ingressoId = req.params.id;

    try {
        const ingresso = await Ingresso.findById(ingressoId).populate("cliente").populate("evento");

        res.render("ingressos/detalhar", { ingresso });
    } catch (error) {
        res.status(500).send("Erro ao buscar ingresso: " + error.message);
    }
});



app.use(function(req, res) {
    res.status(404).render("404"); 
});


app.listen("999", function() {
    console.log("Servidor rodando na porta 999");
});






