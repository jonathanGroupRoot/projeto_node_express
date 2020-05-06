const express = require('express');
const router = express.Router();
const Users = require('../Model/user');
const bcrypt = require('bcrypt');

router.get('/listarUsuarios', async (req,resp) => {
    try
    {
        const user = await Users.find({});
        return resp.send({user});
    }
    catch(erro)
    {
        if(erro)
        {
            return resp.send({erro: "Erro ao buscar usuário"});
        }
    }
});
router.post('/cadastrarUsuarios', async (req,resp) =>
{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return resp.send({erro: "Dados Insuficientes"});
    }
    try
    {
        if(await Users.findOne({email}))
        {
            return resp.send({Erro: "Usuário já cadastrado"});
        }
        const user = await Users.create(req.body);
        user.password = undefined;
        return resp.send({user});
    }catch(err)
    {
        return resp.send({usuario: 'Erro ao buscar usuários!'});
    }
});

router.post('/auth', async (req,resp) => {
    const {email,password} = req.body;
    if(!email || !password) 
    {
        return resp.send({Erro: "Dados insuficientes"});
    }
    try
    {
        const user = await Users.findOne({email}).select("+password");
        const pass_ok = await bcrypt.compare(password, user.password);
            if(!pass_ok)
            {
                return resp.send({msg: "Erro ao autenticar usuário"});
            }
        user.password = undefined;
        return resp.send({user});
    }
    catch(error)
    {
        return resp.send({Erro: "Erro ao buscar o usuário"});
    }
});

module.exports = router;