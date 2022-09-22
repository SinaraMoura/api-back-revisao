const { pool, knex } = require("../database/conexao");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const senhaJwT = require('../segredo');

const listarUsuarios = async (req, res) => {
    try {
        const usuario = knex('usuarios');
        return res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}
const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {

        const emailExists = await pool.query(
            `select * from usuarios
            where email = $1`, [email]
        )

        if (emailExists.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Email já existente' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const query = 'insert into usuarios (nome,email,senha) values ($1,$2,$3) returning *';
        const params = [nome, email, senhaCriptografada];

        const { rows } = await pool.query(query, params);
        const { senha: _, ...usuario } = rows[0];

        return res.status(200).json(usuario)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const { rows, rowCount } = await pool.query(
            `select * from usuarios where email = $1`, [email]
        )

        const { senha: senhaUsuario, ...usuario } = rows[0]

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: 'Email ou senha invalidos' });
        }

        const validarSenha = await bcrypt.compare(senha, senhaUsuario);

        if (!validarSenha) {
            return res.status(400).json({ mensagem: 'Email ou senha invalidos' });
        }

        const token = jwt.sign({ id: usuario.id }, senhaJwT, { expiresIn: '8h' });

        return res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}



module.exports = { cadastrarUsuarios, login, listarUsuarios }