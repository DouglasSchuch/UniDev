import app from 'express';
import dev from './Dev';

const router = app.Router();

router.use(`/dev/`, dev);

export default router