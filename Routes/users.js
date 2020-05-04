const express = require('express');
const router = express.Router();
const Users = require('../Model/user');

router.get('/listarUsuarios', (req,resp) => {
    Users.find({}, (error,data) => {
        if(error) 
        {
            return resp.end({error:'Erro ao consultar os usuarios'});
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
            return resp.send(data);
        });
    });
});
module.exports = router;