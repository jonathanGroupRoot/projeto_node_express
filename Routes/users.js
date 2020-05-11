const express = require('express');
const router = express.Router();
const Users = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*Status code
200 - ok.
201 - created.
202 - accepted aceitou mas ainda não processou a requisição.

400 - bad request.
401 - unauthorized -- autenticação, tem caracter tempórario.
403 - forbidden -- autorização, tem carater permanente.
404 - not found.

500 - internal server error.
501 - not implemented - a API não suporta essa funcionalade.
503 - service unavaliable - a API executa essa operação, mas não no momento indisponível
*/
//Funções auxiliares

const createUserToken = (userId) => 
{
    return jwt.sign({id: userId}, '78951root', {expiresIn: '7d'});
};

router.get('/listarUsuarios', async (req,resp) => {
    try
    {
        const user = await Users.find0({});
        return resp.send({user});
    }
    catch(erro)
    {
        if(erro)
        {
            return resp.status('500').send({erro: "Erro ao buscar usuário"});
        }
    }
});
router.post('/cadastrarUsuarios', async (req,resp) =>
{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return resp.status('400').send({erro: "Dados Insuficientes"});
    }
    try
    {
        if(await Users.findOne({email}))
        {
            return resp.status('400').send({Erro: "Usuário já cadastrado"});
        }
        const user = await Users.create(req.body);
        user.password = undefined;
        return resp.status('201').send({user, Token: createUserToken(user.id)});
    }catch(err)
    {
        return resp.status('500').send({usuario: 'Erro ao cadastrar usuários!'});
    }
});

router.post('/auth', async (req,resp) => {
    const {email,password} = req.body;
    if(!email || !password) 
    {
        return resp.status('400').send({Erro: "Dados insuficientes"});
    }
    try
    {
        const user = await Users.findOne({email}).select("+password");
        const pass_ok = await bcrypt.compare(password, user.password);
            if(!pass_ok)
            {
                return resp.status('401').send({msg: "Erro ao autenticar usuário"});
            }
        user.password = undefined;
        return resp.send({user, Token: createUserToken(user.id)});
    }
    catch(error)
    {
        return resp.status('500').send({Erro: "Erro ao buscar o usuário"});
    }
});

module.exports = router;