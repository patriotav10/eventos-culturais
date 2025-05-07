
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



