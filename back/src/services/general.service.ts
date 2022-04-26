// imports NEST
import { Injectable } from '@nestjs/common';

// imports libs
import { ForeignKeyConstraintError, Transaction } from 'sequelize';
import { DBResult } from '../../../common/models/DBResult';
@Injectable()
export class GeneralService {
  async sucessResult(message: string, data: any[], transaction: Transaction = null) {
    if (transaction) {
      await transaction.commit().catch(err => data);
    }
    return new DBResult(message, data, true);
  }

  async errorResult(message: string, data: any[], transaction: Transaction = null) {
    // Existem erros em que o mssql reverte automaticamente a transaction e outros em que não.
    // Por exemplo o DatabaseError, reportado quando passamos para uma propriedade um valor diferente do esperado.
    // Por isso aqui coloquei um catch, que se a transaction não existir, ele retona o erro reportado pelo banco antes da transaction
    if (transaction) {
      await transaction.rollback().catch(err => data);
    }

    //Se for erro do tipo FKConstraint retornar mensagem de erro personalizada.
    if (data instanceof ForeignKeyConstraintError && data.sql.includes('DELETE FROM')) {
      message = 'FOREIGN KEY CONSTRAINT ERROR IN DELETE';
    }
    return new DBResult(message, data, false);
  }
}
