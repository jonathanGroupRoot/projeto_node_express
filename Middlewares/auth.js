const jwt = require('jsonwebtoken');

const auth = (req, resp, next) => 
{
    const token_header = req.body.auth;
    if(!token_header)
    {
        return resp.send({Erro: "Token não enviado"});
    }
    jwt.verify(token_header, '78951root', (err,decoded) => 
    {
        if(err)
        {
            return resp.send({Erro: "Token inválido"});
        }
        resp.locals.auth_data = decoded;
        return next();
    });
}
module.exports = auth;