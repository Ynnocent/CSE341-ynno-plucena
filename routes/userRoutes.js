import { Router } from 'express';
const router = Router();

import { getAll, getSingle } from '../controllers/userController.js';

router.get('/', getAll);

router.get('/:id', getSingle);

export default router;