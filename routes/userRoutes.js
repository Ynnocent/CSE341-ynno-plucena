const router = require('express').Router();
const userController = require('../controllers/userController.js');


router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/newcontact', userController.createContact);

router.put('/updatecontact/:id', userController.updateContact);

router.delete('/deletecontact/:id', userController.deleteContact);


module.exports = router;