
const express = require('express');
const app = express();

const Aluno = require("./aluno");
const aluno1 = new Aluno("Rafael", "ifpe32","informatica");
const aluno2 = new Aluno("ze", "ifpe44","informatica");
const aluno3 = new Aluno("Rafael", "ifpe55","informatica");
const alunoV = [aluno1,aluno2,aluno3];

app.get("/alunos", function(req, res){
    let html = "";
    for (const aluno of alunoV) {
        html += 
        <b>Nome:</b> ${aluno.nome} <br>
        <b>matricula:</b> ${aluno.matricula} <br>
        <b>Curso:</b> ${aluno.curso} <br>
        <hr>
        ;
        
    }
    res.send(html);
});


app.get("/", function(req, res){
    res.send("pagina inicial");
});

app.listen("999", function(){
    console.log("Rodando");
});  



