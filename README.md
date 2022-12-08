# UniDev

Sistema para cadastro e resolução de problemas de programação.

Front-end: AngularJS
Back-end: Node.js
Banco de dados: MySQL


## 1 - Configurando banco de dados
Rode o script de criação de banco de dados na pasta /scripts/create_script_database.sql no banco SQL


## 2 - Configurando conexão com o banco de dados
Configure o arquivo .env na pasta da API do projeto /back/.env

```bash
##SERVER
PORT = 3000

## SQL SERVER
DB_PORT = 1433
DB_HOST = 'localhost'

DB_LOGGING = 'false'

## DATABASE
DB_USERNAME = 'sa'
DB_PASSWORD = 'password'
DB_DATABASE = 'UniDev'
DB_TIME_ZONE = '-03:00:00'

PATH_EXEC = 'pasta que acontecerá as execuções dos testes dos problemas de programação'
LANGUAGE = 'pt-br'
```


## 3 - Instalação
Rodar o mesmo comando em dois diretórios para instalação das bibliotecas: /back e /view

```bash
$ npm install
```

## 4 - Rodar o sistema

Para rodar o front-end execute:
```bash
$ npm  start
```

Para rodar o back-end execute:
```bash
$ npm run start
```

## Autor: Douglas Schuch
