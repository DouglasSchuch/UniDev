const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const sql = require("mssql");

const app = express();         
const port = 3000; //porta padrão
const router = express.Router();

require('./Routes/RouteManagement')(router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});

app.use(cors());
app.use('/', router);

//inicia o servidor
app.listen(port);


console.log('API funcionando!');