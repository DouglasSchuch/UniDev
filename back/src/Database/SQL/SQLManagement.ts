import sql from 'mssql';
import { DBResult } from "../../../../Common/models/DBResult";
import { IQuerySQL } from './IQuerySQL';
let _rolledBack: boolean = false;
let _connectionController: any = {};
let _inTransaction: boolean = false;

interface ConnectionPoolList {
    inUse: boolean; 
    connectionPool: sql.ConnectionPool
}

export class SQLManagement implements IQuerySQL {

    connStr: string;
    fromUser: boolean = false;
    private connectionPool: ConnectionPoolList[] =[]

    constructor(sqlConnStr?: string) {
        this.connStr = sqlConnStr || '';
    }

    private createNewConnection(): ConnectionPoolList {
        return {
            inUse: true,
            connectionPool: new sql.ConnectionPool(this.connStr)
        }
    }

    getConnection() {
        const conn = this.connectionPool.filter(c => !c.inUse)
        if (conn && conn.length > 0) {
            conn[0].inUse = true
            return conn[0]
        } else {
            const newConn = this.createNewConnection()
            this.connectionPool.push(newConn)
            return newConn
        }
    }
    
    async logDebug(sql: string, params: any, datasetid?: number, ){
        if (params) {
            const keys = Object.keys(params)
            if (keys && keys.length > 0) {
                for (let i=0; i<keys.length; i++) {
                    let key = keys[i];
                    //retira todos os # dos nomes dos parametros
                    sql = sql.replace(new RegExp(key, 'g'), "'"+params[key]+"'")
                }
            }
        }
        console.log(`DEBUG | ${datasetid}==> `, sql);
    }

    getStatus(type: string) {
        switch (type) {
            case 'transaction':
                // console.log('getStatus ==> ', _inTransaction);
                if (_inTransaction) {
                    return true;
                }
                return false;
            case 'connection':
                return false;
        }
        return false;
    }

    //#region transaction
    async startPoolConnection(startTransaction: boolean) {
        const connection: sql.ConnectionPool = new sql.ConnectionPool(this.connStr);
        return await connection.connect().then(async (pool: sql.ConnectionPool) => {
            if (startTransaction) {
                const transaction: any = await this.startTransaction(pool);
                _connectionController = { transaction, connection };
                return _connectionController;
            } else {
                _connectionController = { transaction: null, connection };
            }
            
            return connection;
        });
    }

    async startTransaction(pool: sql.ConnectionPool) {
        const transaction: sql.Transaction = new sql.Transaction(pool);
        return await transaction.begin().then(async (transactionBegin: any) => {
            _inTransaction = true;
            transaction.on('rollback', (aborted: any) => {
                _rolledBack = true;
            });
            return transactionBegin;
        });
    }

    async query(query: string, params: any, isRun: boolean = false, isTransaction: boolean = false, datasetId?: number) {
        let requestPool: any = _connectionController.transaction;
        if (!isTransaction && !_inTransaction) {
            requestPool = await this.startPoolConnection(false);
        }
        const request: sql.Request = new sql.Request(requestPool);
        const queryToRun: string = 'SET DATEFORMAT DMY; ' + query;

        if (params) {
            const keys: any[] = Object.keys(params);
            for (const key of keys) {
                const param: string = key.replace(/#/gi, '');
                let paramValue: any = params[key];

                if (typeof paramValue === 'string' && isRun) {
                    let paramValueAux: string = ('');

                    for (let i = 0; i < paramValue.length; i++) {
                        const valueAux = i === 0 ? '' : paramValue[i - 1];
                        if (valueAux !== '\\' && paramValue[i] === '*') {
                            paramValueAux += '%';
                        } else {
                            paramValueAux += paramValue[i];
                        }
                    }

                    paramValue = paramValueAux.replace(/\\\*/g, '*');
                }

                request.input(param, sql.VarChar, paramValue);
            }
        }

        if (process.env.DEBUG && isRun) {
            this.logDebug(queryToRun, params, datasetId);
        }

        const newQuery: string = queryToRun.replace(/#/gi, "@");
        // console.log('query ===> ', newQuery, params, ' | in transaction ===> ', _inTransaction);
        const timeStart = new Date();
        return await request.query(newQuery).then((result: any) => {
            // console.log('result ok ===> ', result.recordset);
            const timeDiff = Math.abs((new Date()).getTime() - timeStart.getTime());
            const diffSec = (timeDiff / 1000).toFixed(5); 
            if (process.env.DEBUG === "2") {
                console.log('Query: ', newQuery);
                console.log('Time Execution: ', diffSec, " seconds");
            }

            let numberPages: number = (-1);
            return new DBResult('Consulta executada com sucesso!', result.recordset, true, numberPages);
        }).catch(async (err: any) => {
            console.log('rollback ===> ', isTransaction, _inTransaction, err);
            const timeDiff = Math.abs((new Date()).getTime() - timeStart.getTime());
            const diffSec = (timeDiff / 1000).toFixed(5); 
            if (process.env.DEBUG === "2") {
                console.log('Query: ', newQuery);
                console.log('Error Time Execution: ', diffSec, " seconds");
            }
            if (isTransaction || _inTransaction) {
                _inTransaction = false;
                //_connectionController = {};
                await requestPool.rollback();
            }
            return new DBResult(`${err.originalError}`, [], false);
        }).finally(() => {
            if (!isTransaction && !_inTransaction) {
                // console.log('close connection finally ===> ');
                requestPool.close();
            }
        });
    }

    async startRollBack() {
        await _connectionController.transaction.rollback();
    }

    async closePoolConnection() {
        if (_connectionController.transaction && _inTransaction) {
            return await _connectionController.transaction.commit(async (err: any) => {
                return await _connectionController.connection.close().then((close: any) => {
                    _inTransaction = false;
                    _connectionController = {};
                    console.log('transaction commited and connection closed ===>', close);
                });
            });
        } else {
            return await _connectionController.connection.close().then((close: any) => {
                console.log('connection closed ===>', close);
            });
        }
    }
    //#endregion transaction
}
