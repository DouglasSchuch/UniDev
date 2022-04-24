import app from 'express'
import { DevController } from '../Controllers/Dev'
const router = app.Router()

const datasetController: DevController = new DevController()

router.post('/compile-and-exec', datasetController.compileAndExec)

router.get('/:dataSetId', datasetController.getById)

router.post('/', datasetController.post)

router.put('/:dataSetId', datasetController.put)

router.delete('/:dataSetId', datasetController.delete)

export default router
