import { DBResult } from "../../../../Common/models/DBResult";

export interface IQuerySQL {
    query(select_query: string, params: any, isRun?: boolean, isTransaction?: boolean, datasetId?: number) : Promise<DBResult>;
}