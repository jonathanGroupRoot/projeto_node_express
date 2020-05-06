const express = require('express');
const router = express.Router();
const Users = require('../Model/user');
const bcrypt = require('bcrypt');

router.get('/listarUsuarios', (req,resp) => {
    Users.find({}, (error,data) => {
        if(error) 
        {
            return resp.send({error:'Erro ao consultar os usuarios'});
        }
        return resp.send({data});

    });
});

router.post('/cadastrarUsuarios',(req,resp) => {
    const {email,password} = req.body;
    if(!email || !password)
    {
        return resp.send({erro: "Dados Insuficientes"});
    }
    Users.findOne({email},(error,data) => {
        if(error) 
        {
            return resp.send({usuario: 'Erro ao buscar usuários!'});
        }
        if(data) 
        {
            return resp.send({usuario: 'Usuário já cadastrado!'});
        }
        Users.create(req.body,(error,data) =>{
            if(error)
            {
                return resp.send({usuario: "Erro ao cadastrar usuário"});
            }
            data.password = undefined;
            return resp.send(data);
        });
    });
});
router.post('/auth',(req,resp) => {
    const {email,password} = req.body;
    if(!email || !password)
    {
        return resp.send({error: 'Dados insuficientes'});
    }
    Users.findOne({email}, (error,user) => 
    {
        if(error)
        {
            return resp.send({error: 'Erro ao buscar o usuário'});
        }
        if(!user)
        {
            return resp.send({error: 'Usuário não registrado'});
        }
        bcrypt.compare(password, user.password, (err,same) => {
            if(!same)
            {
                return resp.send({error: 'Erro ao autenticar usuário'});
            }
            user.password = undefined;
            return resp.send(user);
        });
    }).select('+password');
});
module.exports = router;