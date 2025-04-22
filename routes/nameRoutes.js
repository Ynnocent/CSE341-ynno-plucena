const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.status(400).send("Ynno Plucena")
    } catch (error) {
        res.status(500).json({
            error:"Error giving name"
        })
    }
})

module.exports = router;