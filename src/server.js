const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.send("pagina inicial");
});

app.listen("999", function(){
    console.log("Rodando");
});  



