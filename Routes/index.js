const express = require('express');
const router  = express.Router();

router.get('/',(req,resp) => {
    return resp.send({message: 'Tudo certo GET index'});
});

router.post('/', (req,resp) => {
    return resp.send({message: 'Tudo certo com POST index'});
});

module.exports = router;