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





