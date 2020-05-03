const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Configuração e conexão com banco de dados
mongoose.connect('mongodb+srv://jonathan_adm:78951root@clusterapi-irvcy.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com banco de dados' + err);
});
mongoose.connection.on('disconnected',(disc) => {
    console.log('Banco de dados desconectado ' + disc);
});
mongoose.connection.on('connected', () => {
    console.log('Banco de dados conectado com sucesso ');
});

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//Rotas
const routerIndex = require('./Routes/index');
const routerUsuarios = require('./Routes/users');

app.use('/', routerIndex);
app.use('/usuarios', routerUsuarios);

//Porta
app.listen(3000,() => {
    console.log('Servidor está funcionando');
}); 

module.exports = app;