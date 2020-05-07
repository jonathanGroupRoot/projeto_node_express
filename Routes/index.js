const express = require('express');
const router  = express.Router();
const auth = require('../Middlewares/auth');

router.get('/', auth, (req,resp) => {
    // console.log(res.locals.auth_data);
    return resp.send({message: 'Tudo certo GET index'});
});

router.post('/',(req,resp) => {
    return resp.send({message: 'Tudo certo com POST index'});
});

module.exports = router;