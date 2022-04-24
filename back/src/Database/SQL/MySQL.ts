import { DBResult } from "../../../../Common/models/DBResult";
import { IQuerySQL } from "./IQuerySQL";

export class MySQL implements  IQuerySQL {

    url: string;
    pool: any;

    constructor(url?: string) {
        this.url = url || '';
    }

    // responsável pela conexão
    private connect() {
        return new Promise<any>((resolve, reject) => {
            let mysql = require('mysql');
            this.pool = mysql.createConnection(this.url);
            this.pool.connect((err: any) => {
                if (err) {
                    reject(err);
                }
                resolve(this.pool);
            });
        });
    }

    // responsável por executar a query
    async query(select_query: string, params: any, isRun?: boolean, isTransaction?: boolean, datasetId?: number): Promise<DBResult> {
        return new Promise<DBResult>((resolve, reject) => {
            const listParamValues: any[] = [];

            // if (process.env.DEBUG && isRun) {
                this.logDebug(select_query, params, datasetId);
            // }

            // // verifica se existem parâmetros
            if (params) {
                const keys: any[] = Object.keys(params);
                let indexParamsList = 1;
                for(let i = 0; i < keys.length; i++) {
                    // percorre os parâmetros
                    const key = keys[i];
                    if(key.includes('#')) {
                        // pega o valor do parâmetro
                        let paramValue: any = params[key];
                        // console.log('select query', select_query.includes(key));
                        if(select_query.includes(key)){
                            select_query = select_query.replace(key, `?`);
                            indexParamsList = indexParamsList + 1;
                            listParamValues.push(paramValue);
                            // console.log('list params', listParamValues);
                        }
                    }
                }
            }

            // cria a conexão
            this.connect()
            .then(async (client) => {
                // se conseguir conectar, roda a query
                client.query(select_query, listParamValues, (err: any, results: any, fields: any) => {
                    if (err) {
                        // retorna erro se não conseguir executar consulta
                        return resolve (new DBResult('Error executing query: ' + err.sqlMessage, [], false));
                    }
                    // fecha a conexão
                    client.end();
                    return resolve(new DBResult('Consulta executada com sucesso!', results, true));
                });
            })
            .catch((err: any) => {
                // retorna erro se não conseguir conectar
                return resolve (new DBResult('Error acquiring client: ' + (err.sqlMessage || err.stack), [], false));
            })
        });
    }

    // função para debugar a consulta
    async logDebug(query: string, params: any, datasetid?: number, ) {
        if (params) {
            const keys: any[] = Object.keys(params);
            for (const key of keys) {
                let paramValue: any = params[key];
                query = query.replace(key, `'` + paramValue + `'`)
            }
        }
        console.log(`DEBUG | ${datasetid}==> `, query);
    }
}