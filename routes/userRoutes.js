import { Router } from 'express';
const router = Router();

import { getAll, getSingle, createContact, updateContact, deleteContact } from '../controllers/userController.js';

router.get('/', getAll);

router.get('/:id', getSingle);

router.post('/newcontact', createContact);

router.put('/updatecontact/:id', updateContact);

router.delete('/deletecontact/:id', deleteContact);

export default router;