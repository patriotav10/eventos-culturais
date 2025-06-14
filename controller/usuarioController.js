const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");

class UsuarioController {

    static async relatorio(req, res) {
        try {
            const usuarios = await Usuario.find({}, "-senha");
            const removido = req.query.removido === "1";
            res.render("usuarios/relatorio", { usuarios, removido });
        } catch (error) {
            res.status(500).send("Erro ao carregar relatório: " + error.message);
        }
    }

    static async detalhar(req, res) {
        try {
            const usuarioId = req.params.id;
            const usuario = await Usuario.findById(usuarioId, "-senha");

            if (!usuario) {
                return res.status(404).render("404");
            }

            res.render("usuarios/detalhar", { usuario });
        } catch (error) {
            res.status(500).send("Erro ao buscar usuário: " + error.message);
        }
    }

    static async cadastrarGet(req, res) {

        if (req.session.usuario) {
            return res.redirect("/");
        }

        try {
            res.render("usuarios/cadastrar", { usuario: null, sucesso: false, erro: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar tela de cadastro: " + error.message);
        }
    }


    static async cadastrarPost(req, res) {
        const { _id, nome, email, senha } = req.body;

        try {

            if (_id) {
                const usuario = await Usuario.findById(_id);

                if (!usuario) {
                    return res.status(404).render("404");
                }

                const salt = bcryptjs.genSaltSync();
                const hash = bcryptjs.hashSync(senha, salt);

                await Usuario.findByIdAndUpdate(_id, { senha: hash });

                return res.render("usuarios/cadastrar", { usuario, sucesso: true, erro: false  });
            }

            if (req.session.usuario) {
                return res.redirect("/");
            }

            const existe = await Usuario.findOne({ email });

            if (existe) {
                return res.render("usuarios/cadastrar", { usuario: null, sucesso: false, erro: "Email já cadastrado!"  });
            }

            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(senha, salt);

            const novoUsuario = new Usuario({ nome, email, senha: hash });
            await novoUsuario.save();

            req.session.usuario = {id: novoUsuario._id,nome: novoUsuario.nome,email: novoUsuario.email };

            return res.redirect("/"); 

        } catch (error) {

            res.status(500).send("Erro ao salvar usuário: " + error.message);
        }
    }

    static async remover(req, res) {
        try {
            const id = req.params.id;

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return res.status(404).render("404");
            }

            await Usuario.findByIdAndDelete(id);
            res.redirect("/usuarios/relatorio?removido=1");
        } catch (error) {
            res.status(500).send("Erro ao remover usuário: " + error.message);
        }
    }

    static async atualizarGet(req, res) {
        try {
            const usuarioId = req.params.id;
            const usuario = await Usuario.findById(usuarioId);

            if (!usuario) {
                return res.status(404).render("404");
            }

            res.render("usuarios/cadastrar", { usuario, sucesso: false, erro: false });
        } catch (error) {
            res.status(500).send("Erro ao carregar usuário para atualização: " + error.message);
        }
    }

    static loginGet(req, res) {
        if (req.session.usuario) {
            return res.redirect("/"); 
        }
        res.render("usuarios/login", { erro: false });

    }

    static async loginPost(req, res) {
        const { email, senha } = req.body;
        
        if (req.session.usuario) {
            return res.redirect("/");
        }

        try {
            const usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return res.render("usuarios/login", { erro: "Usuário não encontrado" });
            }

            const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.render("usuarios/login", { erro: "Senha incorreta" });
            }

            req.session.usuario = {id: usuario._id,nome: usuario.nome,email: usuario.email};

            res.redirect("/"); 
        } catch (error) {
            res.status(500).send("Erro ao realizar login: " + error.message);
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect("/usuarios/login");
    }
}

module.exports = UsuarioController;

