exports.getName = (req, res, next) => {
    try {
        res.send("Ynno Plucena")
    } catch (error) {
        res.status(500).json({
            message: "Error getting name"
        })
    }
}