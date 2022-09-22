const pool = require('../database/conexao');
const jwt = require('jsonwebtoken');
const senhaJwT = require('../segredo');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];


    try {

        const { id } = jwt.verify(token, senhaJwT);

        const { rows, rowCount } = await pool.query(
            `select * from usuarios
            where id = $1`, [id]
        )
        console.log(rows);
        console.log(rowCount);
        if (rowCount === 0) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        const { senha: _, ...usuario } = rows[0];

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = verificaLogin;