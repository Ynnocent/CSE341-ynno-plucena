const express = require("express");
const router = express.Router();
const nameController = require("../controllers/nameController");

router.get("/", nameController.getName)

module.exports = router;