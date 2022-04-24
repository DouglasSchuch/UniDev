import { container } from "tsyringe";
import { Response, Request, NextFunction} from 'express'
import { DBContextDev } from '../Database/DBContextDev'

export class DevController {
    constructor(){ }
    
    compileAndExec(req: Request | any, res: Response, next: NextFunction) {
        container.resolve(DBContextDev).compileAndExec(req.body)
            .then((resCtx: any) => res.status(201).send(resCtx))
    }

    getById(req: any, res: Response, next: NextFunction) {
        container.resolve(DBContextDev).getById(req.params.dataSetId)
            .then((resCtx: any) => res.status(201).send(resCtx))
    }

    post(req: Request | any, res: Response, next: NextFunction) {
        container.resolve(DBContextDev).post(req.body)
            .then((resCtx: any) => res.status(201).send(resCtx))
    }

    put(req: any, res: Response, next: NextFunction) {
        console.log('updateDataset', req.params, req.query)
        container.resolve(DBContextDev).put(req.params.dataSetId, req.body)
            .then((resCtx: any) => res.status(201).send(resCtx))
    }

    delete(req: any, res: Response, next: NextFunction) {
        container.resolve(DBContextDev).delete(req.params.dataSetId)
            .then((resCtx: any) => res.status(201).send(resCtx))
    }
}