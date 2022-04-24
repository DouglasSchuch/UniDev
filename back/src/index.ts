import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata";

require('dotenv').config()

// const sql = require("mssql");

const app = express();         
const port = process.env.PORT; //porta padrão
//const router = express.Router();


app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

var compression = require('compression');
var helmet = require('helmet');
app.use(compression());
app.use(helmet());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});

app.use(cors({
    exposedHeaders: ['token']
}));

//loga as variaveis de ambiente
const env = { 
    "SQLCONNSTR_Server" : process.env.SQLCONNSTR?.split(';')[0]
    , "SQLCONNSTR_REPORTS_Server": process.env.SQLCONNSTR_REPORTS?.split(';')[0]
    , "SQLCONNSTR_DB" : process.env.SQLCONNSTR?.split(';')[1]
    , "SQLCONNSTR_REPORTS_DB": process.env.SQLCONNSTR_REPORTS?.split(';')[1]
    , 'DATABASE_DRIVER': process.env.DATABASE_DRIVER
    , 'EXPIRESIN': process.env.EXPIRESIN
    , 'THEME': process.env.THEME
    , 'LANGUAGE': process.env.LANGUAGE
    , 'LICENSE_URI:': process.env.LICENSE_URI
    , 'LICENSE_PORT': process.env.LICENSE_PORT
    , 'WILDCARD': process.env.WILDCARD
    , 'DEBUG': process.env.DEBUG
};

app.use('/config', (req, res, next) => {
    res.status(200).send(env);
});

import appRouter from '../src/Routes'
app.use('/', appRouter);

console.table(env);
//inicia o servidor
app.listen(port);
console.log(`API funcionando na porta ${process.env.PORT}`);