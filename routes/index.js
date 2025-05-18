const router = require('express').Router();
const swagger = require("./swagger.js")
const contactRoutes = require("./userRoutes.js")


router.use('/', swagger);
router.use('/contacts', contactRoutes);

module.exports = router;