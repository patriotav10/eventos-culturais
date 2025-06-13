<<<<<<< HEAD
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const autenticar = require('./middleware/autenticar'); 

require('dotenv').config();

mongoose.connect("mongodb+srv://jcpn1:UraOLlJb9LCYYIGm@cluster0.xoc0kpz.mongodb.net/posto?retryWrites=true&w=majority&appName=Cluster0");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'codigoSecreto123',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});


// ======================= ROTAS ===========================
app.get("/", autenticar, (req, res) => {
    res.render("index"); 
});

const clienteRoutes = require("./routes/clienteRoutes");
app.use("/clientes", autenticar, clienteRoutes);

const eventoRoutes = require("./routes/eventoRoutes"); 
app.use("/eventos", autenticar, eventoRoutes);

const ingressoRoutes = require("./routes/ingressoRoutes");
app.use("/ingressos", autenticar, ingressoRoutes);

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes); 

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
console.log("Servidor iniciado");

});


=======

const express = require('express');
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://jcpn1:UraOLlJb9LCYYIGm@cluster0.xoc0kpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.set("view engine","ejs")
app.use(express.static("public"))

const Aluno = require("./models/Aluno");


app.get("/alunos",async function(req, res){
    const alunos = await Aluno.find();
    res.render("alunos/relatorio",{alunos}); // exibir todos os alunos

});

app.get("/alunos/:matricula",async function(req, res){
    const aluno = await Aluno.findOne({matricula: req.params.matricula});
    res.render("alunos/detalhe",{aluno}); // exibe um aluno detalhado

});


app.post("/alunos",async function(req,res){
    const {matricula,nome,curso} = req.body;

    const novoAluno = new Aluno({
        matricula: matricula,
        nome: nome,
        curso: curso
    });

    await novoAluno.save();
    res.redirect/('/alunos?s=1');
});

app.get("/", function(req, res){
    res.render("index");
});

app.use(function(req,res){
    res.status(404).render("404");
});

app.listen("999", function(){
    console.log("Rodando");
});  
>>>>>>> c20d14fd5938f6f15859c236dd98a10466547130



