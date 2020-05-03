const express = require('express');
const router = express.Router();

router.get('/listarUsuarios', (req,resp) => {
    return resp.send({Usuario: 'Usuario listado com sucesso!!'});
});

router.post('/cadastrarUsuarios',(req,resp) => {
    return resp.send({Usuario: 'Usuario cadastrado com sucesso!!'});
});
module.exports = router;